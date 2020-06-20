import { getConnection } from 'typeorm';
import PokemonType from '@/domain/entity/PokemonType.entity';

const bulkSave = async (
    pokemonTypes: PokemonType[]
): Promise<PokemonType[]> => {
    return PokemonType.save(pokemonTypes).catch(err => {
        throw new Error(`Error in pokemon_types bulkSave: ${err}`);
    });
};

export default {
    bulkSave
};
