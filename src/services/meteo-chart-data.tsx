import { MeteoVariableCode } from "../enums/meteo-variable-codes.enum";
import { MeteoStationData } from "../models/meteo/meteo-station-data.model";

const URL = 'https://analisi.transparenciacatalunya.cat/resource/nzvn-apee.json';
export function getMeteoChartData(variableCode: string, stationCode: string) {
    return new Promise<MeteoStationData[]>(async (resolve, reject) => {
        const url = await getUrl(variableCode, stationCode);
        fetch(url)
            .then(response => response.json())
            .then(results => {
                console.log('results', results);
                const chartData = mapToChartData(results);
                resolve(chartData);
            })
            .catch((err) => {
                console.error('err', err);
                reject(err);
            });
    })
}

export function getMeteoChartTitleByVariableCode(code: string) {
    switch (code) {
        case MeteoVariableCode.TEMPERATURE:
            return 'Temperature (Cº)';
        case MeteoVariableCode.RELATIVE_HUMIDITY:
            return 'Relative Humidity (%)';
        case MeteoVariableCode.RAIN:
            return 'Rain (mm)';
    }
}

function getUrl(variableCode: string, stationCode: string): string {
    return `${URL}?$query=${getQueryUrl(variableCode, stationCode)}`;
}

function getQueryUrl(variableCode: string, stationCode: string): string {
    return `SELECT *
            WHERE codi_variable = '${variableCode}'
            AND codi_estacio = '${stationCode}'
            AND data_lectura >= '${getCurrentISODate()}'`;
}

function getCurrentISODate(): string {
    const t = new Date();
    const date = ('0' + t.getDate()).slice(-2);
    const month = ('0' + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear();
    return `${year}-${month}-${date}`;
}

function parseTimeValue(date: string): string {
    const time = date.split('T')[1];
    return time.split('.')[0].substring(0,5);
}

function mapToChartData(data: any[]) {
    const chartData = data.reduce((chartData, d) => {
        chartData['labels'].push(parseTimeValue(d.data_lectura));
        chartData['data'].push(d.valor_lectura);
        return chartData;
    },{ labels: [], data: [] });
    return chartData;
}