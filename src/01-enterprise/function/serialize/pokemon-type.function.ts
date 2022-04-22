import PokemonTypeEntity from '@/01-enterprise/entity/PokemonType.entity';

export const toTypes = (pokemonTypes: PokemonTypeEntity[]) =>
    pokemonTypes.map(({ type }) => {
        const [{ name: typeName }] = type.typeNames;
        return { code: type.name, name: typeName };
    });

export default {
    toTypes
};
