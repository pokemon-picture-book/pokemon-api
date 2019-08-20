import Types from '@/entities/Types';
import PokemonTypes from '@/entities/PokemonTypes';
import { Pokedex } from '@/@types/seed';

/**
 * タイプと一致するデータを取得します.
 * @param {Types[]} types ポケモンのタイプ
 * @param {Pokedex} pokedex JSON から取得したデータ
 * @returns {Types[]}
 */
const getMatchingTypes = (types: Types[], pokedex: Pokedex): Types[] =>
  types.filter(type => {
    const matchingType = pokedex.type.find(
      pokedexType => pokedexType === type.code
    );
    return Boolean(matchingType);
  });

/**
 * JSON から取得したポケモン情報のタイプとポケモンのタイプからポケモンタイプデータを取得します.
 * @param {Pokedex[]} pokedexs
 * @param {Types[]} types
 * @returns {PokemonTypes[]}
 */
export default (pokedexs: Pokedex[], types: Types[]): PokemonTypes[] =>
  pokedexs
    .map(pokedex => {
      const matchingTypes: Types[] = getMatchingTypes(types, pokedex);

      return matchingTypes.map(
        matchingType => new PokemonTypes(pokedex.pokemon.id, matchingType.id)
      );
    })
    .flat();
