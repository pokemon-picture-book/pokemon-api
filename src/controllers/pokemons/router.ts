import * as express from 'express';
import 'reflect-metadata';

import container from '@/inversify.config';
import Controller from '@/controllers/pokemons/controller';

import TYPES from '@/registories/registory';

export default express
    .Router()
    .get('/', container.get<Controller>(TYPES.PokemonController).search);
