declare type Routing = {
    API: string;
    POKEMON: string;
    GAME_VERSION_GROUP: string;
};

declare type AppRouter = {
    base: string;
    routes: (OperationRouter | ChildRouter)[];
};

declare type ItemRouter = {
    path: string;
};

declare type OperationRouter = ItemRouter & {
    method: string;
    action: function;
};

declare type ChildRouter = ItemRouter & {
    children: (OperationRouter | ChildRouter)[];
};
