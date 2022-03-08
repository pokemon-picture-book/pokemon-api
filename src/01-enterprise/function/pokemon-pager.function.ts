import PokemonEntity from '@/01-enterprise/entity/Pokemon.entity';

export const getPrevAndNextId = (
    targetId: PokemonEntity['id'],
    pokemons: PokemonEntity[]
) => {
    const targetPokemonIndex = pokemons.findIndex((p) => p.id === targetId);
    if (targetPokemonIndex < 0) {
        throw new Error('invalid query parameter: game / regions');
    }

    const prevIndex =
        targetPokemonIndex - 1 < 0
            ? pokemons.length - 1
            : targetPokemonIndex - 1;
    const nextIndex =
        targetPokemonIndex + 1 > pokemons.length - 1
            ? 0
            : targetPokemonIndex + 1;

    return {
        prevId: pokemons[prevIndex].id,
        nextId: pokemons[nextIndex].id,
    };
};

export default {};
