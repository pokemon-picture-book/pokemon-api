import { getConnection } from 'typeorm';
import Types from '@/entities/Types';

const bulkSave = async (types: Types[]): Promise<Types[]> => {
  return getConnection()
    .manager.save(types)
    .catch(err => {
      throw new Error(`Error in types bulkSave: ${err}`);
    });
};

const findAll = async (): Promise<Types[]> => {
  return getConnection()
    .getRepository(Types)
    .find();
};

export default {
  bulkSave,
  findAll
};
