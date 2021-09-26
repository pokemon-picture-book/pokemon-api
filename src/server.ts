import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as cors from 'cors';
import settingRouter from '@/domain/function/express-router.function';
import appRoutes from '@/routes';
import config from '@/config';
import * as cluster from 'cluster';

const app = express();

const appConfig = config[process.env.NODE_ENV];

const corsOptions = {
    origin: appConfig.CORS_ALLOW_ORIGIN_URL,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: appConfig.REQUEST_LIMIT || '100kb' }));
app.use(
    express.urlencoded({
        extended: true,
        limit: appConfig.REQUEST_LIMIT || '100kb',
    })
);
app.use(cookieParser(appConfig.SESSION_SECRET || 'mySecret'));
// interceptor
app.use((_, __, next) => {
    if (process.env.NODE_ENV !== 'test') {
        console.info(`[${new Date()}] [PID ${cluster.worker.process.pid}]`);
    }
    next();
});

if (process.env.NODE_ENV === 'development') {
    app.use(express.static('public'));
}

settingRouter(app, appRoutes);

export default app;
