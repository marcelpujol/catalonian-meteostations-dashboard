import { MeteoStationVariableProps } from "../enums/meteo-station-variable-props.enum";
import { MeteoStationVariable } from "../models/meteo/meteo-station-variable.model";

const URL = 'https://analisi.transparenciacatalunya.cat/resource/4fb2-n3yi.json';
export const getMeteoMetadata = (): Promise<MeteoStationVariable[]> => {
    return new Promise<MeteoStationVariable[]>((resolve, reject) => {
        fetch(URL)
            .then(response => response.json())
            .then((results) => {
                const metadata: MeteoStationVariable[] = [];
                results.forEach((data: any) => {
                    metadata.push(mapToMetadataVariable(data));
                });
                resolve(metadata);
            })
            .catch((err) => {
                console.error('err', err);
                reject(err);
            });
    });
}

const mapToMetadataVariable = (data: any) => {
    return {
        code: data[MeteoStationVariableProps.CODE],
        name: data[MeteoStationVariableProps.NAME],
        unity: data[MeteoStationVariableProps.UNITY],
        acronym: data[MeteoStationVariableProps.ACRONYM]
    } as MeteoStationVariable
}