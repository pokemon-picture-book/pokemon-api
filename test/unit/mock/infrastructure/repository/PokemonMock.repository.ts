import PokemonEntity from '@/01-enterprise/entity/Pokemon.entity';
import IPokemonRepository from '@/02-application/repository/IPokemon.repository';
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

    findSimpleAll(): Promise<PokemonEntity[]> {
        throw new Error('Method not implemented.');
    }

    public async findById(
        whereParam: {
            id: number;
            languageId: number;
            gameVersionGroupId: number;
        },
        isEvolution: boolean
    ): Promise<PokemonEntity | undefined> {
        return whereParam.id > 0 && isEvolution
            ? new PokemonEntity()
            : undefined;
    }

    findStatusById(): Promise<PokemonEntity | undefined> {
        throw new Error('Method not implemented.');
    }
}
