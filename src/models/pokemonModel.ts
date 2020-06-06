import Pokemons from '@/domain/entity/Pokemons';

const bulkSave = async (pokemons: Pokemons[]): Promise<Pokemons[]> => {
    return Pokemons.save(pokemons).catch(err => {
        throw new Error(`Error in pokemons bulkSave: ${err}`);
    });
};

const findAll = async (): Promise<Pokemons[]> => {
    return Pokemons.find().catch(err => {
        throw new Error(`Error in pokemons findAll: ${err}`);
    });
};

const findTypeAndPngUrl = async (): Promise<Pokemons[]> =>
    Pokemons.createQueryBuilder()
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
