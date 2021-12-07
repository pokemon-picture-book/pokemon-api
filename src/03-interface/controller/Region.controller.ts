import TYPES from '@/inversify.types';
import IRegionUsecase from '@/02-application/usecase/IRegion.usecase';
import { RegionQueryParam } from 'app-request-model';
import { RegionResponse } from 'app-response-model';
import { AppErrorMessage, AppRequest, AppResponse, Request } from 'express';
import { validationResult } from 'express-validator';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export default class RegionController {
    @inject(TYPES.IRegionUsecase)
    private usecase: IRegionUsecase;

    async search(
        request: AppRequest<{
            query: RegionQueryParam;
        }>,
        response: AppResponse<AppErrorMessage | RegionResponse[]>
    ): Promise<void> {
        const errors = validationResult(request as Request);
        if (!errors.isEmpty()) {
            response.status(400).send({ errors: errors.array() });
            return;
        }

        const { lang } = request.query;

        const result: RegionResponse[] = await this.usecase.search(
            lang || 'en'
        );

        if (!result.length) {
            response.status(204).send({ message: 'No Content!' });
            return;
        }

        response.status(200).json(result);
    }
}
