/* eslint-disable no-undef */
import driver from '@/driver';
import IGameVersionGroupRepository from '@/domain/repository/IGameVersionGroup.repository';
import GameVersionGroupRepository from '@/infrastructure/repository/GameVersionGroup.repository';
import GameVersionGroupEntity from '@/domain/entity/GameVersionGroup.entity';

describe('Unit test for GameVersionGroupRepository repository', () => {
    const repository: IGameVersionGroupRepository = new GameVersionGroupRepository();

    beforeAll(async () => {
        await driver.connect();
    });

    afterAll(() => {
        driver.close();
    });

    test('正常: alias を指定した場合、正しい結果が取得できているか', async done => {
        const gameVersionGroup = await repository.findByAlias('xy');
        expect(gameVersionGroup).not.toBeNull();
        expect((gameVersionGroup as GameVersionGroupEntity).alias).toBe('xy');
        done();
    });

    test('異常: alias に存在しないデータのパラメータを指定した場合、undefined となるか', async done => {
        const gameVersionGroup = await repository.findByAlias('xxxxx');
        expect(gameVersionGroup).toBeUndefined();
        done();
    });
});
