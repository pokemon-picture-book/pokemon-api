import TYPES from '@/inversify.types';
import ILanguageUsecase from '@/02-application/usecase/ILanguage.usecase';
import { LanguageResponse } from 'app-response-model';
import { AppErrorMessage, AppRequest, AppResponse } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export default class LanguageController {
    @inject(TYPES.ILanguageUsecase)
    private usecase: ILanguageUsecase;

    async search(
        _: AppRequest<{}>,
        response: AppResponse<AppErrorMessage | LanguageResponse[]>
    ): Promise<void> {
        const result: LanguageResponse[] = await this.usecase.search();

        if (!result.length) {
            response.status(204).send({ message: 'No Content!' });
            return;
        }

        response.status(200).json(result);
    }
}
