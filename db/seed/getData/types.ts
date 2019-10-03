import axios, { AxiosResponse } from 'axios';
import util from '@/utils';
import Types from '@/entities/Types';
import { AxiosResultWithTypes } from '@/@types/seed';

/**
 * タイプ情報にマッピングします.
 * @param {any} axiosResults
 * @returns {Types[]}
 */
const mappingTypes = (axiosResults: AxiosResultWithTypes[]): Types[] =>
  axiosResults.map(
    ({ english, japanese }) => new Types(english.trim(), japanese)
  );

/**
 * ポケモンのタイプ情報を取得します.
 * @returns {Promise<Types[]>}
 */
export default async (): Promise<Types[]> => {
  const dataPath: string = util('pokemon.data.git.path');

  const response: AxiosResponse = await axios.get(`${dataPath}/types.json`);

  return mappingTypes(response.data);
};
