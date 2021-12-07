import RegionEntity from '@/01-enterprise/entity/Region.entity';
import { RegionResponse } from 'app-response-model';

export default interface IRegionPresenter {
    toRegionResponse(Regions: RegionEntity[]): RegionResponse[];
}
