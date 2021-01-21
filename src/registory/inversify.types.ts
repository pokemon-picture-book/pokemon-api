const TYPES = {
    PokemonController: Symbol.for('PokemonController'),
    GameVersionGroupController: Symbol.for('GameVersionGroupController'),
    RegionController: Symbol.for('RegionController'),
    IPokemonRepository: Symbol.for('IPokemonRepository'),
    ILanguageRepository: Symbol.for('ILanguageRepository'),
    IGameVersionGroupRepository: Symbol.for('IGameVersionGroupRepository'),
    IRegionRepository: Symbol.for('IRegionRepository'),
    ISearchPokemonUsecase: Symbol.for('ISearchPokemonUsecase'),
    IGameVersionGroupUsecase: Symbol.for('IGameVersionGroupUsecase'),
    IRegionUsecase: Symbol.for('IRegionUsecase'),
    IPokemonPresenter: Symbol.for('IPokemonPresenter'),
    IGameVersionGroupPresenter: Symbol.for('IGameVersionGroupPresenter'),
    IRegionPresenter: Symbol.for('IRegionPresenter'),
} as const;

export default TYPES;
