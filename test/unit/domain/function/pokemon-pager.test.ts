import { getPrevAndNextId } from '@/01-enterprise/function/pokemon-pager.function';

describe('Unit test for pokemon-pager function', () => {
    test('正常: 正常に前後のIDが取得できるか', (done) => {
        const test1 = getPrevAndNextId(1, 151);
        expect(test1.prevId).toBe(151);
        expect(test1.nextId).toEqual(2);

        const test2 = getPrevAndNextId(10, 151);
        expect(test2.prevId).toBe(9);
        expect(test2.nextId).toEqual(11);

        const test3 = getPrevAndNextId(151, 151);
        expect(test3.prevId).toBe(150);
        expect(test3.nextId).toEqual(1);
        done();
    });

    test('異常: 異常なパラメータの際に正しく throw されるか', (done) => {
        expect(() => getPrevAndNextId(152, 151)).toThrow(
            'Invalid target pokemon id.'
        );
        done();
    });
});
