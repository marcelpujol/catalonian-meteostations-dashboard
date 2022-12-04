import data from '../data/stations.json';
import { Catalogue } from './../models/catalogue.model';
import { MeteoStationProps } from '../enums/meteo-station-props.enum';
import { MeteoStation } from '../models/meteo-station.model';

const DISABLED_STATUS_CODE: string = "1";

export const getMeteoStations = (): Promise<MeteoStation[]> => {
    return new Promise<MeteoStation[]>((resolve, reject) => {
        try {
            const meteoStations: MeteoStation[] = [];
            const results: any = data.elements;
            for (const result of results) {
                const meteoStation = mapToMeteoStation(result);
                if (meteoStation.state.code !== DISABLED_STATUS_CODE)
                    meteoStations.push(meteoStation);
            }
            meteoStations.sort(sortAlgorithm);
            resolve(meteoStations)
        }
        catch(err) {
            reject(err);
        }
    });
}

const mapToMeteoStation = (data: any): MeteoStation => {
    return {
        code: data[MeteoStationProps.CODE],
        name: data[MeteoStationProps.NAME],
        town: mapToCatalogues(data, MeteoStationProps.TOWN_CODE, MeteoStationProps.TOWN_NAME),
        land: mapToCatalogues(data, MeteoStationProps.LAND_CODE, MeteoStationProps.LAND_NAME),
        region: mapToCatalogues(data, MeteoStationProps.REGION_CODE, MeteoStationProps.REGION_NAME),
        state: mapToCatalogues(data, MeteoStationProps.STATE_CODE, MeteoStationProps.STATE_NAME),
    } as MeteoStation;
}

const mapToCatalogues = (data: any, codeProperty: string, nameProperty: string) => {
    return {
        code: data[codeProperty],
        name: data[nameProperty]
    } as Catalogue;
}

const sortAlgorithm = (a: MeteoStation, b: MeteoStation) => {
    if (a.town.name < b.town.name) return -1;
    else return 1;
}