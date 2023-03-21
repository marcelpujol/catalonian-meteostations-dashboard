import { createSlice } from "@reduxjs/toolkit";
import { MeteoVariableCode, MeteoVariableFamily, MeteoVariableLabel } from "../enums/meteo-variable-codes.enum";
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
        { code: MeteoVariableCode.RELATIVE_HUMIDITY, label: MeteoVariableLabel.RELATIVE_HUMIDITY, family: MeteoVariableFamily.HUMIDITY, selected: true },
        { code: MeteoVariableCode.TEMPERATURE, label: MeteoVariableLabel.TEMPERATURE, family: MeteoVariableFamily.TEMPERATURE, selected: true },
        { code: MeteoVariableCode.MAX_TEMPERATURE, label: MeteoVariableLabel.MAX_TEMPERATURE, family: MeteoVariableFamily.TEMPERATURE, selected: true },
        { code: MeteoVariableCode.MIN_TEMPERATURE, label: MeteoVariableLabel.MIN_TEMPERATURE, family: MeteoVariableFamily.TEMPERATURE, selected: true },
        { code: MeteoVariableCode.RAIN, label: MeteoVariableLabel.RAIN, family: MeteoVariableFamily.RAIN, selected: true },
    ];
}

export const { update } = meteoVariablesSlice.actions;
export default meteoVariablesSlice.reducer;