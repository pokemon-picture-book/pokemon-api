import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { Application } from 'express';
import * as http from 'http';
import * as os from 'os';
import { BaseEntity, ConnectionOptions, createConnection } from 'typeorm';
import appRoutes from '@/routes';
import ExpressRouter from '@/domain/ExpressRouter';
import Pngs from '@/domain/entities/Pngs';
import Pokemons from '@/domain/entities/Pokemons';
import PokemonTypes from '@/domain/entities/PokemonTypes';
import Specs from '@/domain/entities/Specs';
import Types from '@/domain/entities/Types';

const ormconfig = require('~/ormconfig');

export default class ExpressServer {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public start(): Application {
        this.applicationSetting();
        this.routerSetting();
        this.dbConnection();
        return this.listen();
    }

    private applicationSetting() {
        const { NODE_ENV, REQUEST_LIMIT, SESSION_SECRET } = process.env;

        this.app.use(bodyParser.json({ limit: REQUEST_LIMIT || '100kb' }));
        this.app.use(
            bodyParser.urlencoded({
                extended: true,
                limit: REQUEST_LIMIT || '100kb'
            })
        );
        this.app.use(cookieParser(SESSION_SECRET || 'mySecret'));

        if (NODE_ENV === 'development') {
            this.app.use(express.static('public'));
        }
    }

    private routerSetting(): void {
        const expressRouter = new ExpressRouter(appRoutes);
        const { path, router } = expressRouter.setting();

        this.app.use(path, router);
    }

    private async dbConnection(): Promise<void> {
        const envConnectionOptions: ConnectionOptions = ormconfig.find(
            (o: ConnectionOptions) => o.name === process.env.NODE_ENV
        );

        if (!envConnectionOptions) {
            throw new Error('Please specify either development or production!');
        }

        const connectionOptions: ConnectionOptions = {
            ...envConnectionOptions,
            entities: [Pngs, Pokemons, PokemonTypes, Specs, Types],
            migrations: []
        };

        const connection = await createConnection(connectionOptions);
        BaseEntity.useConnection(connection);
    }

    private listen(): Application {
        const port = process.env.PORT || '3000';
        const host = process.env.HOST || 'localhost';
        http.createServer(this.app).listen(Number(port), host, () => {
            console.info(
                `up and running in ${process.env.NODE_ENV ||
                    'development'} @: ${os.hostname()} on port: ${port}, host: ${host}`
            );
        });
        return this.app;
    }
}
