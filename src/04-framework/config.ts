type HttpUrl = `${'http' | 'https'}://${string}`;

type AppConfigDetail = {
    readonly CORS_ALLOW_ORIGIN_URL: HttpUrl | HttpUrl[];
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
        CORS_ALLOW_ORIGIN_URL: [
            'http://localhost:8080',
            'http://localhost:6006',
            // iphone の IP アドレスを記載
            // mac の IP アドレスを記載
        ],
        REQUEST_LIMIT: '100kb',
        SESSION_SECRET: 'mySecret',
    },
    production: {
        CORS_ALLOW_ORIGIN_URL: 'http://localhost:8080',
        REQUEST_LIMIT: '100kb',
        SESSION_SECRET: 'mySecret',
    },
} as AppConfig;
