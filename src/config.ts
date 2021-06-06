type AppConfigDetail = {
    readonly CORS_ALLOW_ORIGIN_URL: `${'http' | 'https'}://${string}`;
    readonly REQUEST_LIMIT: string;
    readonly SESSION_SECRET: string;
};

type AppConfig = {
    development: AppConfigDetail;
    production: AppConfigDetail;
};

export default {
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
