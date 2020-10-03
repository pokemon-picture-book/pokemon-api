import IGameVersionGroupPresenter from '@/domain/presenter/IGameVersionGroup.presenter';
import IGameVersionGroupRepository from '@/domain/repository/IGameVersionGroup.repository';
import driver from '@/driver';
import GameVersionGroupRepository from '@/infrastructure/repository/GameVersionGroup.repository';
import GameVersionGroupPresenter from '@/presenter/GameVersionGroup.presenter';

describe('Unit test for GameVersionGroup presenter', () => {
    const presenter: IGameVersionGroupPresenter = new GameVersionGroupPresenter();

    const repository: IGameVersionGroupRepository = new GameVersionGroupRepository();

    beforeAll(async () => {
        await driver.connect();
    });

    afterAll(() => {
        driver.close();
    });

    test('正常: 正しくマッピングできているか', async done => {
        const gameVersionGroups = await repository.findAllByIsSupported(
            1,
            true
        );

        const [gameVersionGroupResponce] = presenter.toGameVersionGroupResponse(
            gameVersionGroups
        );
        const [actual] = gameVersionGroups;

        expect(gameVersionGroupResponce.id).toBe(actual.id);
        expect(gameVersionGroupResponce.alias).toBe(actual.alias);
        expect(gameVersionGroupResponce.name).toBe('赤/緑/ピカチュウ');

        done();
    });

    test('正常: 正しくマッピングできているか', async done => {
        const responses = presenter.toGameVersionGroupResponse([]);
        expect(responses.length).toBe(0);
        done();
    });
});
