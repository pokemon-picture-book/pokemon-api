import PokemonEvolutionEntity from '@/01-enterprise/entity/PokemonEvolution.entity';

export default interface IPokemonEvolutionRepository {
    findAllByPokemonId(pokemonId: number): Promise<PokemonEvolutionEntity[]>;
}
