import PokemonController from '@/controller/Pokemon.controller';
import container from '@/registory/inversify.config';
import TYPES from '@/registory/inversify.types';
import { AppRequest, AppResponse } from 'express';
import 'reflect-metadata';

const pokemonControllerContainer = container.get<PokemonController>(
    TYPES.PokemonController
);

export default {
    base: '/pokemon-api/v1',
    routes: [
        {
            path: '/pokemons',
            children: [
                {
                    method: 'get',
                    path: '/',
                    action: (req: AppRequest<any>, res: AppResponse<any>) =>
                        pokemonControllerContainer.search(req, res)
                },
                {
                    method: 'get',
                    path: '/:pokemonId',
                    action: (req: AppRequest<any>, res: AppResponse<any>) =>
                        pokemonControllerContainer.search(req, res)
                },
                {
                    path: '/items',
                    children: [
                        {
                            method: 'get',
                            path: '/',
                            action: (
                                req: AppRequest<any>,
                                res: AppResponse<any>
                            ) => pokemonControllerContainer.search(req, res)
                        }
                    ]
                }
            ]
        }
    ]
} as Readonly<AppRouter>;
