import { getConnection } from 'typeorm';
import PokemonTypes from '@/domain/entities/PokemonTypes';

const bulkSave = async (
    pokemonTypes: PokemonTypes[]
): Promise<PokemonTypes[]> => {
    return PokemonTypes.save(pokemonTypes).catch(err => {
        throw new Error(`Error in pokemon_types bulkSave: ${err}`);
    });
};

export default {
    bulkSave
};
