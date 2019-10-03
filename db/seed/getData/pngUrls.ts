import PngUrls from '@/entities/Pngs';
import util from '@/utils';
import Pokemons from '@/entities/Pokemons';

const getCode = index => `000${index + 1}`.slice(-3);

/**
 * ポケモンのデータから、png url にマッピングしたデータを取得します.
 * @param {Pokemons[]} pokemons
 * @returns {PngUrls[]}
 */
export default (pokemons: Pokemons[]): PngUrls[] => {
  const dataPath = util('pokemon.data.git.path');

  return pokemons.map(
    (pokemon, i) =>
      new PngUrls(
        `${dataPath}/images/${getCode(i)}${pokemon.code}.png`,
        `${dataPath}/sprites/${getCode(i)}MS.png`,
        `${dataPath}/thumbnails/${getCode(i)}${pokemon.code}.png`,
        pokemon.id
      )
  );
};
