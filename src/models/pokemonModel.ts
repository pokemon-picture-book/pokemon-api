import PokemonEntity from '@/domain/entity/Pokemon.entity';

const bulkSave = async (
    pokemons: PokemonEntity[]
): Promise<PokemonEntity[]> => {
    return PokemonEntity.save(pokemons).catch(err => {
        throw new Error(`Error in pokemon bulkSave: ${err}`);
    });
};

const findAll = async (): Promise<PokemonEntity[]> => {
    return PokemonEntity.find().catch(err => {
        throw new Error(`Error in pokemon findAll: ${err}`);
    });
};

const findTypeAndPngUrl = async (): Promise<PokemonEntity[]> =>
    PokemonEntity.createQueryBuilder()
        .innerJoinAndSelect('Pokemons.pngUrls', 'PngUrl')
        .innerJoinAndSelect('Pokemons.pokemonTypes', 'PokemonTypes')
        .innerJoinAndSelect('PokemonTypes.types', 'Types')
        .orderBy('Pokemons.id')
        .getMany();

export default {
    bulkSave,
    findAll,
    findTypeAndPngUrl
};
