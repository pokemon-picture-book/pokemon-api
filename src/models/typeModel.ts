import { getConnection } from 'typeorm';
import Type from '@/domain/entity/Type.entity';

const bulkSave = async (types: Type[]): Promise<Type[]> => {
    return Type.save(types).catch(err => {
        throw new Error(`Error in type bulkSave: ${err}`);
    });
};

const findAll = async (): Promise<Type[]> => {
    return getConnection()
        .getRepository(Type)
        .find();
};

export default {
    bulkSave,
    findAll
};
