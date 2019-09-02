import {
  Connection,
  BaseEntity,
  createConnection,
  getConnection
} from 'typeorm';

import ormconfig = require('../../ormconfig');
import uuid = require('uuid');

const disconnect = async (): Promise<void> => {
  const connection: Connection = getConnection(process.env.DB_CONNECTION_NAME);

  if (!connection.isConnected) {
    await connection.close();
  }
};

const connect = async (): Promise<void> => {
  const connection: Connection = await createConnection({
    name: process.env.DB_CONNECTION_NAME = uuid(),
    ...ormconfig
  }).catch(err => {
    console.log(err);
    throw new Error(err);
  });
  BaseEntity.useConnection(connection);
};

export default {
  connect,
  disconnect
};
