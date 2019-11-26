import { injectable } from 'inversify';

import IPokemonRepository from '@/domain/repositories/IPokemonRepository';
import Pokemons from '@/domain/entities/Pokemons';

@injectable()
export default class PokemonRepository implements IPokemonRepository {
    public async findAll(): Promise<Pokemons[]> {
        return Pokemons.find().catch(err => {
            throw new Error(`Error in pokemons findAll: ${err}`);
        });
    }
}
