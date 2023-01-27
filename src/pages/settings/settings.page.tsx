import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { ToggleComponent } from "../../components/toggle/toggle.component";
import { METEO_VARIABLES } from "../../constants/meteo-variables.constants"
import { useSelectedMeteoVariables } from "../../hooks/useMeteoVariables.hook";
import { MeteoVariable } from "../../models/meteo/meteo-variable.model";

import './settings.page.scss';

export const SettingsPage = () => {
    const selectedMeteoVariables = useSelector<any, MeteoVariable[]>(state => state.meteoVariables.selected);
    const [meteoVariables, setMeteoVariables] = useState<MeteoVariable[]>(METEO_VARIABLES);
    const { update } = useSelectedMeteoVariables();

    useEffect(() => {
        setSelectedMeteoVariables();
    },[meteoVariables, selectedMeteoVariables]);

    function setSelectedMeteoVariables() {
        for (let meteoVariable of meteoVariables) {
            const index = selectedMeteoVariables?.findIndex(variable => variable.code === meteoVariable.code);
            meteoVariable.selected = index >= 0;
        }
        setMeteoVariables(meteoVariables);
    }

    function onToggleChanged(value: boolean, id: string) {
        let updatedVariable = meteoVariables.find(variable => variable.code === id);
        if (updatedVariable) {
            updatedVariable = { ...updatedVariable, selected: value };
            update(updatedVariable);
        }
    }

    function getMeteoVariablesContent(meteoVariable: MeteoVariable): any {
        return (
            <div key={`meteovariable-${meteoVariable.code}`} className="meteovariable-container">
                <div className="first-column">
                    <p>{ meteoVariable.label }</p>
                </div>
                <div className="second-column">
                    <ToggleComponent id={meteoVariable.code} defaultValue={meteoVariable.selected} toggleChanged={onToggleChanged}></ToggleComponent>
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