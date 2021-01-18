import RegionEntity from '@/domain/entity/Region.entity';
import IRegionPresenter from '@/domain/presenter/IRegion.presenter';
import { RegionResponse } from 'app-response-model';
import { injectable } from 'inversify';

@injectable()
export default class RegionPresenter implements IRegionPresenter {
    public toRegionResponse(regions: RegionEntity[]): RegionResponse[] {
        return regions.map(
            (region): RegionResponse => {
                const { id, name, regionNames } = region;
                if (regionNames?.length !== 1) {
                    throw new Error();
                }
                const [regionName] = regionNames;
                return {
                    id,
                    name,
                    displayName: regionName.name,
                };
            }
        );
    }
}
