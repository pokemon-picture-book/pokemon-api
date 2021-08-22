import TYPES from '@/registory/inversify.types';
import ISearchPokemonUsecase from '@/usecase/ISearchPokemon.usecase';
import { LIMIT_MAX_NUM } from '@/domain/constant/pagination';
import { SearchPokemonQueryParam } from 'app-request-model';
import { PokemonSearchResponse } from 'app-response-model';
import { AppRequest, AppResponse, AppErrorMessage, Request } from 'express';
import { validationResult } from 'express-validator';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export default class PokemonController {
    @inject(TYPES.ISearchPokemonUsecase)
    private usecase: ISearchPokemonUsecase;

    async search(
        request: AppRequest<{
            query: SearchPokemonQueryParam;
        }>,
        response: AppResponse<AppErrorMessage | PokemonSearchResponse>
    ): Promise<void> {
        const errors = validationResult(request as Request);
        if (!errors.isEmpty()) {
            response.status(400).send({ errors: errors.array() });
            return;
        }

        const { lang, game, regions, offset, limit } = request.query;
        const result: PokemonSearchResponse = await this.usecase.search(
            {
                languageName: lang,
                gameVersionGroupAlias: game,
                regionNames: regions,
            },
            {
                offset: (offset || 1) - 1,
                limit: limit || LIMIT_MAX_NUM,
            }
        );

        if (!result.hits) {
            response.status(204).send({ message: 'No Content!' });
            return;
        }

        response.status(200).json(result);
    }
}
