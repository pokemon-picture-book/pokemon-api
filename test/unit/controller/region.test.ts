import RegionController from '@/controller/Region.controller';
import { controllerContainer } from '@test/unit/registory/inversify.config';
import TYPES from '@test/unit/registory/inversify.types';
import { AppRequest, AppResponse } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';

jest.mock('express-validator');

describe('Unit test for Region controller', () => {
    const controller: RegionController = controllerContainer.get<RegionController>(
        TYPES.RegionController
    );

    test('正常: 200 ステータス確認', async (done) => {
        (validationResult as jest.MockedFunction<
            typeof validationResult
        >).mockImplementation(
            () =>
                ({
                    isEmpty: () => true,
                } as Result<ValidationError>)
        );

        const req = {
            query: {
                lang: 'en',
            },
        };

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
        (validationResult as jest.MockedFunction<
            typeof validationResult
        >).mockImplementation(
            () =>
                ({
                    isEmpty: () => true,
                } as Result<ValidationError>)
        );

        const req = {
            query: {
                lang: 'ja-Hrkt',
            },
        };

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

    test('正常: 400 ステータス確認', async (done) => {
        const myValidationResult = validationResult as jest.MockedFunction<
            typeof validationResult
        >;
        myValidationResult.mockImplementation(() => {
            return {
                isEmpty: () => false,
                array: () => [
                    {
                        value: 'mock value',
                        msg: 'mock message',
                        param: 'mock param',
                        location: 'body',
                    },
                ],
            } as Result<ValidationError>;
        });

        const req = {
            query: {
                lang: 'en',
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };

        await controller.search(
            req as AppRequest<any>,
            res as AppResponse<any>
        );

        expect(res.status.mock.calls[0][0]).toBe(400);
        expect(res.send.mock.calls[0][0]).toEqual({
            errors: [
                {
                    value: 'mock value',
                    msg: 'mock message',
                    param: 'mock param',
                    location: 'body',
                },
            ],
        });

        done();
    });
});
