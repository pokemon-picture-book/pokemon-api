import PokemonEntity from '@/01-enterprise/entity/Pokemon.entity';
import IPokemonPresenter from '@/02-application/presenter/IPokemon.presenter';
import { toBase64 } from '@/01-enterprise/function/mapping-image.function';
import { toTypes } from '@/01-enterprise/function/serialize/pokemon-type.function';
import {
    SearchOnePokemonResponse,
    SearchAllPokemonResponse,
    SearchAllPokemonResponseData,
    SearchSimplePokemonResponse,
    SearchOnePokemonStatusResponse,
} from 'app-response-model';
import { injectable } from 'inversify';
import { toPokemonDetailImage } from '@/01-enterprise/function/serialize/pokemon-image.function';
import { toPokemonDetailEvolutions } from '@/01-enterprise/function/serialize/pokemon-evolution.function';

@injectable()
export default class PokemonPresenter implements IPokemonPresenter {
    public async toSearchAllPokemonResponse(
        hits: number,
        pokemons: PokemonEntity[]
    ): Promise<SearchAllPokemonResponse> {
        const data = await Promise.all(
            pokemons.map<Promise<SearchAllPokemonResponseData>>(async (p) => {
                const [{ name: pokemonName }] = p.pokemonNames;
                const types = toTypes(p.pokemonTypes);

                const gameImagePath = p.pokemonGameImages.find(
                    (pokemonGameImage) => pokemonGameImage.isMain
                );

                return {
                    id: p.id,
                    imageColor: p.imageColor,
                    name: pokemonName,
                    gameImagePath: gameImagePath
                        ? await toBase64(gameImagePath.path)
                        : '',
                    types,
                };
            })
        );

        return {
            hits,
            data,
        };
    }

    public toSearchSimplePokemonResponse(
        pokemons: PokemonEntity[]
    ): SearchSimplePokemonResponse {
        return {
            hits: pokemons.length,
            data: pokemons.map(({ id, pokemonNames }) => {
                const [{ name }] = pokemonNames;
                return {
                    id,
                    name,
                };
            }),
        };
    }

    public async toSearchOnePokemonResponse(
        pokemon: PokemonEntity
    ): Promise<SearchOnePokemonResponse> {
        const [image, evolutions] = await Promise.all([
            // 画像関連処理
            toPokemonDetailImage(pokemon),
            // 進化情報関連処理
            toPokemonDetailEvolutions(pokemon),
        ]);

        // ポケモン基本情報処理
        const { id, height, weight, imageColor, status } = pokemon;
        const [flavorTextEntry] = pokemon.flavorTextEntries;
        const [generas] = pokemon.generas;
        const [pokemonName] = pokemon.pokemonNames;
        const types = toTypes(pokemon.pokemonTypes);
        return {
            id,
            height,
            weight,
            imageColor,
            flavorText: flavorTextEntry.flavorText,
            genus: generas.genus,
            pokemonName: pokemonName.name,
            types,
            image,
            evolutions,
            status: {
                hp: status.hp,
                attack: status.attack,
                defense: status.defense,
                specialAttack: status.specialAttack,
                specialDefense: status.specialDefense,
                speed: status.speed,
            },
        };
    }

    public toSearchOnePokemonStatusResponse({
        id,
        pokemonNames,
        status,
    }: PokemonEntity): SearchOnePokemonStatusResponse {
        const [pokemonName] = pokemonNames;
        return {
            id,
            name: pokemonName.name,
            status: {
                hp: status.hp,
                attack: status.attack,
                defense: status.defense,
                specialAttack: status.specialAttack,
                specialDefense: status.specialDefense,
                speed: status.speed,
            },
        };
    }
}
