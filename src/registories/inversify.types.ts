const TYPES = {
    PokemonController: Symbol.for('PokemonController'),
    IPokemonRepository: Symbol.for('IPokemonRepository'),
    ISearchPokemonUsecase: Symbol.for('ISearchPokemonUsecase'),
    IPokemonPresenter: Symbol.for('IPokemonPresenter')
} as const;

export default TYPES;
