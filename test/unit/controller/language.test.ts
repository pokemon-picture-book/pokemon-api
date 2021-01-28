import LanguageController from '@/controller/Language.controller';
import ILanguageUsecase from '@/usecase/ILanguage.usecase';
import { controllerContainer } from '@test/unit/registory/inversify.config';
import TYPES from '@test/unit/registory/inversify.types';
import { AppRequest, AppResponse } from 'express';
import {
    LanguageEmptyMockInteractor,
    LanguageMockInteractor,
} from '../mock/interactor/LanguageMock.interactor';

describe('Unit test for Language controller', () => {
    test('正常: 200 ステータス確認', async (done) => {
        controllerContainer
            .rebind<ILanguageUsecase>(TYPES.ILanguageUsecase)
            .to(LanguageMockInteractor)
            .inSingletonScope();

        const controller: LanguageController = controllerContainer.get<LanguageController>(
            TYPES.LanguageController
        );

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        await controller.search(
            req as AppRequest<any>,
            res as AppResponse<any>
        );

        expect(res.status.mock.calls[0][0]).toBe(200);
        expect(res.json.mock.calls[0][0].length).toBe(1);

        done();
    });

    test('正常: 204 ステータス確認', async (done) => {
        controllerContainer
            .rebind<ILanguageUsecase>(TYPES.ILanguageUsecase)
            .to(LanguageEmptyMockInteractor)
            .inSingletonScope();

        const controller: LanguageController = controllerContainer.get<LanguageController>(
            TYPES.LanguageController
        );

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };

        await controller.search(
            req as AppRequest<any>,
            res as AppResponse<any>
        );

        expect(res.status.mock.calls[0][0]).toBe(204);
        expect(res.send.mock.calls[0][0]).toEqual({
            message: 'No Content!',
        });

        done();
    });
});
