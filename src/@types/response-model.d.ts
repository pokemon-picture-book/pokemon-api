import {
    Pokemon,
    PokemonGameImage,
    PokemonImage,
    PokemonName,
    TypeName
} from '@t/entity';

declare type PokemonSearchResponse = Pick<Pokemon, 'id' | 'imageColor'> &
    Pick<PokemonName, 'name'> & {
        gameImagePaths: PokemonGameImage['path'][];
        imagePaths: PokemonImage['path'][];
        types: TypeName['name'][];
    };
