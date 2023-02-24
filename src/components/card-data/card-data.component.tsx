import { CardDataProps } from "./card-data.props";

import './card-data.component.scss';
import { StaticProgressBarComponent } from "../static-progress-bar/static-progress-bar.component";
import { TemperatureProgressBar } from "../temperature-progress-bar/temperature-progress-bar";
import { MeteoVariableCodes } from "../../enums/meteo-variable-codes.enum";

export const CardDataComponent = ({ code, icon, label, value, unit, min, max }: CardDataProps) => {

    function isTemperatureVariable(code: string): boolean {
        return code === MeteoVariableCodes.TEMPERATURE ||
               code === MeteoVariableCodes.MAX_TEMPERATURE ||
               code === MeteoVariableCodes.MIN_TEMPERATURE;
    }

    return (
        <div className="variable-container" key={`variable-${code}`}>
            <div className="image-column">
                <img src={ icon }/>
            </div>
            <div className="spacer"></div>
            <div className="variable-info-table">
                <div className="row header">
                    <div>{ label }</div>
                </div>
                <div className="row">
                    { value } { unit }
                </div>
                {
                    isTemperatureVariable(code) 
                        ? <TemperatureProgressBar value={value} min={-20} max={50}/>
                        : <StaticProgressBarComponent min={min} max={max} value={value}/>
                }
            </div>
        </div>
    )
}