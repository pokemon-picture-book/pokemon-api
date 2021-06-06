type AppConfigDetail = {
    readonly CORS_ALLOW_ORIGIN_URL: `${'http' | 'https'}://${string}`;
    readonly REQUEST_LIMIT: string;
    readonly SESSION_SECRET: string;
};

type AppConfig = {
    test: AppConfigDetail;
    development: AppConfigDetail;
    production: AppConfigDetail;
};

export default {
    test: {
        CORS_ALLOW_ORIGIN_URL: 'http://localhost:8080',
        REQUEST_LIMIT: '100kb',
        SESSION_SECRET: 'mySecret',
    },
    development: {
        CORS_ALLOW_ORIGIN_URL: 'http://localhost:8080',
        REQUEST_LIMIT: '100kb',
        SESSION_SECRET: 'mySecret',
    },
    production: {
        CORS_ALLOW_ORIGIN_URL: 'http://localhost:8080',
        REQUEST_LIMIT: '100kb',
        SESSION_SECRET: 'mySecret',
    },
} as AppConfig;
