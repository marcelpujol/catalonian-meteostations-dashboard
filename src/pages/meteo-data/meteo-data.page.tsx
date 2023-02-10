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

import { LineChartComponent } from "../../components/line-chart/line-chart";
import './meteo-data.page.scss'

export const MeteoDataPage = () => {
    const params: any = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [meteoData, setMeteoData] = useState<MeteoStationData[]>([]);
    const selectedMeteoVariables = useSelector<any, MeteoVariable[]>(state => state.meteoVariables.selected);
    
    useEffect(() => {
        getMeteoData(params.id, selectedMeteoVariables)
            .then((meteoData) => {
               console.log('final result', meteoData);
               setMeteoData(meteoData);
            })
            .catch((err) => {
                console.error(err);   
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [params.id]);

    const _renderContent = () => {
        return (
            <div className="meteo-data-container">
                { _renderVariablesContainer() }
                { _renderChart() }
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
        return <LineChartComponent variableCode={"32"} stationCode={params.id}></LineChartComponent>;
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
            default:
                return '';
        }
    }

    return (
        <div className="meteo-data-page-container">
            { isLoading ? <LoaderComponent/> : _renderContent()}
        </div>
    );
}