import { getConnection } from 'typeorm';
import Bases from '@/entities/Bases';

const bulkSave = async (bases: Bases[]): Promise<Bases[]> => {
  return getConnection()
    .manager.save(bases)
    .catch(err => {
      throw new Error(`Error in bases bulkSave: ${err}`);
    });
};

export default {
  bulkSave
};
