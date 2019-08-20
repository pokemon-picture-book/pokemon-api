declare type YamlPokemonRange = {
  offset: number;
  limit: number;
};

declare type YamlPokemonPngType = {
  image: string;
  sprite: string;
  thumbnail: string;
};

declare type YamlPokemonJsonFileWithTypes = {
  pokedex: string;
  types: string;
};

declare type YamlPokemonApi = {
  url: string;
};

declare type YamlPokemonPngWithLink = {
  png: YamlPokemonPngType;
};

declare type YamlPokemon = {
  api: YamlPokemonApi;
  range: YamlPokemonRange;
  link: YamlPokemonPngWithLink;
  json: YamlPokemonJsonFileWithTypes;
};

declare type YamlPropertys = {
  pokemon: YamlPokemon;
};
