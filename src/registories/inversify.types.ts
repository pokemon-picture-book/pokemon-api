const TYPES = {
    PokemonController: Symbol.for('PokemonController'),
    IPokemonRepository: Symbol.for('IPokemonRepository'),
    ISearchPokemonUsecase: Symbol.for('ISearchPokemonUsecase')
} as const;

export default TYPES;
