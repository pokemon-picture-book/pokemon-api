import GameVersionGroupEntity from '@/domain/entity/GameVersionGroup.entity';
import IGameVersionGroupPresenter from '@/domain/presenter/IGameVersionGroup.presenter';
import { GameVersionGroupResponse } from 'app-response-model';
import { injectable } from 'inversify';

@injectable()
export default class GameVersionGroupPresenter
    implements IGameVersionGroupPresenter {
    public toGameVersionGroupResponse(
        gameVersionGroups: GameVersionGroupEntity[]
    ): GameVersionGroupResponse[] {
        return gameVersionGroups.map(
            ({ id, alias, gameVersions }): GameVersionGroupResponse => {
                return {
                    id,
                    alias,
                    name: gameVersions
                        .map(({ gameVersionNames }) => {
                            const [gameVersionName] = gameVersionNames;
                            return gameVersionName.name;
                        })
                        .join('/'),
                };
            }
        );
    }
}
