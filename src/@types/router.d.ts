declare module 'app-router' {
    import { ValidationChain } from 'express-validator';

    export type Routing = {
        API: '/pokemon-api/v1';
        POKEMON: '/pokemons';
        GAME_VERSION_GROUP: '/game-version-groups';
        REGION: '/regions';
        LANGUAGE: '/languages';
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
