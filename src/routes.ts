import PokemonController from '@/controller/Pokemon.controller';
import container from '@/registory/inversify.config';
import TYPES from '@/registory/inversify.types';
import { AppRequest, AppResponse } from 'express';
import 'reflect-metadata';

export const ROUTING: Readonly<Routing> = {
    API: '/pokemon-api/v1',
    POKEMON: '/pokemons'
};

export default {
    base: ROUTING.API,
    routes: [
        {
            path: ROUTING.POKEMON,
            children: [
                {
                    method: 'get',
                    path: '/',
                    action: (req: AppRequest<any>, res: AppResponse<any>) => {
                        const pokemonControllerContainer = container.get<
                            PokemonController
                        >(TYPES.PokemonController);
                        pokemonControllerContainer.search(req, res);
                    }
                },
                {
                    method: 'get',
                    path: '/:pokemonId',
                    action: (req: AppRequest<any>, res: AppResponse<any>) => {
                        const pokemonControllerContainer = container.get<
                            PokemonController
                        >(TYPES.PokemonController);
                        pokemonControllerContainer.search(req, res);
                    }
                },
                // TODO 以下はサンプルのため、いずれ削除する
                {
                    path: '/items',
                    children: [
                        {
                            method: 'get',
                            path: '/',
                            action: (
                                req: AppRequest<any>,
                                res: AppResponse<any>
                            ) => {
                                const pokemonControllerContainer = container.get<
                                    PokemonController
                                >(TYPES.PokemonController);
                                pokemonControllerContainer.search(req, res);
                            }
                        }
                    ]
                }
            ]
        }
    ]
} as Readonly<AppRouter>;
