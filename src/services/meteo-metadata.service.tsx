import { MeteoStationVariableProps } from "../enums/meteo-station-variable-props.enum";
import { MeteoVariableCodes } from "../enums/meteo-variable-codes.enum";
import { MeteoStationVariable } from "../models/meteo/meteo-station-variable.model";
import { getDataByKey, METADATA_STORE_NAME } from "./internal-storage.service";

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

export const getStoredMetadataToDisplay = async (): Promise<MeteoStationVariable[]> => {
    try {
        const storedMetadataToDisplay: MeteoStationVariable[] = [];
        const metadataCodesToDisplay = getMetadataCodesToDisplay();
        for (const metadataCode of metadataCodesToDisplay) {
            const metadata = await getDataByKey(metadataCode, METADATA_STORE_NAME);
            storedMetadataToDisplay.push(metadata);
        }
        return storedMetadataToDisplay;
    } catch(err) {
        console.log('err', err);
        throw err;
    }
}

const mapToMetadataVariable = (data: any) => {
    return {
        code: data[MeteoStationVariableProps.CODE],
        name: data[MeteoStationVariableProps.NAME],
        unit: data[MeteoStationVariableProps.UNITY],
        acronym: data[MeteoStationVariableProps.ACRONYM]
    } as MeteoStationVariable
}

const getMetadataCodesToDisplay = (): MeteoVariableCodes[] => {
    return [
        MeteoVariableCodes.TEMPERATURE,
        MeteoVariableCodes.RAIN,
        MeteoVariableCodes.MAX_TEMPERATURE,
        MeteoVariableCodes.MIN_TEMPERATURE,
        MeteoVariableCodes.SNOW_LEVEL,
        MeteoVariableCodes.RELATIVE_HUMIDITY,
        MeteoVariableCodes.WIND_VELOCITY
    ]
}