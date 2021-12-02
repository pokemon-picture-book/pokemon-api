import driver from '@/04-framework/db/driver';
import { getDefaultSet } from '@/01-enterprise/function/game-region.function';
import GameVersionGroupEntity from '@/01-enterprise/entity/GameVersionGroup.entity';
import RegionEntity from '@/01-enterprise/entity/Region.entity';
import GameVersionGroupRepository from '@/03-interface/infrastructure/repository/GameVersionGroup.repository';
import IGameVersionGroupRepository from '@/02-application/repository/IGameVersionGroup.repository';
import RegionRepository from '@/03-interface/infrastructure/repository/Region.repository';
import IRegionRepository from '@/02-application/repository/IRegion.repository';

describe('Unit test for game-region function', () => {
    const gameVersionGroupRepository: IGameVersionGroupRepository = new GameVersionGroupRepository();
    const regionRepository: IRegionRepository = new RegionRepository();

    let allGames: GameVersionGroupEntity[];
    let allRegions: RegionEntity[];

    beforeAll(async () => {
        await driver.connect();

        // TODO: ほんとはDBアクセスなしでデータ生成を行う方が良い
        [allGames, allRegions] = await Promise.all([
            gameVersionGroupRepository.findAllByIsSupported(1, true),
            regionRepository.findByLanguageId(1),
        ]);
    });

    afterAll(() => {
        driver.close();
    });

    test('正常: game 無しで regions 無しの場合', (done) => {
        const allParam = {
            allGames: [...allGames],
            allRegions: [...allRegions],
        };
        const param = {
            game: '',
            regions: [],
        };

        const defaultSet = getDefaultSet(param, allParam);
        expect(defaultSet.game).toBe('rgby');
        expect(defaultSet.regions).toEqual(['kanto']);
        done();
    });

    test('正常: game 有りで regions 無しの場合、game に紐づく regions が取得できているか', (done) => {
        const allParam = {
            allGames: [...allGames],
            allRegions: [...allRegions],
        };
        const param = {
            game: 'gsc',
            regions: [],
        };

        const defaultSet = getDefaultSet(param, allParam);
        expect(defaultSet.game).toBe('gsc');
        expect(defaultSet.regions).toEqual(['johto']);
        done();
    });

    test('正常: game 有りで regions 無しの場合、game に存在しないパラメータが含まれている場合に初期のデータが返されるか', (done) => {
        const allParam = {
            allGames: [...allGames],
            allRegions: [...allRegions],
        };
        const param = {
            game: 'xxxx',
            regions: [],
        };

        const defaultSet = getDefaultSet(param, allParam);
        expect(defaultSet.game).toBe('rgby');
        expect(defaultSet.regions).toEqual(['kanto']);
        done();
    });

    test('正常: game 無しで regions 有りの場合、regions に紐づく game が取得できているか', (done) => {
        const allParam = {
            allGames: [...allGames],
            allRegions: [...allRegions],
        };

        const defaultSet1 = getDefaultSet(
            {
                game: '',
                regions: ['alola', 'johto'],
            },
            allParam
        );
        expect(defaultSet1.game).toBe('gsc');
        expect(defaultSet1.regions).toEqual(['johto']);
        done();

        const defaultSet2 = getDefaultSet(
            {
                game: '',
                regions: ['unova'],
            },
            allParam
        );
        expect(defaultSet2.game).toBe('bw');
        expect(defaultSet2.regions).toEqual(['unova']);
        done();
    });

    test('正常: game 無しで regions 有りの場合、regions に存在しないパラメータが含まれている場合に初期のデータが返されるか', (done) => {
        const allParam = {
            allGames: [...allGames],
            allRegions: [...allRegions],
        };

        const defaultSet1 = getDefaultSet(
            {
                game: '',
                regions: ['xxxx', 'yyyy'],
            },
            allParam
        );
        expect(defaultSet1.game).toBe('rgby');
        expect(defaultSet1.regions).toEqual(['kanto']);
        done();

        const defaultSet2 = getDefaultSet(
            {
                game: '',
                regions: ['xxxx'],
            },
            allParam
        );
        expect(defaultSet2.game).toBe('rgby');
        expect(defaultSet2.regions).toEqual(['kanto']);
        done();
    });

    test('正常: game/regions 共に有りで、game に存在しないパラメータが含まれている場合に region に紐づくデータが返されるか', (done) => {
        const allParam = {
            allGames: [...allGames],
            allRegions: [...allRegions],
        };
        const param = {
            game: 'xxxx',
            regions: ['johto'],
        };

        const defaultSet = getDefaultSet(param, allParam);
        expect(defaultSet.game).toBe('gsc');
        expect(defaultSet.regions).toEqual(['johto']);
        done();
    });

    test('正常: game/regions 共に有りで、game/regions 共に存在しないパラメータが含まれている場合に初期のデータが返されるか', (done) => {
        const allParam = {
            allGames: [...allGames],
            allRegions: [...allRegions],
        };
        const param = {
            game: 'xxxx',
            regions: ['yyyy'],
        };

        const defaultSet = getDefaultSet(param, allParam);
        expect(defaultSet.game).toBe('rgby');
        expect(defaultSet.regions).toEqual(['kanto']);
        done();
    });

    test('正常: game/regions 共に有りで、regions に存在しないパラメータが含まれている場合に game に紐づくデータが返されるか', (done) => {
        const allParam = {
            allGames: [...allGames],
            allRegions: [...allRegions],
        };
        const param = {
            game: 'rse',
            regions: ['xxxx'],
        };

        const defaultSet = getDefaultSet(param, allParam);
        expect(defaultSet.game).toBe('rse');
        expect(defaultSet.regions).toEqual(['kanto']);
        done();
    });

    test('正常: game 有りで regions 有りの場合', (done) => {
        const allParam = {
            allGames: [...allGames],
            allRegions: [...allRegions],
        };
        const param = {
            game: 'hgss',
            regions: ['kanto'],
        };

        const defaultSet = getDefaultSet(param, allParam);
        expect(defaultSet.game).toBe('hgss');
        expect(defaultSet.regions).toEqual(['kanto']);
        done();
    });
});
