import { Town } from "../models/town.model";
import { mapTownIndicators } from "./indicator.service";
import { TownProperties } from "../components/enums/town-properties.enum";
import { Catalogue } from "../models/catalogue.model";

const townIdTag: string = `TOWN_ID`;
const url: string = `https://api.idescat.cat/emex/v1/dades.json?id=${townIdTag}&i=f271,f258,f328,f329,f318,f320,f321,f221,f222,f223,f60&lang=en`;

export const getTown = (id: string) : Promise<Town> => {
  const townUrl = url.replace(townIdTag, id);

  return fetch(townUrl)
    .then(response => response.json())
    .then(data => {
      let town = mapToTown(data);
      const indicators = mapTownIndicators(data.fitxes.indicadors.i);
      town.indicators = indicators;
      return town;
    });
}

export const mapToTown = (data: any) => {
  return {
    id: data[TownProperties.INE],
    name: data[TownProperties.NAME],
    region: _mapToRegion(data[TownProperties.REGION_GROUP]),
    land: _mapToLand(data[TownProperties.LAND_GROUP]),
    altitude: data[TownProperties.ALTITUDE],
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