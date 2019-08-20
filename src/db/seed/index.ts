import * as imageToAscii from 'image-to-ascii';
import dbConnection from '@/db/dbConnection';
import Pokemons from '@/entities/Pokemons';
import pokemonModel from '@/models/pokemonModel';
import usecase from '@/db/seed/usecase';

/**
 * DBにポケモンのデータが存在するか判定します.
 * @returns {Boolean} 存在：true, 未存在：false
 */
const isExistPokemons = async (): Promise<boolean> => {
  const dbPokemons: Pokemons[] = await pokemonModel.findAll();
  return Boolean(dbPokemons.length);
};

(async () => {
  try {
    await dbConnection.connect();

    if (!isExistPokemons()) {
      throw new Error('Initial data already exists.');
    }

    console.info('Create Pokémon Data!!');

    await usecase();

    console.info('Initial data registration is complete!');

    imageToAscii(
      'http://img3.goipadwallpapers.com/2013/12/06/cc20664ab8879c36_2048x2048.jpg',
      { size: { width: '10%' } },
      (err, converted) => {
        console.log(err || converted);
      }
    );
  } catch (err) {
    console.error(err);
  } finally {
    dbConnection.disconnect();
  }
})();
