import IGameVersionGroupUsecase from '@/usecase/IGameVersionGroup.usecase';
import { GameVersionGroupResponse } from 'app-response-model';
import { injectable } from 'inversify';

@injectable()
export default class GameVersionGroupMockInteractor
    implements IGameVersionGroupUsecase {
    public async search(
        languageName: string,
        isSupported: boolean
    ): Promise<GameVersionGroupResponse[]> {
        return languageName === 'en' && isSupported
            ? [
                  {
                      id: 1,
                      alias: 'alias',
                      name: 'name',
                      relatedRegions: [{ id: 1, name: 'regionName' }],
                  },
              ]
            : [];
    }
}
