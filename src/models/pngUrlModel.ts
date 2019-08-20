import { getConnection } from 'typeorm';
import PngUrls from '@/entities/PngUrls';

const bulkSave = async (pngUrls: PngUrls[]): Promise<PngUrls[]> => {
  return getConnection()
    .manager.save(pngUrls)
    .catch(err => {
      throw new Error(`Error in png_urls bulkSave: ${err}`);
    });
};

export default {
  bulkSave
};
