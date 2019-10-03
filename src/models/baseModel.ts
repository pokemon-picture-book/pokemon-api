import { getConnection } from 'typeorm';
import Bases from '@/entities/Specs';

const bulkSave = async (bases: Bases[]): Promise<Bases[]> => {
  return Bases.save(bases).catch(err => {
    throw new Error(`Error in bases bulkSave: ${err}`);
  });
};

export default {
  bulkSave
};
