import PokemonEntity from '@/01-enterprise/entity/Pokemon.entity';
import RegionEntity from '../entity/Region.entity';

export const getPrevAndNextId = (
    targetId: PokemonEntity['id'],
    lastPokemonId: RegionEntity['lastPokemonId']
) => {
    if (targetId > lastPokemonId) {
        throw new Error('Invalid target pokemon id.');
    }

    const prevId = targetId - 1 < 1 ? lastPokemonId : targetId - 1;
    const nextId = targetId + 1 > lastPokemonId ? 1 : targetId + 1;

    return {
        prevId,
        nextId
    };
};

export default {};
