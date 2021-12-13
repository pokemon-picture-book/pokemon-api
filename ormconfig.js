const parseDBConfig = configString => {
    return configString ? JSON.parse(configString) : {};
};

const DB_CONFIG = parseDBConfig(process.env.DB_CONFIG);

module.exports = [
    {
        name: 'development',
        type: 'mysql',
        host: DB_CONFIG.host || 'localhost',
        port: Number(DB_CONFIG.port) || 3307,
        username: DB_CONFIG.username || 'pokemon',
        password: DB_CONFIG.password || 'pokemon',
        database: DB_CONFIG.database || 'pokemon',
        synchronize: false,
        logging: true,
        entities: ['./src/01-enterprise/entity/**/*.entity.ts'],
        migrations: ['./src/04-framework/db/migrations/**/*.ts'],
        cli: {
            entitiesDir: 'src/01-enterprise/entity',
            migrationsDir: 'src/04-framework/db/migrations'
        }
    },
    {
        name: 'test',
        type: 'mysql',
        host: DB_CONFIG.host || 'localhost',
        port: Number(DB_CONFIG.port) || 3307,
        username: DB_CONFIG.username || 'pokemon',
        password: DB_CONFIG.password || 'pokemon',
        database: DB_CONFIG.database || 'pokemon',
        synchronize: true,
        logging: false,
        dialectOptions: {
            options: { requestTimeout: 300000 }
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
        entities: ['./src/01-enterprise/entity/**/*.entity.ts'],
        migrations: ['./src/04-framework/db/migrations/**/*.ts'],
        cli: {
            entitiesDir: 'src/01-enterprise/entity',
            migrationsDir: 'src/04-framework/db/migrations'
        }
    }
];
