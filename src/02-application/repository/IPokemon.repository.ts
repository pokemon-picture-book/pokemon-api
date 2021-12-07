import PokemonEntity from '@/01-enterprise/entity/Pokemon.entity';

export default interface IPokemonRepository {
    findAll(
        whereParam: {
            languageId: number;
            gameVersionGroupId: number;
            regionIds: number[];
            isPokemonMainImage: boolean;
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
        isPokemonMainImage: boolean;
    }): Promise<number>;
}
