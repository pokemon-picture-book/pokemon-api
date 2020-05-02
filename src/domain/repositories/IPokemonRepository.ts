import Pokemons from '@/domain/entities/Pokemons';

export default interface IPokemonRepository {
    findAll(): Promise<Pokemons[]>;
}
