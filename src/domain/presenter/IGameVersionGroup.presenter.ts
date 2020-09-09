import GameVersionGroupEntity from '@/domain/entity/GameVersionGroup.entity';
import { GameVersionGroupResponse } from '@/@types/response-model';

export default interface IGameVersionGroupPresenter {
    toGameVersionGroupResponse(
        gameVersionGroups: GameVersionGroupEntity[]
    ): GameVersionGroupResponse[];
}
