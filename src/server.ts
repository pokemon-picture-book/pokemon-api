import * as express from 'express';
import { Application } from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import * as cookieParser from 'cookie-parser';

import installValidator from './swagger';

const app = express();

export default class ExpressServer {
    constructor() {
        const root = path.normalize(`${__dirname}/..`);
        app.set('appPath', `${root}client`);
        app.use(
            bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' })
        );
        app.use(
            bodyParser.urlencoded({
                extended: true,
                limit: process.env.REQUEST_LIMIT || '100kb'
            })
        );
        app.use(cookieParser(process.env.SESSION_SECRET || 'mySecret'));
        app.use(express.static('public'));
    }

    router(routes: (app: Application) => void): ExpressServer {
        installValidator(app, routes);
        return this;
    }

    listen(p: string | number = process.env.PORT): Application {
        const welcome = port => () =>
            console.info(
                `up and running in ${process.env.NODE_ENV ||
                    'development'} @: ${os.hostname()} on port: ${port}}`
            );
        http.createServer(app).listen(p, welcome(p));
        return app;
    }
}
