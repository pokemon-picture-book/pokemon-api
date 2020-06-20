import { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

import TYPES from '@/registory/inversify.types';
import ISearchPokemonUsecase from '@/usecase/pokemon/ISearchPokemon.usecase';
import PokemonSearchResponse from '@/usecase/dto/model/PokemonSearchResponse';

@injectable()
export default class PokemonController {
    @inject(TYPES.ISearchPokemonUsecase)
    private usecase: ISearchPokemonUsecase;

    async search(request: Request, res: Response): Promise<void> {
        const languageId = Number(request.query.languageId) || 1;
        const gameVersionGroupId =
            Number(request.query.gameVersionGroupId) || 1;
        const regionIds =
            request.query.regionIds && Array.isArray(request.query.regionIds)
                ? request.query.regionIds.map(regionId => Number(regionId))
                : [1];

        const response: PokemonSearchResponse[] = await this.usecase.search(
            languageId,
            gameVersionGroupId,
            regionIds
        );

        res.status(201).json(response);
    }
}
