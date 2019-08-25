import axios, { AxiosResponse } from 'axios';
import util from '@/utils';
import Pokemons from '@/entities/Pokemons';
import Bases from '@/entities/Bases';
import { Pokedex } from '@/@types/seed';

/**
 * 必要なデータだけ取得します.
 * @param {any} axiosResults
 */
const extractData = axiosResults => {
  const offset: number = util('pokemon.range.offset');
  const limit: number = util('pokemon.range.limit');

  return axiosResults.slice(offset, limit);
};

/**
 * 必要なパラメータのデータセットにマッピングします.
 * @param {any} axiosResults
 * @returns {Pokedex[]}
 */
const mappingPokedex = (axiosResults): Pokedex[] =>
  extractData(axiosResults).map(axiosResult => {
    const { id, name, type, base: resultBase } = axiosResult;

    return {
      pokemon: new Pokemons(id, name.english.trim(), name.japanese),
      base: new Bases(
        resultBase.HP,
        resultBase.Attack,
        resultBase.Defense,
        resultBase['Sp. Attack'],
        resultBase['Sp. Defense'],
        resultBase.Speed,
        id
      ),
      type
    };
  });

/**
 * JSON を取得し、ポケモンなどのデータを取得します.
 * @returns {Promise<Pokedex[]>}
 */
export default async (): Promise<Pokedex[]> => {
  const dataPath: string = util('pokemon.data.git.path');

  const response: AxiosResponse = await axios.get(`${dataPath}/pokedex.json`);

  return mappingPokedex(response.data);
};
