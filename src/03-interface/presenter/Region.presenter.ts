import RegionEntity from '@/01-enterprise/entity/Region.entity';
import IRegionPresenter from '@/02-application/presenter/IRegion.presenter';
import { RegionResponse } from 'app-response-model';
import { injectable } from 'inversify';

@injectable()
export default class RegionPresenter implements IRegionPresenter {
    public toRegionResponse(regions: RegionEntity[]): RegionResponse[] {
        return regions.map<RegionResponse>((region) => {
            const { id, name, regionNames, gameVersionGroupRegions } = region;
            if (regionNames.length !== 1) {
                throw new Error();
            }
            const [regionName] = regionNames;
            return {
                id,
                name,
                displayName: regionName.name,
                relatedGameVersionGroups: gameVersionGroupRegions.map(
                    ({ gameVersionGroup }) => ({
                            id: gameVersionGroup.id,
                            alias: gameVersionGroup.alias,
                        })
                ),
            };
        });
    }
}
