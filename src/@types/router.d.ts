declare module 'app-router' {
    export type Routing = {
        API: string;
        POKEMON: string;
        GAME_VERSION_GROUP: string;
    };

    export type ItemRouter = {
        path: string;
    };

    export type OperationRouter = ItemRouter & {
        method: string;
        action: function;
    };

    export type ChildRouter = ItemRouter & {
        children: (OperationRouter | ChildRouter)[];
    };

    export type AppRouter = {
        base: string;
        routes: (OperationRouter | ChildRouter)[];
    };
}
