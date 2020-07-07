import ExpressRouter from '@/domain/ExpressRouter';
import appRoutes from '@/routes';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { Application } from 'express';

const app: Application = express();

const { NODE_ENV, REQUEST_LIMIT, SESSION_SECRET } = process.env;

app.use(bodyParser.json({ limit: REQUEST_LIMIT || '100kb' }));
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: REQUEST_LIMIT || '100kb'
    })
);
app.use(cookieParser(SESSION_SECRET || 'mySecret'));

if (NODE_ENV === 'development') {
    app.use(express.static('public'));
}

const expressRouter = new ExpressRouter(appRoutes);
const { path, router } = expressRouter.setting();

app.use(path, router);

export default app;
