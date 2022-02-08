import TYPES from '@/inversify.types';
import ISearchPokemonUsecase from '@/02-application/usecase/ISearchPokemon.usecase';
import { LIMIT_MAX_NUM } from '@/01-enterprise/constant/pagination';
import {
    SearchAllPokemonQueryParam,
    SearchOnePokemonQueryParam,
    SearchOnePokemonStatusQueryParam,
    SearchSimpleAllPokemonQueryParam,
} from 'app-request-model';
import {
    SearchAllPokemonResponse,
    SearchOnePokemonResponse,
    SearchOnePokemonStatusResponse,
    SearchSimplePokemonResponse,
} from 'app-response-model';
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
            query: SearchAllPokemonQueryParam;
        }>,
        response: AppResponse<AppErrorMessage | SearchAllPokemonResponse>
    ): Promise<void> {
        const errors = validationResult(request as Request);
        if (!errors.isEmpty()) {
            response.status(400).send({ errors: errors.array() });
            return;
        }

        const { lang, game, regions, offset, limit } = request.query;
        const result: SearchAllPokemonResponse = await this.usecase.searchAll(
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

    async searchSimpleAll(
        request: AppRequest<{
            query: SearchSimpleAllPokemonQueryParam;
        }>,
        response: AppResponse<AppErrorMessage | SearchSimplePokemonResponse>
    ): Promise<void> {
        const errors = validationResult(request as Request);
        if (!errors.isEmpty()) {
            response.status(400).send({ errors: errors.array() });
            return;
        }

        const { lang } = request.query;
        const result = await this.usecase.searchSimpleData({
            languageName: lang,
        });

        if (!result.hits) {
            response.status(204).send({ message: 'No Content!' });
            return;
        }

        response.status(200).json(result);
    }

    async searchOne(
        request: AppRequest<{
            query: SearchOnePokemonQueryParam;
            params: {
                id: string;
            };
        }>,
        response: AppResponse<AppErrorMessage | SearchOnePokemonResponse>
    ): Promise<void> {
        const errors = validationResult(request as Request);
        if (!errors.isEmpty()) {
            response.status(400).send({ errors: errors.array() });
            return;
        }

        const { id } = request.params;
        const { lang, game } = request.query;
        const result = await this.usecase.searchOne({
            id: Number(id),
            languageName: lang,
            gameVersionGroupAlias: game,
        });

        if (!result) {
            response.status(404).send({ message: 'Not Found!' });
            return;
        }

        response.status(200).json(result);
    }

    async searchOneStatus(
        request: AppRequest<{
            query: SearchOnePokemonStatusQueryParam;
            params: {
                id: string;
            };
        }>,
        response: AppResponse<AppErrorMessage | SearchOnePokemonStatusResponse>
    ): Promise<void> {
        const errors = validationResult(request as Request);
        if (!errors.isEmpty()) {
            response.status(400).send({ errors: errors.array() });
            return;
        }

        const { id } = request.params;
        const { lang } = request.query;
        const result = await this.usecase.searchOneStatus({
            id: Number(id),
            languageName: lang,
        });

        if (!result) {
            response.status(404).send({ message: 'Not Found!' });
            return;
        }

        response.status(200).json(result);
    }
}
