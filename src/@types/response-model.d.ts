declare module 'app-response-model' {
    import {
        Pokemon,
        PokemonGameImage,
        PokemonImage,
        PokemonName,
        Language,
        GameVersionGroup,
        GameVersionName,
        Type,
        TypeName,
        Region,
        RegionName,
        FlavorTextEntry,
        Genera,
        Evolution,
        Status,
    } from 'app-entity';

    type PokemonTypeResponse = {
        code: Type['name'];
        name: TypeName['name'];
    };

    export type SearchAllPokemonResponseData = Pick<
        Pokemon,
        'id' | 'imageColor'
    > &
        Pick<PokemonName, 'name'> & {
            gameImagePath: PokemonGameImage['path'];
            types: PokemonTypeResponse[];
        };

    export type SearchAllPokemonResponse = {
        hits: number;
        data: SearchAllPokemonResponseData[];
    };

    export type SearchSimplePokemonResponseData = Pick<Pokemon, 'id'> &
        Pick<PokemonName, 'name'>;

    export type SearchSimplePokemonResponse = {
        hits: number;
        data: SearchSimplePokemonResponseData[];
    };

    export type SearchOnePokemonResponseData = Pick<
        Pokemon,
        'id' | 'height' | 'weight' | 'imageColor'
    > & {
        flavorText: FlavorTextEntry['flavorText'];
        genus: Genera['genus'];
        pokemonName: PokemonName['name'];
        types: PokemonTypeResponse[];
        status: Pick<
            Status,
            | 'hp'
            | 'attack'
            | 'defense'
            | 'specialAttack'
            | 'specialDefense'
            | 'speed'
        >;
        image: {
            mainGameImage: string;
            footmarkImages: string[];
            handheldIconImages: string[];
            shinyImages: string[];
            otherImages: string[];
        };
        evolutions: (Pick<Evolution, 'trigger' | 'detail1' | 'detail2'> & {
            fromPokemon: Pick<Pokemon, 'id' | 'imageColor'> & {
                pokemonName: PokemonName['name'];
                gameImagePath: PokemonGameImage['path'];
                types: PokemonTypeResponse[];
            };
            toPokemon: Pick<Pokemon, 'id' | 'imageColor'> & {
                pokemonName: PokemonName['name'];
                gameImagePath: PokemonGameImage['path'];
                types: PokemonTypeResponse[];
            };
        })[];
    };

    export type SearchOnePokemonResponse = {
        prevId: number;
        nextId: number;
        data: SearchOnePokemonResponseData;
    };

    export type SearchOnePokemonStatusResponse = Pick<Pokemon, 'id'> & {
        name: PokemonName['name'];
        status: Pick<
            Status,
            | 'hp'
            | 'attack'
            | 'defense'
            | 'specialAttack'
            | 'specialDefense'
            | 'speed'
        >;
    };

    export type GameVersionGroupResponse = Pick<
        GameVersionGroup,
        'id' | 'alias'
    > &
        Pick<GameVersionName, 'name'> & {
            relatedRegions: Pick<Region, 'id' | 'name'>[];
        };

    export type RegionResponse = Pick<Region, 'id' | 'name'> & {
        displayName: RegionName['name'];
        relatedGameVersionGroups: Pick<GameVersionGroup, 'id', 'alias'>[];
    };

    export type LanguageResponse = Pick<Language, 'id' | 'name' | 'labelName'>;
}
