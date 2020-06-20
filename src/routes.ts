import { Request, Response } from 'express';
import 'reflect-metadata';

import container from '@/registory/inversify.config';
import PokemonController from '@/controller/Pokemon.controller';
import TYPES from '@/registory/inversify.types';

const pokemonControllerContainer = container.get<PokemonController>(
    TYPES.PokemonController
);

/**
 * 全ての route を管理します.
 * @param app express app
 */
export default {
    base: '/pokemon-api/v1',
    routes: [
        {
            path: '/pokemons',
            children: [
                {
                    method: 'get',
                    path: '/',
                    action: (req: Request, res: Response) =>
                        pokemonControllerContainer.search(req, res)
                },
                {
                    method: 'get',
                    path: '/:pokemonId',
                    action: (req: Request, res: Response) =>
                        pokemonControllerContainer.search(req, res)
                },
                {
                    path: '/items',
                    children: [
                        {
                            method: 'get',
                            path: '/',
                            action: (req: Request, res: Response) =>
                                pokemonControllerContainer.search(req, res)
                        }
                    ]
                }
            ]
        }
    ]
};
