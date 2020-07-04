const TYPES = {
    PokemonController: Symbol.for('PokemonController'),
    IPokemonRepository: Symbol.for('IPokemonRepository'),
    ILanguageRepository: Symbol.for('ILanguageRepository'),
    IGameVersionGroupRepository: Symbol.for('IGameVersionGroupRepository'),
    IRegionRepository: Symbol.for('IRegionRepository'),
    ISearchPokemonUsecase: Symbol.for('ISearchPokemonUsecase'),
    IPokemonPresenter: Symbol.for('IPokemonPresenter')
} as const;

export default TYPES;
