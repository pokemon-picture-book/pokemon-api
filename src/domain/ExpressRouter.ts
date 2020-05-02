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
        const itemRouter = Router({ mergeParams: true });

        for (const route of routes) {
            if (this.isChildRouter(route)) {
                const settingRoute = this.getSettingRouter(
                    route.children,
                    path + route.path
                );
                itemRouter.use(settingRoute.path, settingRoute.router);
            } else if (this.isOperationRouter(route)) {
                this.setRouteAction(route, itemRouter);
            }
        }

        return { path, router: itemRouter };
    }

    private setRouteAction(route: OperationRouter, itemRouter: Router) {
        switch (route.method) {
            case 'all':
                itemRouter
                    .route(route.path)
                    .all((req, res) => route.action(req, res));
                break;
            case 'get':
                itemRouter
                    .route(route.path)
                    .get((req, res) => route.action(req, res));
                break;
            case 'post':
                itemRouter
                    .route(route.path)
                    .post((req, res) => route.action(req, res));
                break;
            case 'put':
                itemRouter
                    .route(route.path)
                    .put((req, res) => route.action(req, res));
                break;
            case 'delete':
                itemRouter
                    .route(route.path)
                    .delete((req, res) => route.action(req, res));
                break;
            case 'patch':
                itemRouter
                    .route(route.path)
                    .patch((req, res) => route.action(req, res));
                break;
            case 'options':
                itemRouter
                    .route(route.path)
                    .options((req, res) => route.action(req, res));
                break;
            case 'head':
                itemRouter
                    .route(route.path)
                    .head((req, res) => route.action(req, res));
                break;
            default:
        }
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
