import { TownIndicators } from './town-indicators.model';
import { Catalogue } from './catalogue.model';

export interface Town {
  id: string;
  name: string;
  region: Catalogue;
  land: Catalogue;
  coordinates: string;
  logo: string;
  flag: string;
  population: number;
  area: number;
  indicators: TownIndicators;

}