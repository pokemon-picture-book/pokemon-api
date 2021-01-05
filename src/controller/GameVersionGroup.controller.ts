import TYPES from '@/registory/inversify.types';
import IGameVersionGroupUsecase from '@/usecase/IGameVersionGroup.usecase';
import { GameVersionGroupQueryParam } from 'app-request-model';
import { GameVersionGroupResponse } from 'app-response-model';
import { AppErrorMessage, AppRequest, AppResponse } from 'express';
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
        const { lang, supported } = request.query;

        // TODO: 真偽値以外のパラメータを送れるのがよくないので、あとでバリデータ追加
        const isSupported = supported !== 'false';
        const result: GameVersionGroupResponse[] = await this.usecase.search(
            lang || 'en',
            isSupported
        );

        if (!result.length) {
            response.status(404).send({ message: 'Not Found!' });
            return;
        }

        response.status(200).json(result);
    }
}
