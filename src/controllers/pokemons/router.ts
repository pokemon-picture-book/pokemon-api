import * as express from 'express';
import { Request, Response } from 'express';
import 'reflect-metadata';

import container from '@/registories/inversify.config';
import PokemonController from '@/controllers/pokemons/controller';

import TYPES from '@/registories/types';

export default express
    .Router()
    .get('/', (req: Request, res: Response) =>
        container
            .get<PokemonController>(TYPES.PokemonController)
            .search(req, res)
    );
