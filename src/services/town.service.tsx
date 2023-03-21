import { Town } from "../models/town.model";
import { mapTownIndicators } from "./indicator.service";
import { TownProp } from "../enums/town-props.enum";
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
    id: data[TownProp.INE],
    name: data[TownProp.NAME],
    region: _mapToRegion(data[TownProp.REGION_GROUP]),
    land: _mapToLand(data[TownProp.LAND_GROUP]),
    altitude: data[TownProp.ALTITUDE],
    coordinates: data[TownProp.COORDINATES],
    logo: data[TownProp.LOGO],
    flag: data[TownProp.FLAG],
    population: data[TownProp.POPULATION],
    area: data[TownProp.AREA]
  } as Town;
}

const _mapToRegion = (data: any): Catalogue => {
  return {
    code: data[TownProp.REGION_CODE],
    name: data[TownProp.REGION_NAME]
  } as Catalogue;
}

const _mapToLand = (data: any): Catalogue => {
  return {
    code: data[TownProp.LAND_CODE],
    name: data[TownProp.LAND_NAME]
  } as Catalogue;
}