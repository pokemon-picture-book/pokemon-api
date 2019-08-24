import { getConnection } from 'typeorm';
import GifUrls from '@/entities/GifUrls';

const bulkSave = async (gifUrls: GifUrls[]): Promise<GifUrls[]> => {
  return GifUrls.save(gifUrls).catch(err => {
    throw new Error(`Error in gif_urls bulkSave: ${err}`);
  });
};

const findAll = async (): Promise<GifUrls[]> => {
  return getConnection()
    .getRepository(GifUrls)
    .find();
};

export default {
  bulkSave,
  findAll
};
