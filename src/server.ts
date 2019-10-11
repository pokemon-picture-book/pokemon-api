import * as express from 'express';
import { Application } from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import * as cookieParser from 'cookie-parser';

import routes from './routes';

export default class ExpressServer {
    private app: Application;

    private port: string;

    private host: string;

    constructor(port: string = '3000', host: string = 'localhost') {
        this.app = express();
        this.port = port;
        this.host = host;
    }

    public start(): Application {
        this.setting();
        this.router();
        return this.listen();
    }

    private setting() {
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

    private router(): void {
        routes(this.app);
    }

    private listen(): Application {
        http.createServer(this.app).listen(
            Number(this.port),
            this.host,
            function(this: ExpressServer) {
                console.info(
                    `up and running in ${process.env.NODE_ENV ||
                        'development'} @: ${os.hostname()} on port: ${
                        this.port
                    }, host: ${this.host}`
                );
            }.bind(this)
        );
        return this.app;
    }
}
