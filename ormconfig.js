function parseDBConfig(configString) {
   try {
       return JSON.parse(configString);
   } catch {
       return {};
   }
};

const DB_CONFIG = parseDBConfig(process.env.DB_CONFIG);

module.exports = {
   type: 'postgres',
   host: DB_CONFIG.host || 'localhost',
   port: DB_CONFIG.port || 5432,
   username: DB_CONFIG.username || 'pokemon',
   password: DB_CONFIG.password || 'pokemon',
   database: DB_CONFIG.database || 'pokemon',
   synchronize: true,
   logging: false,
   entities: [
      'src/entities/**/*.ts'
   ],
   migrations: [
      'db/migrations/**/*.ts'
   ],
   subscribers: [
      'db/subscribers/**/*.ts'
   ],
   cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'db/migrations',
      subscribersDir: 'db/subscribers'
   }
};