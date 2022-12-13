import { MeteoStationDataProps } from "../enums/meteo-station-data-props.enum";
import { MeteoStationData } from "../models/meteo/meteo-station-data.model";

const URL = 'https://analisi.transparenciacatalunya.cat/resource/nzvn-apee.json';
export const getMeteoData = (): Promise<MeteoStationData[]> => {
    return new Promise<MeteoStationData[]>((resolve, reject) => {
        fetch(URL)
            .then(response => response.json())
            .then(results => {
                const metaStationData: MeteoStationData[] = [];
                results.forEach((data: any) => {
                    metaStationData.push(mapToMeteoStationData(data));
                });
                resolve(metaStationData);
            })
            .catch((err) => {
                console.error('err', err);
                reject(err);
            })
    });
}

const mapToMeteoStationData = (data: any) => {
    return {
        id: data[MeteoStationDataProps.ID],
        station_code: data[MeteoStationDataProps.STATE_CODE],
        variable_code: data[MeteoStationDataProps.VARIABLE_CODE],
        lecture_data: data[MeteoStationDataProps.LECTURE_DATA],
        extreme_data: data[MeteoStationDataProps.EXTREME_DATA],
        value: data[MeteoStationDataProps.VALUE],
        state_code: data[MeteoStationDataProps.STATE_CODE],
        base_code: data[MeteoStationDataProps.BASE_CODE]
    } as MeteoStationData;
}