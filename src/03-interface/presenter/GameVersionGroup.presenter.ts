import GameVersionGroupEntity from '@/01-enterprise/entity/GameVersionGroup.entity';
import IGameVersionGroupPresenter from '@/02-application/presenter/IGameVersionGroup.presenter';
import { GameVersionGroupResponse } from 'app-response-model';
import { injectable } from 'inversify';

@injectable()
export default class GameVersionGroupPresenter
    implements IGameVersionGroupPresenter {
    public toGameVersionGroupResponse(
        gameVersionGroups: GameVersionGroupEntity[]
    ): GameVersionGroupResponse[] {
        return gameVersionGroups.map<GameVersionGroupResponse>(
            ({ id, alias, gameVersions, gameVersionGroupRegions }) => {
                return {
                    id,
                    alias,
                    name: gameVersions
                        .map(({ gameVersionNames }) => {
                            const [gameVersionName] = gameVersionNames;
                            return gameVersionName.name;
                        })
                        .join('/'),
                    relatedRegions: gameVersionGroupRegions.map(
                        ({ region }) => {
                            return {
                                id: region.id,
                                name: region.name,
                            };
                        }
                    ),
                };
            }
        );
    }
}
