import data from '../data/stations.json';
import { Catalogue } from './../models/catalogue.model';
import { MeteoStationProp } from '../enums/meteo-station-props.enum';
import { MeteoStation } from '../models/meteo/meteo-station.model';

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

export const getMeteoStationById = (id: string): MeteoStation => {
    const results: any[] = data.elements;
    const selectedResult = results.find(station => station[MeteoStationProp.CODE] === id);
    return mapToMeteoStation(selectedResult);
}

const mapToMeteoStation = (data: any): MeteoStation => {
    return {
        code: data[MeteoStationProp.CODE],
        name: data[MeteoStationProp.NAME],
        town: mapToCatalogues(data, MeteoStationProp.TOWN_CODE, MeteoStationProp.TOWN_NAME),
        land: mapToCatalogues(data, MeteoStationProp.LAND_CODE, MeteoStationProp.LAND_NAME),
        region: mapToCatalogues(data, MeteoStationProp.REGION_CODE, MeteoStationProp.REGION_NAME),
        state: mapToCatalogues(data, MeteoStationProp.STATE_CODE, MeteoStationProp.STATE_NAME),
        latitude: data[MeteoStationProp.LATITUDE],
        longitude: data[MeteoStationProp.LONGITUDE]
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