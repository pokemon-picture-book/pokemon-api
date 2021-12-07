import { GameVersionGroupResponse } from 'app-response-model';

export default interface IGameVersionGroupUsecase {
    search(
        languageName: string,
        isSupported: boolean
    ): Promise<GameVersionGroupResponse[]>;
}
