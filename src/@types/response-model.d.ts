declare module 'app-response-model' {
    import {
        Pokemon,
        PokemonGameImage,
        PokemonImage,
        PokemonName,
        GameVersionGroup,
        GameVersionName,
        TypeName,
    } from 'app-entity';

    export type PokemonSearchResponse = Pick<Pokemon, 'id' | 'imageColor'> &
        Pick<PokemonName, 'name'> & {
            gameImagePaths: PokemonGameImage['path'][];
            imagePaths: PokemonImage['path'][];
            types: TypeName['name'][];
        };

    export type GameVersionGroupResponse = Pick<
        GameVersionGroup,
        'id' | 'alias'
    > &
        Pick<GameVersionName, 'name'>;
}
