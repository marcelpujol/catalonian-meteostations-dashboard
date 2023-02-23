import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MeteoVariableCodes } from "../../enums/meteo-variable-codes.enum";
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
import { getMeteoStationById } from "../../services/meteo-stations.service";
import { setToolbarChip } from "../../services/toolbar.service";

import './meteo-data.page.scss'
export const MeteoDataPage = () => {
    const params: any = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [meteoData, setMeteoData] = useState<MeteoStationData[]>([]);
    const selectedMeteoVariables = useSelector<any, MeteoVariable[]>(state => state.meteoVariables.selected);
    
    useEffect(() => {
        getMeteoData(params.id, selectedMeteoVariables)
            .then((meteoData) => setMeteoData(meteoData))
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));
    }, [params.id]);

    useEffect(() => {
        return () => setToolbarChip(null);
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
        return (
            <div className="variable-container" key={`variable-${meteoStationData.variable_code}`}>
                <div className="image-column">
                    <img src={ _getIconByVariableCode(meteoStationData.variable_code) }/>
                </div>
                <div className="spacer"></div>
                <div className="variable-info-table">
                    <div className="row header">
                        <div>{ meteoStationData.label }</div>
                    </div>
                    <div className="row">
                        { meteoStationData.value } { meteoStationData.unit }
                    </div>
                </div>
            </div>
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
            case MeteoVariableCodes.RELATIVE_HUMIDITY:
            case MeteoVariableCodes.MAX_RELATIVE_HUMIDITY:
                return humidtyIcon;
            case MeteoVariableCodes.ATHMOSPHERIC_PRESSURE:
            case MeteoVariableCodes.MAX_ATMOSPHERIC_PRESSURE:
            case MeteoVariableCodes.MIN_ATMOSPHERIC_PRESSURE:
                return pressureIcon;
            case MeteoVariableCodes.RAIN:
                return rainIcon;
            case MeteoVariableCodes.SNOW_LEVEL:
                return snowIcon;
            case MeteoVariableCodes.GLOBAL_SOLAR_IRRADIANCE:
                return solarIcon;
            case MeteoVariableCodes.TEMPERATURE:
            case MeteoVariableCodes.MAX_TEMPERATURE:
            case MeteoVariableCodes.MIN_TEMPERATURE:
                return temperatureIcon;
            case MeteoVariableCodes.WIND_VELOCITY:
                return windIcon;
            case MeteoVariableCodes.WIND_DIRECTION:
                return windDirection;
            default:
                return '';
        }
    }

    const _getDefaultChartVariableAndTitle = (): { variableCode: string, title: string } => {
        return { variableCode: MeteoVariableCodes.TEMPERATURE, title: 'Temperature (ºC)' }
    }

    return (
        <div className="meteo-data-page-container">
            { isLoading ? <LoaderComponent/> : _renderContent()}
        </div>
    );
}