import {
    Pokemon,
    PokemonGameImage,
    PokemonImage,
    PokemonName,
    GameVersionGroup,
    GameVersionName,
    TypeName
} from '@t/entity';

declare type PokemonSearchResponse = Pick<Pokemon, 'id' | 'imageColor'> &
    Pick<PokemonName, 'name'> & {
        gameImagePaths: PokemonGameImage['path'][];
        imagePaths: PokemonImage['path'][];
        types: TypeName['name'][];
    };

declare type GameVersionGroupResponse = Pick<GameVersionGroup, 'id' | 'alias'> &
    Pick<GameVersionName, 'name'>;
