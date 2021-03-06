declare module 'app-router' {
    import { ValidationChain } from 'express-validator';

    export type Routing = {
        API: string;
        POKEMON: string;
        GAME_VERSION_GROUP: string;
        REGION: string;
        LANGUAGE: string;
    };

    export type ItemRouter = {
        path: string;
    };

    export type OperationRouter = ItemRouter & {
        method: string;
        action: function;
        validator?: ValidationChain[];
    };

    export type ChildRouter = ItemRouter & {
        children: (OperationRouter | ChildRouter)[];
    };

    export type AppRouter = {
        base: string;
        routes: (OperationRouter | ChildRouter)[];
    };
}
