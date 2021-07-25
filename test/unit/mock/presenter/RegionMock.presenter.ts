import RegionEntity from '@/domain/entity/Region.entity';
import IRegionPresenter from '@/domain/presenter/IRegion.presenter';
import { RegionResponse } from 'app-response-model';
import { injectable } from 'inversify';

@injectable()
export default class RegionMockPresenter implements IRegionPresenter {
    public toRegionResponse(Regions: RegionEntity[]): RegionResponse[] {
        return Regions.map(
            (): RegionResponse => {
                return {
                    id: 1,
                    name: 'name',
                    displayName: '',
                    relatedGameVersionGroups: [
                        {
                            id: 1,
                            alias: 'gameVersionGroupAlias',
                        },
                    ],
                };
            }
        );
    }
}
