import Pokemons from '../entities/Pokemons';

export default interface IPokemonRepository {
    findAll(): Promise<Pokemons[]>;
}
