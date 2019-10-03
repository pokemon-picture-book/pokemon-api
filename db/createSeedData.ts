import axios, { AxiosResponse } from 'axios';

const serialize = (target, keys) => {
  return keys
    .map(key => ({ [key]: target[key] }))
    .reduce((a, c) => Object.assign(a, c), {});
};

/* eslint no-unused-expressions: "off" */
(async () => {
  const { data: pokedex }: AxiosResponse = await axios.get(
    'https://raw.githubusercontent.com/pokemon-picture-book/pokemon.json/master/pokedex.json'
  );
  console.log(pokedex);
})();
