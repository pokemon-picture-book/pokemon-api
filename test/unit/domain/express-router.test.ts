/* eslint-disable no-undef */
import ExpressRouter from '@/domain/ExpressRouter';
import * as express from 'express';
import { AppRequest, AppResponse } from 'express';
import * as request from 'supertest';

describe('Unit test for ExpressRouter', () => {
    test('正常: routing 設定した場合、正しくエンドポイントを叩けるか', done => {
        const server = express();

        const appRoutes: AppRouter = {
            base: '/test1',
            routes: [
                {
                    path: '/test2',
                    children: [
                        {
                            method: 'get',
                            path: '/',
                            action: (
                                _: AppRequest<any>,
                                res: AppResponse<any>
                            ) => {
                                res.status(200).send('ok');
                            }
                        },
                        {
                            method: 'post',
                            path: '/',
                            action: (
                                _: AppRequest<any>,
                                res: AppResponse<any>
                            ) => {
                                res.status(201).send('ok');
                            }
                        },
                        {
                            path: '/test3',
                            children: [
                                {
                                    method: 'put',
                                    path: '/',
                                    action: (
                                        _: AppRequest<any>,
                                        res: AppResponse<any>
                                    ) => {
                                        res.status(204).send('ok');
                                    }
                                },
                                {
                                    path: '/test4',
                                    children: [
                                        {
                                            method: 'delete',
                                            path: '/',
                                            action: (
                                                _: AppRequest<any>,
                                                res: AppResponse<any>
                                            ) => {
                                                res.status(204).send('ok');
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    path: '/test5',
                    children: [
                        {
                            method: 'get',
                            path: '/',
                            action: (
                                _: AppRequest<any>,
                                res: AppResponse<any>
                            ) => {
                                res.status(200).send('ok');
                            }
                        }
                    ]
                }
            ]
        };

        const expressRouter = new ExpressRouter(appRoutes);
        const { path, router } = expressRouter.setting();

        server.use(path, router);

        const agent = request.agent(server);

        agent.get('/test1/test2').expect(200);
        agent.post('/test1/test2').expect(201);
        agent.put('/test1/test2/test3').expect(204);
        agent.delete('/test1/test2/test3/test4').expect(204);
        agent.get('/test1/test5').expect(200);

        done();
    });
});
