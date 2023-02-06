import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MeteoVariableCodes } from "../../enums/meteo-variable-codes.enum";
import { MeteoStationData } from "../../models/meteo/meteo-station-data.model";
import { getMeteoData } from "../../services/meteo-data.service";
import { LoaderComponent } from "../../components/loader/loader.components";
import { useSelector } from "react-redux";
import { MeteoVariable } from "../../models/meteo/meteo-variable.model";

import currentTemperatureIcon from "../../assets/current-temp-icon.png";
import humidtyIcon from "../../assets/humidity-icon.png";
import maxTempIcon from "../../assets/max-temp-icon.png";
import minTempIcon from "../../assets/min-temp-icon.png";
import rainIcon from "../../assets/rain-icon.png";
import snowIcon from "../../assets/snow-icon.png";
import windIcon from "../../assets/wind-icon.png";
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

    const _renderListVariables = () => {
        return (
            meteoData.length 
                ? 
                <div className="meteo-variables-list border-box">
                    {
                        meteoData?.map((meteoData) => _renderVariable(meteoData))
                    }
                </div>
                :
                <div className="meteo-variables-error">
                    <span className="material-symbols-outlined">error</span>
                    There are no data to display. Try again later
                </div>
        );
    }

    const _renderVariable = (meteoStationData: MeteoStationData) => {
        return (
            <div className="variable-info-container" key={`variable-${meteoStationData.variable_code}`}>
                <div className="image-column">
                    <img src={ _getIconByVariableCode(meteoStationData.variable_code) }/>
                </div>
                <div className="variable-info-table">
                    <div className="row header">
                        <div>{ meteoStationData.label }</div>
                    </div>
                    <div className="row">
                        <div>{ meteoStationData.value }</div>
                        <div>{ meteoStationData.unit }</div>
                    </div>
                </div>
            </div>
        );
    }

    const _getIconByVariableCode = (code: string): string => {
        switch(code) {
            case MeteoVariableCodes.TEMPERATURE:
                return currentTemperatureIcon;
            case MeteoVariableCodes.RELATIVE_HUMIDITY:
                return humidtyIcon;
            case MeteoVariableCodes.MAX_TEMPERATURE:
                return maxTempIcon;
            case MeteoVariableCodes.MIN_TEMPERATURE:
                return minTempIcon;
            case MeteoVariableCodes.RAIN:
                return rainIcon;
            case MeteoVariableCodes.SNOW_LEVEL:
                return snowIcon;
            case MeteoVariableCodes.WIND_VELOCITY:
                return windIcon;
            default:
                return '';
        }
    }

    return (
        <div className="meteo-data-page-container">
            { isLoading ? <LoaderComponent/> : _renderListVariables()}
        </div>
    );
}