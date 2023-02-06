import { createSlice } from "@reduxjs/toolkit";
import { MeteoVariableCodes, MeteoVariableFamily, MeteoVariableLabels } from "../enums/meteo-variable-codes.enum";
import { MeteoVariable } from "../models/meteo/meteo-variable.model";

export const meteoVariablesSlice = createSlice({
    name: 'meteoVariables',
    initialState: {
        selected: _getDefaultSelectedMeteoVariables()
    },
    reducers: {
        update: (state, action) => {
            _handleUpdatedMeteoVariable(state, action);
        }
    }
});

function _handleUpdatedMeteoVariable(state: any, action: any): void {
    const updatedMeteoVariable = action.payload.updated as MeteoVariable;
    const meteoVariables = state.selected as MeteoVariable[];
    
    const index = meteoVariables.findIndex(variable => variable.code === updatedMeteoVariable.code);
    (index >= 0 && !updatedMeteoVariable.selected) 
        ? meteoVariables.splice(index, 1)
        : meteoVariables.push(updatedMeteoVariable); 
}

function _getDefaultSelectedMeteoVariables(): MeteoVariable[] {
    return [
        { code: MeteoVariableCodes.RELATIVE_HUMIDITY, label: MeteoVariableLabels.RELATIVE_HUMIDITY, family: MeteoVariableFamily.HUMIDITY, selected: true },
        { code: MeteoVariableCodes.TEMPERATURE, label: MeteoVariableLabels.TEMPERATURE, family: MeteoVariableFamily.TEMPERATURE, selected: true },
        { code: MeteoVariableCodes.MAX_TEMPERATURE, label: MeteoVariableLabels.MAX_TEMPERATURE, family: MeteoVariableFamily.TEMPERATURE, selected: true },
        { code: MeteoVariableCodes.MIN_TEMPERATURE, label: MeteoVariableLabels.MIN_TEMPERATURE, family: MeteoVariableFamily.TEMPERATURE, selected: true },
        { code: MeteoVariableCodes.RAIN, label: MeteoVariableLabels.RAIN, family: MeteoVariableFamily.RAIN, selected: true },
    ];
}

export const { update } = meteoVariablesSlice.actions;
export default meteoVariablesSlice.reducer;