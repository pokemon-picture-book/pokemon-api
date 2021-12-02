import TYPES from '@/inversify.types';
import IGameVersionGroupUsecase from '@/02-application/usecase/IGameVersionGroup.usecase';
import { GameVersionGroupQueryParam } from 'app-request-model';
import { GameVersionGroupResponse } from 'app-response-model';
import { AppErrorMessage, AppRequest, AppResponse, Request } from 'express';
import { validationResult } from 'express-validator';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export default class GameVersionGroupController {
    @inject(TYPES.IGameVersionGroupUsecase)
    private usecase: IGameVersionGroupUsecase;

    async search(
        request: AppRequest<{
            query: GameVersionGroupQueryParam;
        }>,
        response: AppResponse<AppErrorMessage | GameVersionGroupResponse[]>
    ): Promise<void> {
        const errors = validationResult(request as Request);
        if (!errors.isEmpty()) {
            response.status(400).send({ errors: errors.array() });
            return;
        }

        const { lang, supported } = request.query;

        // TODO: 真偽値以外のパラメータを送れるのがよくないので、あとでバリデータ追加
        const isSupported = supported !== 'false';
        const result: GameVersionGroupResponse[] = await this.usecase.search(
            lang || 'en',
            isSupported
        );

        if (!result.length) {
            response.status(204).send({ message: 'No Content!' });
            return;
        }

        response.status(200).json(result);
    }
}
