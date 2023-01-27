import { createSlice } from "@reduxjs/toolkit";
import { MeteoVariable } from "../models/meteo/meteo-variable.model";

export const meteoVariablesSlice = createSlice({
    name: 'meteoVariables',
    initialState: {
        selected: []
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

export const { update } = meteoVariablesSlice.actions;
export default meteoVariablesSlice.reducer;