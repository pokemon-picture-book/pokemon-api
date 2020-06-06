import Pokemons from '@/domain/entity/Pokemons';

export default interface IPokemonRepository {
    findAll(): Promise<Pokemons[]>;
}
