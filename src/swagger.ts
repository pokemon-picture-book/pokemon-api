import * as middleware from 'swagger-express-middleware';
import { Application } from 'express';
import errorHandler from './middlewares/error.handler';

export default function(app: Application, routes: (app: Application) => void) {
    middleware('config/doc/openapi.yml', app, (err, m) => {
        // Enable Express' case-sensitive and strict options
        // (so "/entities", "/Entities", and "/Entities/" are all different)
        app.enable('case sensitive routing');
        app.enable('strict routing');

        app.use(m.metadata());
        app.use(
            m.files(app, {
                apiPath: '/api/v1/spec'
            })
        );

        app.use(
            m.parseRequest({
                // Configure the cookie parser to use secure cookies
                cookie: {
                    secret: process.env.SESSION_SECRET || 'mySecret'
                },
                // Don't allow JSON content over 100kb (default is 1mb)
                json: {
                    limit: process.env.REQUEST_LIMIT || '100kb'
                }
            })
        );

        // These two middleware don't have any options (yet)
        app.use(m.CORS(), m.validateRequest());

        routes(app);

        // eslint-disable-next-line no-unused-vars, no-shadow
        app.use(errorHandler);
    });
}
