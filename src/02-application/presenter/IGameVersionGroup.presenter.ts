import GameVersionGroupEntity from '@/01-enterprise/entity/GameVersionGroup.entity';
import { GameVersionGroupResponse } from 'app-response-model';

export default interface IGameVersionGroupPresenter {
    toGameVersionGroupResponse(
        gameVersionGroups: GameVersionGroupEntity[]
    ): GameVersionGroupResponse[];
}
