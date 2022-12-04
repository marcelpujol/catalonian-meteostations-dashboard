import { Town } from "../models/town.model";
import { mapTownIndicators } from "./indicator.service";
import { TownProps } from "../enums/town-props.enum";
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
    id: data[TownProps.INE],
    name: data[TownProps.NAME],
    region: _mapToRegion(data[TownProps.REGION_GROUP]),
    land: _mapToLand(data[TownProps.LAND_GROUP]),
    altitude: data[TownProps.ALTITUDE],
    coordinates: data[TownProps.COORDINATES],
    logo: data[TownProps.LOGO],
    flag: data[TownProps.FLAG],
    population: data[TownProps.POPULATION],
    area: data[TownProps.AREA]
  } as Town;
}

const _mapToRegion = (data: any): Catalogue => {
  return {
    code: data[TownProps.REGION_CODE],
    name: data[TownProps.REGION_NAME]
  } as Catalogue;
}

const _mapToLand = (data: any): Catalogue => {
  return {
    code: data[TownProps.LAND_CODE],
    name: data[TownProps.LAND_NAME]
  } as Catalogue;
}