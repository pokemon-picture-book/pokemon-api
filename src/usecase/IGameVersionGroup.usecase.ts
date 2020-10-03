import { GameVersionGroupResponse } from '@/@types/response-model';

export default interface IGameVersionGroupUsecase {
    search(
        languageName: string,
        isSupported: boolean
    ): Promise<GameVersionGroupResponse[]>;
}
