import PokemonEvolutionEntity from '@/01-enterprise/entity/PokemonEvolution.entity';
import IPokemonEvolutionRepository from '@/02-application/repository/IPokemonEvolution.repository';
import { injectable } from 'inversify';

@injectable()
export default class PokemonEvolutionMockRepository
    implements IPokemonEvolutionRepository {
    public async findAllByPokemonId(
        pokemonId: number
    ): Promise<PokemonEvolutionEntity[]> {
        return pokemonId ? [new PokemonEvolutionEntity()] : [];
    }
}
