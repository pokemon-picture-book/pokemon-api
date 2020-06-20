import { getConnection } from 'typeorm';
import Bases from '@/domain/entity/Status.entity';

const bulkSave = async (bases: Bases[]): Promise<Bases[]> => {
    return Bases.save(bases).catch(err => {
        throw new Error(`Error in bases bulkSave: ${err}`);
    });
};

export default {
    bulkSave
};
