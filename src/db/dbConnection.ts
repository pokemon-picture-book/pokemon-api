import {
  Connection,
  BaseEntity,
  createConnection,
  getConnection
} from 'typeorm';

import util from '@/utils';

import uuid = require('uuid/v1');

const disconnect = async (): Promise<void> => {
  const connection: Connection = getConnection(process.env.DB_CONNECTION_UUID);

  if (!connection.isConnected) {
    await connection.close();
  }
};

const connect = async (): Promise<void> => {
  const connection: Connection = await createConnection(
    process.env.NODE_ENV === 'development'
      ? {
          name: process.env.DB_CONNECTION_UUID = uuid(),
          ...util('db.development')
        }
      : {
          name: process.env.DB_CONNECTION_UUID = 'default',
          ...util('db.production')
        }
  ).catch(err => {
    throw new Error(err);
  });

  BaseEntity.useConnection(connection);
};

export default {
  connect,
  disconnect
};
