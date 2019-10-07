import { getConnection } from 'typeorm';
import PngUrls from '@/entities/Pngs';

const bulkSave = async (pngUrls: PngUrls[]): Promise<PngUrls[]> => {
    return PngUrls.save(pngUrls).catch(err => {
        throw new Error(`Error in png_urls bulkSave: ${err}`);
    });
};

export default {
    bulkSave
};
