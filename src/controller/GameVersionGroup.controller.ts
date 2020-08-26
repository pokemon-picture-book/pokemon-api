// import { getDefaultSet } from '@/domain/function/game-region.function';
import { GameVersionGroupResponse } from '@/@types/response-model';
import TYPES from '@/registory/inversify.types';
import IGameVersionGroupUsecase from '@/usecase/IGameVersionGroup.usecase';
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
        // console.log(typeof supported === 'boolean');
        // console.log(supported);
        // console.log(!(supported));
        // console.log(!supported);
        const isSupported = !(typeof supported === 'boolean' && !supported);

        const result: GameVersionGroupResponse[] = await this.usecase.search(
            lang || 'en',
            isSupported
        );
        // console.log(isSupported);
        // console.log(111);
        // console.log(lang);
        // console.log(result);
        if (!result.length) {
            response.status(404).send({ message: 'Not Found!' });
            return;
        }

        response.status(200).json(result);
    }
}
