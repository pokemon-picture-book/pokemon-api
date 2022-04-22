import { injectable } from 'inversify';
import IGameVersionGroupPresenter from '@/02-application/presenter/IGameVersionGroup.presenter';
import GameVersionGroupEntity from '@/01-enterprise/entity/GameVersionGroup.entity';
import { GameVersionGroupResponse } from 'app-response-model';

@injectable()
export default class GameVersionGroupMockPresenter
    implements IGameVersionGroupPresenter {
    public toGameVersionGroupResponse(
        gameVersionGroups: GameVersionGroupEntity[]
    ): GameVersionGroupResponse[] {
        return gameVersionGroups.map(
            (): GameVersionGroupResponse => ({
                id: 1,
                alias: 'alias',
                name: 'name',
                relatedRegions: [
                    {
                        id: 1,
                        name: 'regionName'
                    }
                ]
            })
        );
    }
}
