import { TownIndicators } from './town-indicators.model';

export interface Town {
  id: string;
  name: string;
  region: string;
  community: string;
  indicators: TownIndicators
}