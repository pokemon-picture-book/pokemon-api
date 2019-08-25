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
  } catch (err) {
    console.error(err);
  } finally {
    dbConnection.disconnect();
  }
})();
