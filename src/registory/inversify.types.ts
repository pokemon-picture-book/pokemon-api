const TYPES = {
    PokemonController: Symbol.for('PokemonController'),
    GameVersionGroupController: Symbol.for('GameVersionGroupController'),
    IPokemonRepository: Symbol.for('IPokemonRepository'),
    ILanguageRepository: Symbol.for('ILanguageRepository'),
    IGameVersionGroupRepository: Symbol.for('IGameVersionGroupRepository'),
    IRegionRepository: Symbol.for('IRegionRepository'),
    ISearchPokemonUsecase: Symbol.for('ISearchPokemonUsecase'),
    IGameVersionGroupUsecase: Symbol.for('IGameVersionGroupUsecase'),
    IPokemonPresenter: Symbol.for('IPokemonPresenter'),
    IGameVersionGroupPresenter: Symbol.for('IGameVersionGroupPresenter')
} as const;

export default TYPES;
