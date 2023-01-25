import { MeteoVariableCodes, MeteoVariableFamily, MeteoVariableLabels } from "../enums/meteo-variable-codes.enum";
import { MeteoVariable } from "../models/meteo/meteo-variable.model";

export const METEO_VARIABLES: MeteoVariable[] = [
    { code: MeteoVariableCodes.MAX_ATMOSPHERIC_PRESSURE, label: MeteoVariableLabels.MAX_ATMOSPHERIC_PRESSURE, family: MeteoVariableFamily.ATMOSPHERIC_PRESSURE },
    { code: MeteoVariableCodes.MIN_ATMOSPHERIC_PRESSURE, label: MeteoVariableLabels.MIN_ATMOSPHERIC_PRESSURE, family: MeteoVariableFamily.ATMOSPHERIC_PRESSURE },
    { code: MeteoVariableCodes.ATHMOSPHERIC_PRESSURE, label: MeteoVariableLabels.ATHMOSPHERIC_PRESSURE, family: MeteoVariableFamily.ATMOSPHERIC_PRESSURE },
    { code: MeteoVariableCodes.MAX_RELATIVE_HUMIDITY, label: MeteoVariableLabels.MAX_RELATIVE_HUMIDITY, family: MeteoVariableFamily.HUMIDITY },
    { code: MeteoVariableCodes.RELATIVE_HUMIDITY, label: MeteoVariableLabels.RELATIVE_HUMIDITY, family: MeteoVariableFamily.HUMIDITY },
    { code: MeteoVariableCodes.WIND_VELOCITY, label: MeteoVariableLabels.WIND_VELOCITY, family: MeteoVariableFamily.WIND },
    { code: MeteoVariableCodes.WIND_DIRECTION, label: MeteoVariableLabels.WIND_DIRECTION, family: MeteoVariableFamily.WIND },
    { code: MeteoVariableCodes.TEMPERATURE, label: MeteoVariableLabels.TEMPERATURE, family: MeteoVariableFamily.TEMPERATURE },
    { code: MeteoVariableCodes.MAX_TEMPERATURE, label: MeteoVariableLabels.MAX_TEMPERATURE, family: MeteoVariableFamily.TEMPERATURE },
    { code: MeteoVariableCodes.MIN_TEMPERATURE, label: MeteoVariableLabels.MIN_TEMPERATURE, family: MeteoVariableFamily.TEMPERATURE },
    { code: MeteoVariableCodes.RAIN, label: MeteoVariableLabels.RAIN, family: MeteoVariableFamily.RAIN },
    { code: MeteoVariableCodes.GLOBAL_SOLAR_IRRADIANCE, label: MeteoVariableLabels.GLOBAL_SOLAR_IRRADIANCE, family: MeteoVariableFamily.SOLAR },
    { code: MeteoVariableCodes.SNOW_LEVEL, label: MeteoVariableLabels.SNOW_LEVEL, family: MeteoVariableFamily.SNOW }
];