import driver from '@/04-framework/db/driver';
import IGameVersionGroupRepository from '@/02-application/repository/IGameVersionGroup.repository';
import GameVersionGroupRepository from '@/03-interface/infrastructure/repository/GameVersionGroup.repository';
import GameVersionGroupEntity from '@/01-enterprise/entity/GameVersionGroup.entity';

describe('Unit test for GameVersionGroup repository', () => {
    const repository: IGameVersionGroupRepository = new GameVersionGroupRepository();

    beforeAll(async () => {
        await driver.connect();
    });

    afterAll(() => {
        driver.close();
    });

    test('正常: alias を指定した場合、正しい結果が取得できているか', async (done) => {
        const gameVersionGroup = await repository.findByAlias('xy');
        expect(gameVersionGroup).not.toBeNull();
        expect((gameVersionGroup as GameVersionGroupEntity).alias).toBe('xy');
        done();
    });

    test('異常: alias に存在しないデータのパラメータを指定した場合、undefined となるか', async (done) => {
        const gameVersionGroup = await repository.findByAlias('xxxxx');
        expect(gameVersionGroup).toBeUndefined();
        done();
    });

    test('正常: languageId を指定した場合、正しい結果が取得できているか', async (done) => {
        const gameVersionGroups: GameVersionGroupEntity[] = await repository.findAllByIsSupported(
            1,
            true
        );
        const [first] = gameVersionGroups;
        expect(first.gameVersions.length).toBe(3);
        const actualGameVersionNames = ['赤', '緑', 'ピカチュウ'];
        first.gameVersions.forEach((gameVersion) => {
            const [gameVersionName] = gameVersion.gameVersionNames;
            expect(
                actualGameVersionNames.includes(gameVersionName.name)
            ).toBeTruthy();
        });
        expect(first.alias).toBe('rgby');
        done();
    });

    test('正常: isSupported を false に指定した場合、正しい結果が取得できているか', async (done) => {
        const gameVersionGroups: GameVersionGroupEntity[] = await repository.findAllByIsSupported(
            1,
            false
        );
        const [first] = gameVersionGroups;
        expect(first.alias).toBe('c');
        expect(first.gameVersions.length).toBe(1);
        expect(first.gameVersions[0].gameVersionNames[0].name).toBe(
            'コロシアム'
        );
        done();
    });

    test('異常: languageId に存在しないデータのパラメータを指定した場合、空配列となるか', async (done) => {
        const gameVersionGroups: GameVersionGroupEntity[] = await repository.findAllByIsSupported(
            12345,
            true
        );
        expect(gameVersionGroups.length).toBe(0);
        done();
    });
});
