import { injectable } from 'inversify';
import IGameVersionGroupPresenter from '@/domain/presenter/IGameVersionGroup.presenter';
import GameVersionGroupEntity from '@/domain/entity/GameVersionGroup.entity';
import { GameVersionGroupResponse } from 'app-response-model';

@injectable()
export default class GameVersionGroupMockPresenter
    implements IGameVersionGroupPresenter {
    public toGameVersionGroupResponse(
        gameVersionGroups: GameVersionGroupEntity[]
    ): GameVersionGroupResponse[] {
        return gameVersionGroups.map(
            (): GameVersionGroupResponse => {
                return {
                    id: 1,
                    alias: 'alias',
                    name: 'name',
                };
            }
        );
    }
}
