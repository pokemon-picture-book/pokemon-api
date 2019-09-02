import Pokemons from '@/entities/Pokemons';
import pokemonModel from '@/models/pokemonModel';

export default async (): Promise<Pokemons[]> =>
  pokemonModel.findTypeAndPngUrl();
