import { Town } from "../models/town.model";
import { TownIndicators } from '../models/town-indicators.model';
import { GeographicIndicator } from '../models/geographic-indicator.model';
import { PopulationIndicator } from "../models/population-indicator.model";
import { EconomicIndicator } from "../models/economic-indicator.model";
import { Indicator } from "../components/enums/indicators.enum";
import { UnitValue } from '../models/unit-value.model';
import { SchemaData } from "../components/enums/schema-data.enum";

const townIdTag: string = `TOWN_ID`;
const url: string = `https://api.idescat.cat/emex/v1/dades.json?id=${townIdTag}&i=f271,f258,f328,f329,f318,f320,f321,f221,f222,f223,f60&lang=en`;

export const getTown = (id: string) : Promise<Town> => {
  const townUrl = url.replace(townIdTag, id);

  return fetch(townUrl)
    .then(response => response.json())
    .then(data => {
      let town = _mapTownGeneralInformation(data.fitxes.cols.col);
      const indicators = _mapTownIndicators(data.fitxes.indicadors.i);
      town.indicators = indicators;
      return town;
    });
}

const _mapTownGeneralInformation = (data: any) : Town => {
  return {
    id: _mapTownId(data),
    name: _mapTownName(data),
    region: _mapTownRegion(data),
    land: _mapTownCommunity(data)
  } as Town;
}

const _mapTownId = (data: any) : string => {
  return data.find((column: any) => column.scheme === SchemaData.TOWN_SCHEMA).id;
}

const _mapTownName = (data: any) : string => {
  return data.find((column: any) => column.scheme === SchemaData.TOWN_SCHEMA).content;
}

const _mapTownRegion = (data: any) : string => {
  return data.find((column: any) => column.scheme === SchemaData.REGION_SCHEMA).content;
}

const _mapTownCommunity = (data: any) : string => {
  return data.find((column: any) => column.scheme === SchemaData.COMMUNITY_SCHEMA).content;
}

const _mapTownIndicators = (data: any) : TownIndicators => {
  return {
    geographic: _mapToGeographicIndicator(data),
    population: _mapToPopulationIndicator(data),
    economical: _mapToEconomicIndicator(data)
  } as TownIndicators;
}

const _mapToGeographicIndicator = (data: any) : GeographicIndicator => {
  return {
    area: _mapToIndicator(data, Indicator.SURFACE_AREA),
    altitude: _mapToIndicator(data, Indicator.ALTITUDE),
    longitude: _mapToIndicator(data, Indicator.LONGITUDE),
    latitude: _mapToIndicator(data, Indicator.LATITUDE)
  } as GeographicIndicator;
}

const _mapToPopulationIndicator = (data: any) : PopulationIndicator => {
  return {
    men: _mapToIndicator(data, Indicator.MEN),
    women: _mapToIndicator(data, Indicator.WOMEN),
    total: _mapToIndicator(data, Indicator.TOTAL_POPULATION)
  } as PopulationIndicator;
}

const _mapToEconomicIndicator = (data: any) : EconomicIndicator => {
  return {
    employed: _mapToIndicator(data, Indicator.EMPLOYED_POPULATION),
    unemployed: _mapToIndicator(data, Indicator.UNEMPLOYED_POPULATION),
    active: _mapToIndicator(data, Indicator.ACTIVE_POPULATION),
    inactive: _mapToIndicator(data, Indicator.INACTIVE_POPULATION)
  } as EconomicIndicator;
}

const _mapToIndicator = (data: any, indicatorId: Indicator): UnitValue => {
  return {
    unit: _getIndicatorUnitById(data, indicatorId), 
    value: _getIndicatorValueById(data, indicatorId),
    review: _getIndicatorReviewById(data, indicatorId) 
  } as UnitValue;
}

const _getIndicatorById = (data: any, indicatorId: Indicator) => {
  return data.find((indicator: any) => indicator.id === indicatorId);
}

const _getIndicatorValueById = (data: any, indicatorId: Indicator): number => {
  const indicator = _getIndicatorById(data, indicatorId);
  if (indicator?.v) {
    const value = indicator.v;
    return +(value.split(',')[0]);
  }
  return 0;
}

const _getIndicatorUnitById = (data: any, indicatorId: Indicator): string => {
  const indicator = _getIndicatorById(data, indicatorId);
  return indicator?.u;
}

const _getIndicatorReviewById = (data: any, indicatorId: Indicator): number => {
  const indicator = _getIndicatorById(data, indicatorId);
  return +indicator?.r;
}