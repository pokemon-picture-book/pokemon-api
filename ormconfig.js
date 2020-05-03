const parseDBConfig = configString => {
    return configString ? JSON.parse(configString) : {};
};

const DB_CONFIG = parseDBConfig(process.env.DB_CONFIG);

module.exports = [
    {
        name: 'development',
        type: 'mysql',
        host: DB_CONFIG.host || 'localhost',
        port: Number(DB_CONFIG.port) || 3306,
        username: DB_CONFIG.username || 'pokemon',
        password: DB_CONFIG.password || 'pokemon',
        database: DB_CONFIG.database || 'pokemon',
        synchronize: true,
        logging: false,
        entities: ['./src/domain/entities/**/*.ts'],
        migrations: ['./db/migrations/**/*.ts'],
        cli: {
            entitiesDir: 'src/domain/entities',
            migrationsDir: 'db/migrations'
        }
    },
    {
        // TODO: production 環境が出来上がり次第、ここの設定も変更予定
        name: 'production',
        type: 'mysql',
        host: DB_CONFIG.host || 'localhost',
        port: Number(DB_CONFIG.port) || 3306,
        username: DB_CONFIG.username || 'pokemon',
        password: DB_CONFIG.password || 'pokemon',
        database: DB_CONFIG.database || 'pokemon',
        synchronize: true,
        logging: false,
        entities: ['./src/domain/entities/**/*.ts'],
        migrations: ['./db/migrations/**/*.ts'],
        cli: {
            entitiesDir: 'src/domain/entities',
            migrationsDir: 'db/migrations'
        }
    }
];
