import { injectable } from 'inversify';

import { getConnectionOptions } from 'typeorm';
import IPokemonRepository from '@/domain/repositories/pokemon-repository';
import Pokemons from '@/domain/entities/Pokemons';

@injectable()
export default class PokemonRepository implements IPokemonRepository {
    public async findAll(): Promise<Pokemons[]> {
        console.log(await getConnectionOptions());
        return Pokemons.find().catch(err => {
            throw new Error(`Error in pokemons findAll: ${err}`);
        });
    }
}
