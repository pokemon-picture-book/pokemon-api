import PokemonEntity from '@/domain/entity/Pokemon.entity';
import IPokemonRepository from '@/domain/repository/IPokemon.repository';
import { injectable } from 'inversify';

@injectable()
export default class PokemonMockRepository implements IPokemonRepository {
    public findAll(
        languageId: number,
        gameVersionGroupId: number,
        regionIds: number[]
    ): Promise<PokemonEntity[]> {
        return Promise.resolve(
            languageId || gameVersionGroupId || regionIds.length
                ? [new PokemonEntity()]
                : []
        );
    }
}
