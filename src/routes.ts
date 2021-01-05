import PokemonController from '@/controller/Pokemon.controller';
import GameVersionGroupController from '@/controller/GameVersionGroup.controller';
import container from '@/registory/inversify.config';
import TYPES from '@/registory/inversify.types';
import { AppRequest, AppResponse } from 'express';
import 'reflect-metadata';
import { AppRouter, Routing } from 'app-router';

export const ROUTING: Readonly<Routing> = {
    API: '/pokemon-api/v1',
    POKEMON: '/pokemons',
    GAME_VERSION_GROUP: '/game-version-groups',
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
                        const pokemonControllerContainer = container.get<PokemonController>(
                            TYPES.PokemonController
                        );
                        pokemonControllerContainer.search(req, res);
                    },
                },
                {
                    method: 'get',
                    path: '/:pokemonId',
                    action: (req: AppRequest<any>, res: AppResponse<any>) => {
                        const pokemonControllerContainer = container.get<PokemonController>(
                            TYPES.PokemonController
                        );
                        pokemonControllerContainer.search(req, res);
                    },
                },
            ],
        },
        {
            path: ROUTING.GAME_VERSION_GROUP,
            children: [
                {
                    method: 'get',
                    path: '/',
                    action: (req: AppRequest<any>, res: AppResponse<any>) => {
                        const gameVersionGroupControllerContainer = container.get<GameVersionGroupController>(
                            TYPES.GameVersionGroupController
                        );
                        gameVersionGroupControllerContainer.search(req, res);
                    },
                },
            ],
        },
    ],
} as Readonly<AppRouter>;
