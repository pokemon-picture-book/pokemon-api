import { injectable } from 'inversify';
import Pokemons from '@/domain/entities/Pokemons';
import IPokemonRepository from '@/domain/repositories/IPokemonRepository';

@injectable()
export default class PokemonRepository implements IPokemonRepository {
    public findAll(): Promise<Pokemons[]> {
        return Pokemons.find().catch(err => {
            throw err;
        });
    }
}
