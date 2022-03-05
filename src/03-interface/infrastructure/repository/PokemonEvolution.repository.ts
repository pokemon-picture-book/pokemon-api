import PokemonEvolutionEntity from '@/01-enterprise/entity/PokemonEvolution.entity';
import IPokemonEvolutionRepository from '@/02-application/repository/IPokemonEvolution.repository';
import { injectable } from 'inversify';

@injectable()
export default class PokemonEvolutionRepository
    implements IPokemonEvolutionRepository {
    public findAllByPokemonId(
        pokemonId: number
    ): Promise<PokemonEvolutionEntity[]> {
        return PokemonEvolutionEntity.createQueryBuilder('pokemonEvolution')
            .where('pokemonEvolution.pokemon_id = :pokemonId', { pokemonId })
            .getMany();
    }
}
