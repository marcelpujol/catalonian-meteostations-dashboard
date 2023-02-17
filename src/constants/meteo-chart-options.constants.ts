import { SelectOption } from "../components/select/select.props";
import { MeteoVariableCodes } from "../enums/meteo-variable-codes.enum";

export const METEO_CHART_OPTIONS: SelectOption[] = [
    { name: 'Temperature', value: MeteoVariableCodes.TEMPERATURE },
    { name: 'Relative Humidity', value: MeteoVariableCodes.RELATIVE_HUMIDITY },
    { name: 'Rain', value: MeteoVariableCodes.RAIN }
] 