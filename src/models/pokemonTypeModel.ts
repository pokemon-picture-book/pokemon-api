import PokemonTypeEntity from '@/domain/entity/PokemonType.entity';

const bulkSave = async (
    pokemonTypes: PokemonTypeEntity[]
): Promise<PokemonTypeEntity[]> => {
    return PokemonTypeEntity.save(pokemonTypes).catch(err => {
        throw new Error(`Error in pokemon_types bulkSave: ${err}`);
    });
};

export default {
    bulkSave
};
