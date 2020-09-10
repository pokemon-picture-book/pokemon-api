import { GameVersionGroupResponse } from '@/@types/response-model';
import GameVersionGroupEntity from '@/domain/entity/GameVersionGroup.entity';
import IGameVersionGroupPresenter from '@/domain/presenter/IGameVersionGroup.presenter';
import { injectable } from 'inversify';

@injectable()
export default class GameVersionGroupPresenter
    implements IGameVersionGroupPresenter {
    public toGameVersionGroupResponse(
        gameVersionGroups: GameVersionGroupEntity[]
    ): GameVersionGroupResponse[] {
        return gameVersionGroups.map(
            (g): GameVersionGroupResponse => {
                return {
                    id: g.id,
                    alias: g.alias,
                    name: g.gameVersions
                        .map(gameVersion => {
                            const [
                                gameVersionName
                            ] = gameVersion.gameVersionNames;
                            return gameVersionName.name;
                        })
                        .join('/')
                };
            }
        );
    }
}
