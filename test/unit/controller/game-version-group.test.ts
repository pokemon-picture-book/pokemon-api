import GameVersionGroupController from '@/controller/GameVersionGroup.controller';
import { controllerContainer } from '@test/unit/registory/inversify.config';
import TYPES from '@test/unit/registory/inversify.types';
import { AppRequest, AppResponse } from 'express';

describe('Unit test for GameVersionGroup controller', () => {
    const controller: GameVersionGroupController = controllerContainer.get<
        GameVersionGroupController
    >(TYPES.GameVersionGroupController);

    test('正常: 200 ステータス確認', async done => {
        const req = {
            query: {
                lang: true,
                supported: 'true'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };

        await controller.search(
            req as AppRequest<any>,
            res as AppResponse<any>
        );

        expect(res.status.mock.calls[0][0]).toBe(200);
        expect(res.json.mock.calls[0][0].length).toBe(1);

        done();
    });

    test('正常: 404 ステータス確認', async done => {
        const req = {
            query: {
                lang: false,
                supported: 'false'
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis()
        };

        await controller.search(
            req as AppRequest<any>,
            res as AppResponse<any>
        );

        expect(res.status.mock.calls[0][0]).toBe(404);
        expect(res.send.mock.calls[0][0]).toEqual({
            message: 'Not Found!'
        });

        done();
    });
});
