import GameVersionGroupController from '@/controller/GameVersionGroup.controller';
import PokemonController from '@/controller/Pokemon.controller';
import { langQueryValidator } from '@/controller/validator/common';
import { supportedQueryValidator } from '@/controller/validator/game-version-group';
import container from '@/registory/inversify.config';
import TYPES from '@/registory/inversify.types';
import { AppRouter, Routing } from 'app-router';
import { AppRequest, AppResponse } from 'express';
import 'reflect-metadata';
import LanguageController from './controller/Language.controller';
import RegionController from './controller/Region.controller';

export const ROUTING: Readonly<Routing> = {
    API: '/pokemon-api/v1',
    POKEMON: '/pokemons',
    GAME_VERSION_GROUP: '/game-version-groups',
    REGION: '/regions',
    LANGUAGE: '/languages',
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
                    validator: [langQueryValidator],
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
                    validator: [langQueryValidator, supportedQueryValidator],
                    action: (req: AppRequest<any>, res: AppResponse<any>) => {
                        const gameVersionGroupControllerContainer = container.get<GameVersionGroupController>(
                            TYPES.GameVersionGroupController
                        );
                        gameVersionGroupControllerContainer.search(req, res);
                    },
                },
            ],
        },
        {
            path: ROUTING.REGION,
            children: [
                {
                    method: 'get',
                    path: '/',
                    validator: [langQueryValidator],
                    action: (req: AppRequest<any>, res: AppResponse<any>) => {
                        const regionControllerContainer = container.get<RegionController>(
                            TYPES.RegionController
                        );
                        regionControllerContainer.search(req, res);
                    },
                },
            ],
        },
        {
            path: ROUTING.LANGUAGE,
            children: [
                {
                    method: 'get',
                    path: '/',
                    action: (req: AppRequest<any>, res: AppResponse<any>) => {
                        const languageControllerContainer = container.get<LanguageController>(
                            TYPES.LanguageController
                        );
                        languageControllerContainer.search(req, res);
                    },
                },
            ],
        },
    ],
} as Readonly<AppRouter>;
