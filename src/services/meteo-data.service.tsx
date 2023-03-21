import { MeteoStationDataProp } from "../enums/meteo-station-data-props.enum";
import { MeteoStationData } from "../models/meteo/meteo-station-data.model";
import { getMetadataToDisplay } from "./meteo-metadata.service";
import { MeteoStationVariable } from "../models/meteo/meteo-station-variable.model";
import { MeteoVariable } from "../models/meteo/meteo-variable.model";
import { parseLastUpdateDate, setToolbarChip } from "./toolbar.service";

const URL = 'https://analisi.transparenciacatalunya.cat/resource/nzvn-apee.json';
export const getMeteoData = (stationCode: string, meteoVariables: MeteoVariable[]): Promise<MeteoStationData[]> => {
    return new Promise<MeteoStationData[]>(async (resolve, reject) => {
        const maxDate = await getMaxReadingDate(stationCode) ?? getDefaultDate();
        const metaVariablesToDisplay = await getMetadataToDisplay(meteoVariables);

        const url = await getUrl(stationCode, metaVariablesToDisplay, maxDate);
        fetch(url)
            .then(response => response.json())
            .then(results => {
                const parsedData = parseMeteoStationDataResults(results, metaVariablesToDisplay);
                const lastUpdatedDate = parseLastUpdateDate(maxDate);
                setToolbarChip(`Updated on ${lastUpdatedDate}`);
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

const getUrl = async (stationCode: string, metadataToDisplay: MeteoStationVariable[], maxDate: string): Promise<string> => {
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
        const code = data[MeteoStationDataProp.VARIABLE_CODE];
        const variableToDisplay = meteoVariablesToDisplay.find(metadata => metadata.code === code);
        meteoStationData.push(mapToMeteoStationData(data, variableToDisplay?.unit!, variableToDisplay?.name!));
    });
    return meteoStationData.sort(sortAlgorithm);
}

const mapToMeteoStationData = (data: any, unit: string, label: string) => {
    return {
        id: data[MeteoStationDataProp.ID],
        station_code: data[MeteoStationDataProp.STATION_CODE],
        variable_code: data[MeteoStationDataProp.VARIABLE_CODE],
        lecture_data: data[MeteoStationDataProp.LECTURE_DATA],
        extreme_data: data[MeteoStationDataProp.EXTREME_DATA],
        value: data[MeteoStationDataProp.VALUE],
        base_code: data[MeteoStationDataProp.BASE_CODE],
        unit,
        label
    } as MeteoStationData;
}

const sortAlgorithm = (a: MeteoStationData, b: MeteoStationData) => {
    if (a.label < b.label) return -1;
    else return 1;
}