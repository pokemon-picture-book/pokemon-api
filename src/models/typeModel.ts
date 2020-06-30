import { getConnection } from 'typeorm';
import TypeEntity from '@/domain/entity/Type.entity';

const bulkSave = async (types: TypeEntity[]): Promise<TypeEntity[]> => {
    return TypeEntity.save(types).catch(err => {
        throw new Error(`Error in type bulkSave: ${err}`);
    });
};

const findAll = async (): Promise<TypeEntity[]> => {
    return getConnection()
        .getRepository(TypeEntity)
        .find();
};

export default {
    bulkSave,
    findAll
};
