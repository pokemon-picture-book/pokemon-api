import axios, { AxiosResponse } from 'axios';
import * as puppeteer from 'puppeteer';

import fs = require('fs');
import ProgressBar = require('progress');

process.setMaxListeners(Infinity);

class ExternalAPI {
    private readonly PATH: string =
        'https://raw.githubusercontent.com/pokemon-picture-book/pokemon.json/master';

    /**
     * ポケモンのタイプ情報を取得します.
     */
    public async getTypes() {
        const { data }: AxiosResponse = await axios.get(
            `${this.PATH}/types.json`
        );
        return data;
    }

    /**
     * ポケモンに関する様々なデータが格納されている JSON からデータを取得します.
     */
    public async getPokedex() {
        const { data }: AxiosResponse = await axios.get(
            `${this.PATH}/pokedex.json`
        );
        return data;
    }
}

abstract class CreateSeedCommand {
    /** seed の名称 */
    protected namespace: string;

    /** 返還前のデータ */
    protected data: any;

    constructor(namespace: string, data: any) {
        this.namespace = namespace;
        this.data = data;
    }

    abstract mapping(): any;

    /**
     * JSON ファイルを出力します.
     */
    public outputJSON() {
        fs.writeFile(
            `db/seed/data/${this.namespace}.json`,
            JSON.stringify(this.mapping(), null, '    '),
            err => {
                if (err) {
                    throw err;
                }
                console.log(`${this.namespace} is saved!`);
            }
        );
    }
}

class TypeSeeds extends CreateSeedCommand {
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

class PokemonSeeds extends CreateSeedCommand {
    private readonly GENERATIONS = [
        { generationNo: 1, s: 0, e: 151 },
        { generationNo: 2, s: 151, e: 251 },
        { generationNo: 3, s: 251, e: 386 },
        { generationNo: 4, s: 386, e: 493 },
        { generationNo: 5, s: 493, e: 649 },
        { generationNo: 6, s: 649, e: 721 },
        { generationNo: 7, s: 721, e: 809 }
    ];

    /**
     * ポケモンテーブルのデータにマッピングします.
     */
    mapping() {
        return this.data.map(pokedex => {
            const { id: pokemonId, name: multiName } = pokedex;
            const { english: code, japanese: name } = multiName;
            const { generationNo } = this.GENERATIONS.find(
                g => g.s < pokemonId && pokemonId <= g.e
            );
            return {
                id: pokemonId,
                code,
                name,
                generation_no: generationNo
            };
        });
    }
}

class PokemonTypeSeeds extends CreateSeedCommand {
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

class SpecSeeds extends CreateSeedCommand {
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

class PngSeeds extends CreateSeedCommand {
    private getCode: Function = index => `000${index + 1}`.slice(-3);

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

class GifSeeds extends CreateSeedCommand {
    mapping() {
        return this.data.flat();
    }
}

class ScrapingPokestadium {
    private readonly POKESTADIUM_URL =
        'http://www.pokestadium.com/tools/sprites';

    private data: any;

    constructor(data: any) {
        this.data = data;
    }

    public async execute() {
        const bar: ProgressBar = new ProgressBar(
            '  Running scraping [:bar] :rate/bps :percent :etas',
            {
                width: 40,
                total: this.data.length,
                complete: '\u001b[42m \u001b[0m',
                incomplete: '\u001b[41m \u001b[0m'
            }
        );
        const launchOption: puppeteer.LaunchOptions = {
            timeout: 100000,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        };

        const browser = await puppeteer.launch(launchOption);

        const page: puppeteer.Page = await browser.newPage();

        await page.goto(this.POKESTADIUM_URL, {
            waitUntil: 'domcontentloaded'
        });

        const gifs = [];
        for (const pokedex of this.data) {
            const { id, name: multiName } = pokedex;
            const { english: code } = multiName;

            bar.tick();

            gifs.push(await this.getGifUrlsWithPokemons(page, id, code));
        }

        await browser.close();

        return gifs.flat();
    }

    private async getGifUrlsWithPokemons(
        page: puppeteer.Page,
        pokemonId: number,
        pokemonCode: string
    ) {
        await page.reload({
            waitUntil: 'domcontentloaded'
        });

        await page.type('input[name="search-query"]', pokemonCode);

        await page.click('strong.tt-highlight');

        await page.waitForSelector('div.sprite200 > img');

        const gifs = await page.$$eval(
            'div.sprite200 > img',
            (imgs: HTMLImageElement[]) =>
                imgs.filter(img => /.gif/.test(img.src)).map(img => img.src)
        );

        return gifs.length
            ? gifs.map(gif => ({
                  pokemon_id: pokemonId,
                  url: gif
              }))
            : this.getGifUrlsWithPokemons(page, pokemonId, pokemonCode);
    }
}

// main
(async () => {
    try {
        const externalAPI: ExternalAPI = new ExternalAPI();
        const pokedexs = await externalAPI.getPokedex();
        const types = await externalAPI.getTypes();

        // TODO: スクレイピングするサイトでは、まだ721匹のポケモンしかサポートしていない
        const scrapingPokestadium: ScrapingPokestadium = new ScrapingPokestadium(
            pokedexs.slice(0, 721)
        );
        const gifs = await scrapingPokestadium.execute();

        const createSeedCommands: CreateSeedCommand[] = [
            new TypeSeeds('types', types),
            new PokemonSeeds('pokemons', pokedexs),
            new PokemonTypeSeeds('pokemonTypes', { pokedexs, types }),
            new SpecSeeds('specs', pokedexs),
            new PngSeeds('pngs', pokedexs),
            new GifSeeds('gifs', gifs)
        ];

        createSeedCommands.forEach(createSeedCommand =>
            createSeedCommand.outputJSON()
        );
    } catch (err) {
        console.error(err);
        throw err;
    }
})();
