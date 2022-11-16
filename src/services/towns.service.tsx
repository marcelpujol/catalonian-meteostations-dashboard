import { Town } from '../models/town.model';

import data from '../data/data.json';
import { TownProperties } from '../components/enums/town-properties.enum';
import { Catalogue } from '../models/catalogue.model';

export const getTowns = (currentPage: number = 0, pageSize: number = 10) => {
  const result: any = data;
  const firstIndex = currentPage * pageSize;
  const secondIndex = firstIndex + pageSize;

  const dataSubset = result.elements.slice(firstIndex, secondIndex);
  console.log('dataSubset', dataSubset);
  const towns: Town[] = [];
  for (const data of dataSubset) {
    towns.push(_mapToTown(data));
  }
}

const _mapToTown = (data: any) => {
  return {
    id: data[TownProperties.INE],
    name: data[TownProperties.NAME],
    region: _mapToRegion(data[TownProperties.REGION_GROUP]),
    land: _mapToLand(data[TownProperties.LAND_GROUP]),
    coordinates: data[TownProperties.COORDINATES],
    logo: data[TownProperties.LOGO],
    flag: data[TownProperties.FLAG],
    population: data[TownProperties.POPULATION],
    area: data[TownProperties.AREA]
  } as Town;
}

const _mapToRegion = (data: any): Catalogue => {
  return {
    code: data[TownProperties.REGION_CODE],
    name: data[TownProperties.REGION_NAME]
  } as Catalogue;
}

const _mapToLand = (data: any): Catalogue => {
  return {
    code: data[TownProperties.LAND_CODE],
    name: data[TownProperties.LAND_NAME]
  } as Catalogue;
}