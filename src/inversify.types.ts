const TYPES = {
    PokemonController: Symbol.for('PokemonController'),
    GameVersionGroupController: Symbol.for('GameVersionGroupController'),
    RegionController: Symbol.for('RegionController'),
    LanguageController: Symbol.for('LanguageController'),
    IPokemonRepository: Symbol.for('IPokemonRepository'),
    ILanguageRepository: Symbol.for('ILanguageRepository'),
    IGameVersionGroupRepository: Symbol.for('IGameVersionGroupRepository'),
    IRegionRepository: Symbol.for('IRegionRepository'),
    ISearchPokemonUsecase: Symbol.for('ISearchPokemonUsecase'),
    IGameVersionGroupUsecase: Symbol.for('IGameVersionGroupUsecase'),
    IRegionUsecase: Symbol.for('IRegionUsecase'),
    ILanguageUsecase: Symbol.for('ILanguageUsecase'),
    IPokemonPresenter: Symbol.for('IPokemonPresenter'),
    IGameVersionGroupPresenter: Symbol.for('IGameVersionGroupPresenter'),
    IRegionPresenter: Symbol.for('IRegionPresenter'),
    ILanguagePresenter: Symbol.for('ILanguagePresenter'),
} as const;

export default TYPES;
