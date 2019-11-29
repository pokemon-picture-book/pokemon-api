import * as express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import * as cookieParser from 'cookie-parser';
import { createConnection, BaseEntity } from 'typeorm';

import appRoutes from '@/routes';
import ExpressRouter from '@/domain/ExpressRouter';
import * as ormconfig from '../ormconfig';

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
        const { NODE_ENV } = process.env;
        const connection = await createConnection(
            ormconfig.find((o: { name: string }) => o.name === NODE_ENV)
        );

        BaseEntity.useConnection(connection);
    }

    private listen(): Application {
        const { NODE_ENV, PORT, HOST } = process.env;
        const port = PORT || '3000';
        const host = HOST || 'localhost';
        http.createServer(this.app).listen(Number(port), host, () => {
            console.info(
                `up and running in ${NODE_ENV ||
                    'development'} @: ${os.hostname()} on port: ${port}, host: ${host}`
            );
        });
        return this.app;
    }
}
