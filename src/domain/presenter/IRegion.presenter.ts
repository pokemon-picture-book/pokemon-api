import RegionEntity from '@/domain/entity/Region.entity';
import { RegionResponse } from 'app-response-model';

export default interface IRegionPresenter {
    toRegionResponse(Regions: RegionEntity[]): RegionResponse[];
}
