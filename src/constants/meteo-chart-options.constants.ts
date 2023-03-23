import { SelectOption } from "../components/select/select.props";
import { MeteoVariableCode } from "../enums/meteo-variable-codes.enum";

export const METEO_CHART_OPTIONS: SelectOption[] = [
    { name: 'Temperature', value: MeteoVariableCode.TEMPERATURE },
    { name: 'Relative Humidity', value: MeteoVariableCode.RELATIVE_HUMIDITY },
    { name: 'Rain', value: MeteoVariableCode.RAIN }
] 