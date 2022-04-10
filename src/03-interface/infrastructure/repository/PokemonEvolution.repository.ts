import EvolutionEntity from '@/01-enterprise/entity/Evolution.entity';
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
            .innerJoinAndMapOne(
                'pokemonEvolution.evolution',
                EvolutionEntity,
                'evolution',
                'pokemonEvolution.evolution_id = evolution.id'
            )
            .where('pokemonEvolution.pokemon_id = :pokemonId', { pokemonId })
            .getMany();
    }
}
