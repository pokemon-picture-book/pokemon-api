import entities from '@/domain/entity';
import {
    BaseEntity,
    ConnectionOptions,
    createConnection,
    getConnection
} from 'typeorm';

const ormconfig = require('~/ormconfig');

export default {
    connect: async (): Promise<void> => {
        const envConnectionOptions: ConnectionOptions = ormconfig.find(
            (o: ConnectionOptions) => o.name === process.env.NODE_ENV
        );

        if (!envConnectionOptions) {
            throw new Error(
                'Please specify either "development" | "test" | "production"'
            );
        }

        const connectionOptions: ConnectionOptions = {
            ...envConnectionOptions,
            entities,
            migrations: []
        };

        const connection = await createConnection(connectionOptions);
        BaseEntity.useConnection(connection);
    },
    close: () => {
        const connection = getConnection(process.env.NODE_ENV);
        connection.close();
    }
};
