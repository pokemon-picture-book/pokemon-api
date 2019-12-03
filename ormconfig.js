function parseDBConfig(configString) {
    try {
        return JSON.parse(configString);
    } catch {
        return {};
    }
}

const DB_CONFIG = parseDBConfig(process.env.DB_CONFIG);

module.exports = [
    {
        name: 'development',
        type: 'postgres',
        host: DB_CONFIG.host || 'localhost',
        port: DB_CONFIG.port || 5432,
        username: DB_CONFIG.username || 'pokemon',
        password: DB_CONFIG.password || 'pokemon',
        database: DB_CONFIG.database || 'pokemon',
        synchronize: true,
        logging: false,
        entities: ['src/domain/entities/**/*.ts', 'domain/entities/**/*.ts'],
        migrations: ['db/migrations/**/*.ts', '../db/migrations/**/*.ts'],
        cli: {
            entitiesDir: 'src/domain/entities',
            migrationsDir: 'db/migrations'
        }
    },
    {
        // TODO: production 環境が出来上がり次第、ここの設定も変更予定
        name: 'production',
        type: 'postgres',
        host: DB_CONFIG.host || 'localhost',
        port: DB_CONFIG.port || 5432,
        username: DB_CONFIG.username || 'pokemon',
        password: DB_CONFIG.password || 'pokemon',
        database: DB_CONFIG.database || 'pokemon',
        synchronize: true,
        logging: false,
        entities: ['dist/domain/entities/**/*.js'],
        migrations: ['db/migrations/**/*.ts', '../db/migrations/**/*.ts'],
        cli: {
            entitiesDir: 'dist/domain/entities',
            migrationsDir: 'db/migrations'
        }
    }
];
