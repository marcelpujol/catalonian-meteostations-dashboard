import { MeteoVariable } from './../models/meteo/meteo-variable.model';
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { update, get } from "../redux/meteoVariablesSlice";

export const useSelectedMeteoVariables = () => {
    const dispatch = useDispatch();

    const actions = useMemo(() => ({
        update(updatedMeteoVariable: MeteoVariable) {
            const action = update({ updated: updatedMeteoVariable });
            dispatch(action);
        },
        get() {
            const action = get();
            dispatch(action);
        }
    }), [dispatch])

    return actions;
}