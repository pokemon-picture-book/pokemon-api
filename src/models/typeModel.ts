import { getConnection } from 'typeorm';
import Types from '@/domain/entity/Types';

const bulkSave = async (types: Types[]): Promise<Types[]> => {
    return Types.save(types).catch(err => {
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
