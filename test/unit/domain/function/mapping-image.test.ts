import { toBase64 } from '@/01-enterprise/function/mapping-image.function';

describe('Unit test for mappingImage', () => {
    test('正常: 存在しないパスを指定した際正しく throw されるか', async () => {
        await expect(toBase64('/xxxxx')).rejects.toThrow(
            new Error('File not exist : ./pokemon-img/xxxxx')
        );
    });
});
