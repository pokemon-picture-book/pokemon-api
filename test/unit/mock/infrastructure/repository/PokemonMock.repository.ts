import PokemonEntity from '@/domain/entity/Pokemon.entity';
import IPokemonRepository from '@/domain/repository/IPokemon.repository';
import { injectable } from 'inversify';

@injectable()
export default class PokemonMockRepository implements IPokemonRepository {
    public async findAll(
        whereParam: {
            languageId: number;
            gameVersionGroupId: number;
            regionIds: number[];
        },
        _: { offset?: number | undefined; limit?: number | undefined }
    ): Promise<PokemonEntity[]> {
        const { languageId, gameVersionGroupId, regionIds } = whereParam;
        return languageId || gameVersionGroupId || regionIds.length
            ? [new PokemonEntity()]
            : [];
    }

    public async findAllCount(whereParam: {
        languageId: number;
        gameVersionGroupId: number;
        regionIds: number[];
    }) {
        const { languageId, gameVersionGroupId, regionIds } = whereParam;
        return languageId || gameVersionGroupId || regionIds.length ? 1 : 0;
    }
}
