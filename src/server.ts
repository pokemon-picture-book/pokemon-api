import settingRouter from '@/domain/function/express-router.function';
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
        limit: REQUEST_LIMIT || '100kb',
    })
);
app.use(cookieParser(SESSION_SECRET || 'mySecret'));

if (NODE_ENV === 'development') {
    app.use(express.static('public'));
}

settingRouter(app, appRoutes);

export default app;
