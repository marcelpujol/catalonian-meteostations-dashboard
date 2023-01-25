import { useState } from "react"
import { ToggleComponent } from "../../components/toggle/toggle.component";
import { METEO_VARIABLES } from "../../constants/meteo-variables.constants"
import { MeteoVariable } from "../../models/meteo/meteo-variable.model";

import './settings.page.scss';

export const SettingsPage = () => {
    const [meteoVariables, setMeteoVariables] = useState<MeteoVariable[]>(METEO_VARIABLES);

    function onToggleChanged(value: boolean) {
        console.log('checked', value);
    }

    function getMeteoVariablesContent(meteoVariable: MeteoVariable): any {
        return (
            <div key={`meteovariable-${meteoVariable.code}`} className="meteovariable-container">
                <div className="first-column">
                    <p>{ meteoVariable.label }</p>
                </div>
                <div className="second-column">
                    <ToggleComponent toggleChanged={onToggleChanged}></ToggleComponent>
                </div>
            </div>
        );
    }

    return (
        <div className="meteovariables-container">
            <p className="text-info">Select the meteo variables that you want to consult on the town detail page:</p>
            <div className="meteovariables-list">
                { meteoVariables.map(meteoVariable => getMeteoVariablesContent(meteoVariable)) }
            </div>
        </div>
    )
}