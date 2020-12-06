import { GameVersionGroupResponse } from '@/@types/response-model';
import IGameVersionGroupUsecase from '@/usecase/IGameVersionGroup.usecase';
import { injectable } from 'inversify';

@injectable()
export default class GameVersionGroupMockInteractor
    implements IGameVersionGroupUsecase {
    public async search(
        languageName: string,
        isSupported: boolean
    ): Promise<GameVersionGroupResponse[]> {
        return !!languageName && !!isSupported
            ? [
                  {
                      id: 1,
                      alias: 'alias',
                      name: 'name'
                  }
              ]
            : [];
    }
}