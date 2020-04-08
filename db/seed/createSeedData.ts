import axios from 'axios';

import fs = require('fs');
import ProgressBar = require('progress');

type Pokedex = {
    id: number;
    name: MultiLanguageParam;
    type: string[];
    base: {
        HP: number;
        Attack: number;
        Defense: number;
        'Sp. Attack': number;
        'Sp. Defense': number;
        Speed: number;
    };
};

type MultiLanguageParam = {
    english: string;
    chinese: string;
    japanese: string;
};

process.setMaxListeners(Infinity);

class ExternalAPI {
    private readonly PATH: string =
        'https://raw.githubusercontent.com/pokemon-picture-book/pokemon.json/master';

    /**
     * ポケモンのタイプ情報を取得します.
     */
    public async getTypes() {
        const { data } = await axios.get<MultiLanguageParam[]>(
            `${this.PATH}/types.json`
        );
        return data;
    }

    /**
     * ポケモンに関する様々なデータが格納されている JSON からデータを取得します.
     */
    public async getPokedex() {
        const { data } = await axios.get<Pokedex[]>(
            `${this.PATH}/pokedex.json`
        );
        return data;
    }
}

abstract class CreateSeedCommand<T> {
    /** seed の名称 */
    protected namespace: string;

    /** 返還前のデータ */
    protected data: T;

    constructor(namespace: string, data: T) {
        this.namespace = namespace;
        this.data = data;
    }

    abstract mapping(): any;

    /**
     * JSON ファイルを出力します.
     */
    public async outputJSON() {
        if (!this.data) {
            throw new Error('Data is not mapping!');
        }
        fs.writeFile(
            `db/seed/data/${this.namespace}.json`,
            JSON.stringify(await this.mapping(), null, '    '),
            err => {
                if (err) {
                    throw err;
                }
                console.log(`${this.namespace} is saved!`);
            }
        );
    }
}

class TypeSeeds extends CreateSeedCommand<MultiLanguageParam[]> {
    /**
     * ポケモンのタイプリストからテーブルに格納したいデータへマッピングします.
     */
    mapping() {
        return this.data.map((type, i) => ({
            id: i + 1,
            code: type.english,
            name: type.japanese
        }));
    }
}

class PokemonSeeds extends CreateSeedCommand<Pokedex[]> {
    private readonly GENERATIONS = [
        { generationNo: 1, s: 0, e: 151 },
        { generationNo: 2, s: 151, e: 251 },
        { generationNo: 3, s: 251, e: 386 },
        { generationNo: 4, s: 386, e: 493 },
        { generationNo: 5, s: 493, e: 649 },
        { generationNo: 6, s: 649, e: 721 },
        { generationNo: 7, s: 721, e: 809 }
    ];

    private readonly POKE_API_RESOURCE =
        'https://pokeapi.co/api/v2/pokemon-species/';

    /**
     * ポケモンテーブルのデータにマッピングします.
     */
    async mapping() {
        const pokemons = [];
        for (const pokedex of this.data) {
            const { id: pokemonId, name: multiName } = pokedex;
            const { english: code, japanese: name } = multiName;
            const { generationNo } = this.GENERATIONS.find(
                g => g.s < pokemonId && pokemonId <= g.e
            );

            const pokemonDetail = await axios
                .get(`${this.POKE_API_RESOURCE}${pokemonId}`)
                .catch(() => null);

            let flavorText: string = '';
            if (pokemonDetail) {
                const {
                    flavor_text_entries: flavorUextEntries
                } = pokemonDetail.data;
                const firstFlavorUextEntrie = flavorUextEntries
                    .filter(
                        flavorUextEntrie =>
                            flavorUextEntrie.language.name === 'ja'
                    )
                    .shift();

                ({ flavor_text: flavorText } = firstFlavorUextEntrie);
            }

            pokemons.push({
                id: pokemonId,
                code,
                name,
                flavorText,
                generation_no: generationNo
            });
        }
        return pokemons;
    }
}

class PokemonTypeSeeds extends CreateSeedCommand<{
    pokedexs: Pokedex[];
    types: MultiLanguageParam[];
}> {
    /**
     * ポケモンとタイプの中間テーブルデータにマッピングします.
     */
    mapping() {
        const { pokedexs, types } = this.data;
        return pokedexs
            .map(pokedex => {
                const { id: pokemonId, type: targetPokemonTypes } = pokedex;
                return targetPokemonTypes.map(targetPokemonType => {
                    const matchType = types
                        .map((type, i) => ({ id: i + 1, ...type }))
                        .find(type => type.english === targetPokemonType);
                    return {
                        pokemon_id: pokemonId,
                        type_id: matchType.id
                    };
                });
            })
            .reduce((a, c) => a.concat(c));
    }
}

class SpecSeeds extends CreateSeedCommand<Pokedex[]> {
    /**
     * ポケモン特性テーブルのデータにマッピングします.
     */
    mapping() {
        return this.data.map(pokedex => {
            const { id: pokemonId, base } = pokedex;
            return {
                pokemon_id: pokemonId,
                hp: base.HP,
                attack: base.Attack,
                defense: base.Defense,
                sp_attack: base['Sp. Attack'],
                sp_defense: base['Sp. Defense'],
                speed: base.Speed
            };
        });
    }
}

class PngSeeds extends CreateSeedCommand<Pokedex[]> {
    private getCode: Function = index => String(index + 1).padStart(3, '0');

    private readonly DATA_PATH: string =
        'https://raw.githubusercontent.com/pokemon-picture-book/pokemon.json/master';

    /**
     * 画像テーブルデータへマッピングします.
     */
    mapping() {
        return this.data.map((pokedex, i) => {
            const { id: pokemonId, name: multiName } = pokedex;
            const { english: code } = multiName;

            return {
                image_url: `${this.DATA_PATH}/images/${this.getCode(
                    i
                )}${code.replace("'", '')}.png`,
                sprite_url: `${this.DATA_PATH}/sprites/${this.getCode(
                    i
                )}MS.png`,
                pokemon_id: pokemonId
            };
        });
    }
}

// main
(async () => {
    try {
        const externalAPI: ExternalAPI = new ExternalAPI();
        const [pokedexs, types] = await Promise.all([
            externalAPI.getPokedex(),
            externalAPI.getTypes()
        ]);

        const createSeedCommands: CreateSeedCommand<any>[] = [
            new TypeSeeds('types', types),
            new PokemonSeeds('pokemons', pokedexs),
            new PokemonTypeSeeds('pokemonTypes', { pokedexs, types }),
            new SpecSeeds('specs', pokedexs),
            new PngSeeds('pngs', pokedexs)
        ];

        createSeedCommands.forEach(createSeedCommand =>
            createSeedCommand.outputJSON()
        );
    } catch (err) {
        console.error(err);
        throw err;
    }
})();
