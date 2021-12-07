import IGameVersionGroupPresenter from '@/02-application/presenter/IGameVersionGroup.presenter';
import IGameVersionGroupRepository from '@/02-application/repository/IGameVersionGroup.repository';
import driver from '@/04-framework/db/driver';
import GameVersionGroupRepository from '@/03-interface/infrastructure/repository/GameVersionGroup.repository';
import GameVersionGroupPresenter from '@/03-interface/presenter/GameVersionGroup.presenter';

describe('Unit test for GameVersionGroup presenter', () => {
    const presenter: IGameVersionGroupPresenter = new GameVersionGroupPresenter();

    const repository: IGameVersionGroupRepository = new GameVersionGroupRepository();

    beforeAll(async () => {
        await driver.connect();
    });

    afterAll(() => {
        driver.close();
    });

    test('正常: 正しくマッピングできているか', async (done) => {
        const gameVersionGroups = await repository.findAllByIsSupported(
            1,
            true
        );

        const [gameVersionGroupResponse] = presenter.toGameVersionGroupResponse(
            gameVersionGroups
        );
        const [actual] = gameVersionGroups;

        expect(gameVersionGroupResponse.id).toBe(actual.id);
        expect(gameVersionGroupResponse.alias).toBe(actual.alias);
        expect(gameVersionGroupResponse.name).toBe('赤/緑/ピカチュウ');

        done();
    });

    test('正常: 正しくマッピングできているか', async (done) => {
        const responses = presenter.toGameVersionGroupResponse([]);
        expect(responses.length).toBe(0);
        done();
    });
});
