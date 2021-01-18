import {
    isChildRouter,
    isOperationRouter,
    isSupportedHttpMethod,
} from '@/domain/function/router.function';
import { AppRouter, ChildRouter, OperationRouter } from 'app-router';
import { Application, AppRequest, AppResponse, Router } from 'express';

const setRouter = (
    app: Application,
    routes: (OperationRouter | ChildRouter)[],
    path: string = ''
) => {
    const router = Router();

    routes.forEach((route) => {
        if (isChildRouter(route)) {
            setRouter(app, route.children, `${path}${route.path}`);
            return;
        }

        if (isOperationRouter(route) && isSupportedHttpMethod(route.method)) {
            router.use((req, _, next) => {
                console.log('[%o]: %s', new Date(), req.baseUrl);
                next();
            });

            if (route.validator && route.validator.length) {
                router[route.method](
                    route.path,
                    route.validator,
                    (req: AppRequest<any>, res: AppResponse<any>) =>
                        route.action(req, res)
                );
                return;
            }

            router[route.method](
                route.path,
                (req: AppRequest<any>, res: AppResponse<any>) =>
                    route.action(req, res)
            );
        }
    });

    app.use(path, router);
};

export default (app: Application, appRoutes: AppRouter) => {
    const { base, routes } = appRoutes;
    setRouter(app, routes, base);
};
