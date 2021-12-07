import IRegionUsecase from '@/02-application/usecase/IRegion.usecase';
import { RegionResponse } from 'app-response-model';
import { injectable } from 'inversify';

@injectable()
export default class RegionMockInteractor implements IRegionUsecase {
    public async search(languageName: string): Promise<RegionResponse[]> {
        return languageName === 'en'
            ? [
                  {
                      id: 1,
                      name: 'name',
                      displayName: 'displayName',
                      relatedGameVersionGroups: [
                          {
                              id: 1,
                              alias: 'gameVersionGroupAlias',
                          },
                      ],
                  },
              ]
            : [];
    }
}
