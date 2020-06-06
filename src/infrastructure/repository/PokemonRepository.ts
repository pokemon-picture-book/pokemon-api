import { injectable } from 'inversify';
import Pokemons from '@/domain/entity/Pokemons';
import IPokemonRepository from '@/domain/repository/IPokemonRepository';

@injectable()
export default class PokemonRepository implements IPokemonRepository {
    public findAll(): Promise<Pokemons[]> {
        return Pokemons.find().catch(err => {
            throw err;
        });
    }
}
