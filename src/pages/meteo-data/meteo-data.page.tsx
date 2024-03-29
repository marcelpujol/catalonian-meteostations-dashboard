import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MeteoVariableCode } from "../../enums/meteo-variable-codes.enum";
import { MeteoStationData } from "../../models/meteo/meteo-station-data.model";
import { getMeteoData } from "../../services/meteo-data.service";
import { LoaderComponent } from "../../components/loader/loader.components";
import { useSelector } from "react-redux";
import { MeteoVariable } from "../../models/meteo/meteo-variable.model";
//icons
import humidtyIcon from "../../assets/humidity-icon.png";
import pressureIcon from "../../assets/pressure-icon.png";
import rainIcon from "../../assets/rain-icon.png";
import snowIcon from "../../assets/snow-icon.png";
import solarIcon from "../../assets/solar-icon.png";
import temperatureIcon from "../../assets/temperature-icon.png";
import windIcon from "../../assets/wind-icon.png";
import windDirection from "../../assets/wind-direction.png";

import { LineChartComponent } from "../../components/line-chart/line-chart";
import { MeteoDataMapComponent } from "./components/meteo-data-map.component";
import { CardDataComponent } from "../../components/card-data/card-data.component";
import { getMeteoStationById } from "../../services/meteo-stations.service";
import { setToolbarChip, updateToolbar } from "../../services/toolbar.service";

import './meteo-data.page.scss'

export const MeteoDataPage = () => {
    const params: any = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [meteoData, setMeteoData] = useState<MeteoStationData[]>([]);
    const selectedMeteoVariables = useSelector<any, MeteoVariable[]>(state => state.meteoVariables.selected);
    
    useEffect(() => {
        const meteoStation = getMeteoStationById(params.id);
        updateToolbar({ title: meteoStation.name, backArrow: true, chipInfo: null! });

        getMeteoData(params.id, selectedMeteoVariables)
            .then((meteoData) => setMeteoData(meteoData))
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));
    }, [params.id]);

    useEffect(() => {
        return () => setToolbarChip(null!);
    }, []);

    const _renderContent = () => {
        return (
            <div className="meteo-data-container">
                { _renderVariablesContainer() }
                <div className="meteo-data-row-container">
                    { _renderMap() }
                    { _renderChart() }
                </div>
            </div>
        );
    }

    const _renderVariablesContainer = () => {
        return (
            <div className="meteo-variables-container">
                { meteoData?.map((meteoData) => _renderVariable(meteoData)) }
            </div>
        );
    }

    const _renderVariable = (meteoStationData: MeteoStationData) => {
        const { max, min } = _getValueLimitsByVariableCode(meteoStationData.variable_code);
        return (
            <CardDataComponent 
                code={meteoStationData.variable_code} 
                icon={_getIconByVariableCode(meteoStationData.variable_code)} 
                label={meteoStationData.label} 
                value={meteoStationData.value}
                max={max}
                min={min}
                unit={meteoStationData.unit}/>
        );
    }

    const _renderChart = () => {
        const defaultValues = _getDefaultChartVariableAndTitle();
        return (
            <div className="meteo-data-slot">
                <LineChartComponent 
                    variableCode={defaultValues.variableCode} 
                    stationCode={params.id} 
                    title={defaultValues.title}/>
            </div>
        );
    }

    const _renderMap = () => {
        const meteoStation = getMeteoStationById(params.id);
        return (
            <div className="meteo-data-slot">
                <MeteoDataMapComponent 
                    latitude={meteoStation.latitude} 
                    longitude={meteoStation.longitude} 
                    town={meteoStation.town.name} 
                    land={meteoStation.land.name} 
                    region={meteoStation.region.name}/>
            </div>
        )
    }

    const _getIconByVariableCode = (code: string): string => {
        switch(code) {
            case MeteoVariableCode.RELATIVE_HUMIDITY:
            case MeteoVariableCode.MAX_RELATIVE_HUMIDITY:
                return humidtyIcon;
            case MeteoVariableCode.ATHMOSPHERIC_PRESSURE:
            case MeteoVariableCode.MAX_ATMOSPHERIC_PRESSURE:
            case MeteoVariableCode.MIN_ATMOSPHERIC_PRESSURE:
                return pressureIcon;
            case MeteoVariableCode.RAIN:
                return rainIcon;
            case MeteoVariableCode.SNOW_LEVEL:
                return snowIcon;
            case MeteoVariableCode.GLOBAL_SOLAR_IRRADIANCE:
                return solarIcon;
            case MeteoVariableCode.TEMPERATURE:
            case MeteoVariableCode.MAX_TEMPERATURE:
            case MeteoVariableCode.MIN_TEMPERATURE:
                return temperatureIcon;
            case MeteoVariableCode.WIND_VELOCITY:
                return windIcon;
            case MeteoVariableCode.WIND_DIRECTION:
                return windDirection;
            default:
                return '';
        }
    }

    const _getValueLimitsByVariableCode = (code: string): { min: number, max: number } => {
        switch(code) {
            case MeteoVariableCode.RELATIVE_HUMIDITY:
            case MeteoVariableCode.MAX_RELATIVE_HUMIDITY:
                return {min: 0, max: 100 };
            case MeteoVariableCode.ATHMOSPHERIC_PRESSURE:
            case MeteoVariableCode.MAX_ATMOSPHERIC_PRESSURE:
            case MeteoVariableCode.MIN_ATMOSPHERIC_PRESSURE:
                return { min: 900, max: 1100 }
            case MeteoVariableCode.RAIN:
                return { min: 0, max: 100 };
            case MeteoVariableCode.SNOW_LEVEL:
                return { min: 0, max: 100 };
            case MeteoVariableCode.GLOBAL_SOLAR_IRRADIANCE:
                return { min: 0, max: 1000 };
            case MeteoVariableCode.TEMPERATURE:
            case MeteoVariableCode.MAX_TEMPERATURE:
            case MeteoVariableCode.MIN_TEMPERATURE:
                return { min: -20, max: 60 };
            case MeteoVariableCode.WIND_VELOCITY:
                return { min: 0, max: 150 };
            case MeteoVariableCode.WIND_DIRECTION:
                return { min: 0, max: 360 };
            default:
                return { min: 0, max: 100 };
        }
    }

    const _getDefaultChartVariableAndTitle = (): { variableCode: string, title: string } => {
        return { variableCode: MeteoVariableCode.TEMPERATURE, title: 'Temperature (ºC)' }
    }

    return (
        <div className="meteo-data-page-container">
            { isLoading ? <LoaderComponent/> : _renderContent()}
        </div>
    );
}