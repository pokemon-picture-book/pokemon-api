import PokemonEntity from '@/domain/entity/Pokemon.entity';

export default interface IPokemonRepository {
    // findAll(): Promise<Pokemon[]>;

    findAll(
        languageId: number,
        gameVersionGroupId: number,
        regionIds: number[]
    ): Promise<PokemonEntity[]>;
}
