import { Request, Response } from 'express';
import 'reflect-metadata';

import container from '@/registories/inversify.config';
import PokemonController from '@/controllers/pokemons/PokemonController';

import TYPES from '@/registories/inversify.types';

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
                    action: pokemonControllerContainer.search
                }
                // {
                //     path: '/item',
                //     children: [
                //         {
                //             method: 'get',
                //             path: '/',
                //             action: pokemonControllerContainer.search
                //         }
                //     ]
                // }
            ]
        }
    ]
};
