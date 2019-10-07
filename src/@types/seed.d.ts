import Pokemons from '@/entities/Pokemons';
import Bases from '@/entities/Specs';

declare type GifUrlsWithPokemons = {
    url: string;
};

declare type AxiosResultWithTypes = {
    english: string;
    chinese: string;
    japanese: string;
};

declare type Pokedex = {
    pokemon: Pokemons;
    base: Bases;
    type: string[];
};
