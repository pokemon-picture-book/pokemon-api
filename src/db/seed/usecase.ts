import getPokedexData from '@/db/seed/getData/pokedex';
import getPngUrlsData from '@/db/seed/getData/pngUrls';
import getGifUrlsData from '@/db/seed/getData/gifUrls';
import getTypesData from '@/db/seed/getData/types';
import getPokemonTypes from '@/db/seed/getData/pokemonTypes';
import Pokemons from '@/entities/Pokemons';
import PngUrls from '@/entities/PngUrls';
import GifUrls from '@/entities/GifUrls';
import Types from '@/entities/Types';
import PokemonTypes from '@/entities/PokemonTypes';
import Bases from '@/entities/Bases';
import pokemonModel from '@/models/pokemonModel';
import pngUrlModel from '@/models/pngUrlModel';
import gifUrlModel from '@/models/gifUrlModel';
import typeModel from '@/models/typeModel';
import baseModel from '@/models/baseModel';
import pokemonTypeModel from '@/models/pokemonTypeModel';
import { Pokedex } from '@/@types/seed';

/**
 * seed を実現するためのユースケース.
 *
 * 作成するデータ一覧
 * * pokemons
 * * types
 * * pokemon_types
 * * bases
 * * png_urls
 * * gif_urls
 */
export default async (): Promise<void> => {
  const pokedexs: Pokedex[] = await getPokedexData();

  const pokedexWithPokemons: Pokemons[] = pokedexs.map(
    pokedex => pokedex.pokemon
  );
  const pokemons: Pokemons[] = await pokemonModel.bulkSave(pokedexWithPokemons);
  console.info('* Pokemon Data create complate!');

  const typesData: Types[] = await getTypesData();
  const types: Types[] = await typeModel.bulkSave(typesData);
  console.info('* Type create complate!');

  const pokemonTypes: PokemonTypes[] = getPokemonTypes(pokedexs, types);
  await pokemonTypeModel.bulkSave(pokemonTypes);
  console.info('* Pokemon type create complate!');

  const pokedexWithBases: Bases[] = pokedexs.map(pokedex => pokedex.base);
  await baseModel.bulkSave(pokedexWithBases);
  console.info('* Pokemon Base create complate!');

  const pngUrls: PngUrls[] = getPngUrlsData(pokemons);
  await pngUrlModel.bulkSave(pngUrls);
  console.info('* Pokemon png image url create complate!');

  console.info(
    '* Pokemon gif url create.\nThis process takes time.\nPlease wait...'
  );
  const gifUrls: GifUrls[] = await getGifUrlsData(pokemons);
  await gifUrlModel.bulkSave(gifUrls);
  console.info('Sorry I made you wait! accomplished.');
};
