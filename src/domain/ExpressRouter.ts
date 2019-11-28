import * as express from 'express';
import { Router } from 'express';

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
        const itemRouter = express.Router({ mergeParams: true });

        for (const route of routes) {
            if (this.isChildRouter(route)) {
                const settingRoute = this.getSettingRouter(
                    route.children,
                    path + route.path
                );
                itemRouter.use(settingRoute.path, settingRoute.router);
            } else if (this.isOperationRouter(route)) {
                itemRouter
                    .route(route.path)
                    [route.method]((req, res) => route.action(req, res));
            }
        }

        return { path, router: itemRouter };
    }

    private isChildRouter(
        router: OperationRouter | ChildRouter
    ): router is ChildRouter {
        return 'children' in router;
    }

    private isOperationRouter(
        router: OperationRouter | ChildRouter
    ): router is OperationRouter {
        return 'action' in router;
    }
}
