import PngUrls from '@/entities/PngUrls';
import util from '@/utils';
import Pokemons from '@/entities/Pokemons';

const getCode = index => `000${index + 1}`.slice(-3);

/**
 * ポケモンのデータから、png url にマッピングしたデータを取得します.
 * @param {Pokemons[]} pokemons
 * @returns {PngUrls[]}
 */
export default (pokemons: Pokemons[]): PngUrls[] => {
  const { image, sprite, thumbnail } = util('pokemon.link.png');

  return pokemons.map(
    (pokemon, i) =>
      new PngUrls(
        `${image}${getCode(i)}${pokemon.code}.png`,
        `${sprite}${getCode(i)}MS.png`,
        `${thumbnail}${getCode(i)}${pokemon.code}.png`,
        pokemon.id
      )
  );
};
