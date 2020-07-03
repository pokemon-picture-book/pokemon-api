import { Router } from 'express';
import {
    isSupportedHttpMethod,
    isOperationRouter,
    isChildRouter
} from '@/domain/function/router.function';

export default class ExpressRouter {
    private appRoutes: AppRouter;

    constructor(appRoutes: AppRouter) {
        this.appRoutes = appRoutes;
    }

    public setting(): ItemRouter & { router: Router } {
        const { base, routes }: AppRouter = this.appRoutes;
        const { router } = this.getSettingRouter(routes);

        return { path: base, router };
    }

    private getSettingRouter(
        routes: (OperationRouter | ChildRouter)[],
        path: string = ''
    ): ItemRouter & { router: Router } {
        const itemRouter = Router({ mergeParams: true });

        for (const route of routes) {
            if (isChildRouter(route)) {
                const settingRoute = this.getSettingRouter(
                    route.children,
                    path + route.path
                );
                itemRouter.use(settingRoute.path, settingRoute.router);
            } else if (
                isOperationRouter(route) &&
                isSupportedHttpMethod(route.method)
            ) {
                itemRouter
                    .route(route.path)
                    [route.method]((req, res) => route.action(req, res));
            }
        }

        return { path, router: itemRouter };
    }
}
