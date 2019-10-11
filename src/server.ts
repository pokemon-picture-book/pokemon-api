import * as express from 'express';
import { Application } from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import * as cookieParser from 'cookie-parser';

export default class ExpressServer {
    private app: Application;

    constructor() {
        this.app = express();
        const root = path.normalize(`${__dirname}/..`);
        this.app.set('appPath', `${root}client`);
        this.app.use(
            bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' })
        );
        this.app.use(
            bodyParser.urlencoded({
                extended: true,
                limit: process.env.REQUEST_LIMIT || '100kb'
            })
        );
        this.app.use(cookieParser(process.env.SESSION_SECRET || 'mySecret'));

        if (process.env.NODE_ENV === 'development') {
            this.app.use(express.static('public'));
        }
    }

    router(routes: (app: Application) => void): ExpressServer {
        routes(this.app);
        return this;
    }

    listen(p: string = '3000', host: string = 'localhost'): Application {
        const welcome = port => () =>
            console.info(
                `up and running in ${process.env.NODE_ENV ||
                    'development'} @: ${os.hostname()} on port: ${port}, host: ${host}`
            );
        http.createServer(this.app).listen(Number(p), host, welcome(p));
        return this.app;
    }
}
