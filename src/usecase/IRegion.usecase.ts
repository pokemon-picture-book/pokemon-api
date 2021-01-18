import { RegionResponse } from 'app-response-model';

export default interface IRegionUsecase {
    search(languageName: string): Promise<RegionResponse[]>;
}
