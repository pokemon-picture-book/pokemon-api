import { getDefaultSet } from '@/domain/function/game-region.function';
import TYPES from '@/registory/inversify.types';
import ISearchPokemonUsecase from '@/usecase/ISearchPokemon.usecase';
import { SearchPokemonQueryParam } from 'app-request-model';
import { PokemonSearchResponse } from 'app-response-model';
import { AppRequest, AppResponse, AppErrorMessage } from 'express';
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
        response: AppResponse<AppErrorMessage | PokemonSearchResponse[]>
    ): Promise<void> {
        const { lang, game, regions } = request.query;
        const gameResion = getDefaultSet(game, regions);

        const result: PokemonSearchResponse[] = await this.usecase.search(
            lang || 'en',
            gameResion.game,
            gameResion.regions
        );

        if (!result.length) {
            response.status(404).send({ message: 'Not Found!' });
            return;
        }

        response.status(200).json(result);
    }
}
