import { MeteoVariableCode, MeteoVariableFamily, MeteoVariableLabel } from "../enums/meteo-variable-codes.enum";
import { MeteoVariable } from "../models/meteo/meteo-variable.model";

export const METEO_VARIABLES: MeteoVariable[] = [
    { code: MeteoVariableCode.MAX_ATMOSPHERIC_PRESSURE, label: MeteoVariableLabel.MAX_ATMOSPHERIC_PRESSURE, family: MeteoVariableFamily.ATMOSPHERIC_PRESSURE },
    { code: MeteoVariableCode.MIN_ATMOSPHERIC_PRESSURE, label: MeteoVariableLabel.MIN_ATMOSPHERIC_PRESSURE, family: MeteoVariableFamily.ATMOSPHERIC_PRESSURE },
    { code: MeteoVariableCode.ATHMOSPHERIC_PRESSURE, label: MeteoVariableLabel.ATHMOSPHERIC_PRESSURE, family: MeteoVariableFamily.ATMOSPHERIC_PRESSURE },
    { code: MeteoVariableCode.MAX_RELATIVE_HUMIDITY, label: MeteoVariableLabel.MAX_RELATIVE_HUMIDITY, family: MeteoVariableFamily.HUMIDITY },
    { code: MeteoVariableCode.RELATIVE_HUMIDITY, label: MeteoVariableLabel.RELATIVE_HUMIDITY, family: MeteoVariableFamily.HUMIDITY },
    { code: MeteoVariableCode.WIND_VELOCITY, label: MeteoVariableLabel.WIND_VELOCITY, family: MeteoVariableFamily.WIND },
    { code: MeteoVariableCode.WIND_DIRECTION, label: MeteoVariableLabel.WIND_DIRECTION, family: MeteoVariableFamily.WIND },
    { code: MeteoVariableCode.TEMPERATURE, label: MeteoVariableLabel.TEMPERATURE, family: MeteoVariableFamily.TEMPERATURE },
    { code: MeteoVariableCode.MAX_TEMPERATURE, label: MeteoVariableLabel.MAX_TEMPERATURE, family: MeteoVariableFamily.TEMPERATURE },
    { code: MeteoVariableCode.MIN_TEMPERATURE, label: MeteoVariableLabel.MIN_TEMPERATURE, family: MeteoVariableFamily.TEMPERATURE },
    { code: MeteoVariableCode.RAIN, label: MeteoVariableLabel.RAIN, family: MeteoVariableFamily.RAIN },
    { code: MeteoVariableCode.GLOBAL_SOLAR_IRRADIANCE, label: MeteoVariableLabel.GLOBAL_SOLAR_IRRADIANCE, family: MeteoVariableFamily.SOLAR },
    { code: MeteoVariableCode.SNOW_LEVEL, label: MeteoVariableLabel.SNOW_LEVEL, family: MeteoVariableFamily.SNOW }
];