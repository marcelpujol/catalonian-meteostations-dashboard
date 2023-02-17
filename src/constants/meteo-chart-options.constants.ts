import { SelectOption } from "../components/select/select.props";
import { MeteoVariableCodes } from "../enums/meteo-variable-codes.enum";

export const METEO_CHART_OPTIONS: SelectOption[] = [
    { name: 'Temperatura', value: MeteoVariableCodes.TEMPERATURE },
    { name: 'Humitat relativa', value: MeteoVariableCodes.RELATIVE_HUMIDITY },
    { name: 'Precipitació', value: MeteoVariableCodes.RAIN }
] 