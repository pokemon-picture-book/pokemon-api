import entities from '@/domain/entity';
import {
    BaseEntity,
    ConnectionOptions,
    createConnection,
    getConnection,
} from 'typeorm';

const ormconfig = require('~/ormconfig');

export default {
    connect: async (systemEnv?: string): Promise<void> => {
        const env = systemEnv || process.env.NODE_ENV;
        const envConnectionOptions: ConnectionOptions = ormconfig.find(
            (o: ConnectionOptions) => o.name === env
        );

        if (!envConnectionOptions) {
            throw new Error(
                'Please specify either "development" | "production"'
            );
        }

        const connectionOptions: ConnectionOptions = {
            ...envConnectionOptions,
            entities,
            migrations: [],
        };

        const connection = await createConnection(connectionOptions);
        BaseEntity.useConnection(connection);
    },
    close: (systemEnv?: string) => {
        const env = systemEnv || process.env.NODE_ENV;
        const connection = getConnection(env);
        connection.close();
    },
};
