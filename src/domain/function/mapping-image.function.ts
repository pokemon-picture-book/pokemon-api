import * as fs from 'fs';
import * as fileType from 'file-type';

export const POKEMON_IMG_ROOT_PATH = './pokemon-img';

export const toBase64 = async (path: string) => {
    const filePath = `${POKEMON_IMG_ROOT_PATH}${path}`;
    if (!fs.existsSync(filePath)) {
        throw new Error(`File not exist : ${filePath}`);
    }

    const file = fs.readFileSync(filePath);
    const base64 = file.toString('base64');
    const buffer = await fileType.fromBuffer(file);
    return `data:${buffer!.mime};base64,${base64}`;
};

export default {};
