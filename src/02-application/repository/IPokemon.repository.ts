import PokemonEntity from '@/01-enterprise/entity/Pokemon.entity';

export default interface IPokemonRepository {
    findAll(
        whereParam: {
            languageId: number;
            gameVersionGroupId: number;
            regionIds: number[];
            isPokemonMainImage: boolean;
        },
        pageParam?: { offset: number; limit: number }
    ): Promise<PokemonEntity[]>;

    findAllCount(whereParam: {
        languageId: number;
        gameVersionGroupId: number;
        regionIds: number[];
        isPokemonMainImage: boolean;
    }): Promise<number>;

    findSimpleAll(whereParam: { languageId: number }): Promise<PokemonEntity[]>;

    findById(
        whereParam: {
            id: number;
            languageId: number;
            gameVersionGroupId: number;
        },
        isEvolution: boolean
    ): Promise<PokemonEntity | undefined>;

    findStatusById(whereParam: {
        id: number;
        languageId: number;
    }): Promise<PokemonEntity | undefined>;
}
