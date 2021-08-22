import PokemonEntity from '@/domain/entity/Pokemon.entity';

export default interface IPokemonRepository {
    findAll(
        whereParam: {
            languageId: number;
            gameVersionGroupId: number;
            regionIds: number[];
        },
        pageParam: {
            offset?: number;
            limit?: number;
        }
    ): Promise<PokemonEntity[]>;

    findAllCount(whereParam: {
        languageId: number;
        gameVersionGroupId: number;
        regionIds: number[];
    }): Promise<number>;
}
