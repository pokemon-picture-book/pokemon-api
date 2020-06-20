import Pokemon from '@/domain/entity/Pokemon.entity';

const bulkSave = async (pokemons: Pokemon[]): Promise<Pokemon[]> => {
    return Pokemon.save(pokemons).catch(err => {
        throw new Error(`Error in pokemon bulkSave: ${err}`);
    });
};

const findAll = async (): Promise<Pokemon[]> => {
    return Pokemon.find().catch(err => {
        throw new Error(`Error in pokemon findAll: ${err}`);
    });
};

const findTypeAndPngUrl = async (): Promise<Pokemon[]> =>
    Pokemon.createQueryBuilder()
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
