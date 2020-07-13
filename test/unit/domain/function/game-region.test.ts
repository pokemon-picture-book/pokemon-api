/* eslint-disable no-undef */
import { getDefaultSet } from '@/domain/function/game-region.function';

describe('Unit test for game-region function', () => {
    test('正常: game 有りで regions 無しの場合、game に紐づく regions が取得できているか', done => {
        const defaultSet = getDefaultSet('rgby');
        expect(defaultSet.game).toBe('rgby');
        expect(defaultSet.regions).toEqual(['kanto']);
        done();
    });

    test('正常: game 無しで regions 有りの場合、regions に紐づく game が取得できているか', done => {
        const defaultSet1 = getDefaultSet(undefined, ['alola', 'johto']);
        expect(defaultSet1.game).toBe('sm');
        expect(defaultSet1.regions).toEqual(['alola', 'johto']);
        done();

        const defaultSet2 = getDefaultSet(undefined, ['unova']);
        expect(defaultSet2.game).toBe('bw');
        expect(defaultSet2.regions).toEqual(['unova']);
        done();
    });

    test('正常: game 無しで regions 無しの場合', done => {
        const defaultSet = getDefaultSet();
        expect(defaultSet.game).toBe('rgby');
        expect(defaultSet.regions).toEqual(['kanto']);
        done();
    });

    test('正常: game 有りで regions 有りの場合', done => {
        const defaultSet = getDefaultSet('hgss', ['kanto']);
        expect(defaultSet.game).toBe('hgss');
        expect(defaultSet.regions).toEqual(['kanto']);
        done();
    });

    test('異常: game 有り（異常パラメータ）で regions 無しの場合、エラーとならないか', done => {
        const defaultSet = getDefaultSet('xxxxx');
        expect(defaultSet.game).toBe('xxxxx');
        expect(defaultSet.regions).toEqual(['']);
        done();
    });

    test('異常: game 無しで regions 有り（異常パラメータ）の場合、エラーとならないか', done => {
        const defaultSet = getDefaultSet(undefined, ['xxxxx']);
        expect(defaultSet.game).toBe('');
        expect(defaultSet.regions).toEqual(['xxxxx']);
        done();
    });

    test('異常: game 有り（異常パラメータ）で regions 有り（異常パラメータ）の場合、エラーとならないか', done => {
        const defaultSet = getDefaultSet('xxxxx', ['xxxxx']);
        expect(defaultSet.game).toBe('xxxxx');
        expect(defaultSet.regions).toEqual(['xxxxx']);
        done();
    });
});
