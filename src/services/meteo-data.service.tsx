import { MeteoStationDataProps } from "../enums/meteo-station-data-props.enum";
import { MeteoStationData } from "../models/meteo/meteo-station-data.model";
import { getStoredMetadataToDisplay } from "./meteo-metadata.service";
import { MeteoStationVariable } from "../models/meteo/meteo-station-variable.model";

const URL = 'https://analisi.transparenciacatalunya.cat/resource/nzvn-apee.json';
export const getMeteoData = (stationCode: string): Promise<MeteoStationData[]> => {
    return new Promise<MeteoStationData[]>(async (resolve, reject) => {
        const maxDate = await getMaxReadingDate(stationCode) ?? getDefaultDate();
        const metaVariablesToDisplay = await getStoredMetadataToDisplay();

        const url = await getUrl(stationCode, metaVariablesToDisplay, maxDate);
        fetch(url)
            .then(response => response.json())
            .then(results => {
                const parsedData = parseMeteoStationDataResults(results, metaVariablesToDisplay);
                resolve(parsedData);
            })
            .catch((err) => {
                console.error('err', err);
                reject(err);
            })
    });
}

const getMaxReadingDate = (stationCode: string): Promise<string | null> => {
    return new Promise<string | null>((resolve, reject) => {
        const url = `${URL}?$select=MAX(data_lectura) as max_date&$where=codi_estacio='${stationCode}'`;
        fetch(url)
            .then(response => response.json())
            .then(result => {
                result?.length 
                    ? resolve(result[0].max_date) 
                    : resolve(null);
            })
            .catch((err) => {
                console.error('err', err);
                reject(err);
            });
    }); 
}

const getDefaultDate = (): string => {
    let date = new Date();
    date.setUTCHours(0,0,0,0);
    return date.toISOString().replace('Z', '');
}

const getUrl = async (stationCode: string, metadataToDisplay: any[], maxDate: string): Promise<string> => {
    const metadataCodes = metadataToDisplay.map(metadata => `'${metadata.code}'`).join(',');
    const url = `${URL}?$query=${getURLQuery(stationCode, metadataCodes, maxDate)}`;
    console.log('url', url);
    return url;
}

const getURLQuery = (stationCode: string, metadataCodes: string, maxDate: string): string => {
    return `SELECT * 
            WHERE codi_variable IN (${metadataCodes}) 
            AND codi_estacio = '${stationCode}' 
            AND data_lectura = '${maxDate}'`;
}

const parseMeteoStationDataResults = (results: any[], meteoVariablesToDisplay: MeteoStationVariable[]) => {
    const meteoStationData: MeteoStationData[] = [];
    results.forEach((data: any) => {
        const code = data[MeteoStationDataProps.VARIABLE_CODE];
        const variableToDisplay = meteoVariablesToDisplay.find(metadata => metadata.code === code);
        meteoStationData.push(mapToMeteoStationData(data, variableToDisplay?.unit!, variableToDisplay?.name!));
    });
    return meteoStationData;
}

const mapToMeteoStationData = (data: any, unit: string, label: string) => {
    return {
        id: data[MeteoStationDataProps.ID],
        station_code: data[MeteoStationDataProps.STATION_CODE],
        variable_code: data[MeteoStationDataProps.VARIABLE_CODE],
        lecture_data: data[MeteoStationDataProps.LECTURE_DATA],
        extreme_data: data[MeteoStationDataProps.EXTREME_DATA],
        value: data[MeteoStationDataProps.VALUE],
        base_code: data[MeteoStationDataProps.BASE_CODE],
        unit,
        label
    } as MeteoStationData;
}