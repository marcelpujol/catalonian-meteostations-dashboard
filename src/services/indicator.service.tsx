import { Indicator } from "../enums/indicators.enum";
import { EconomicIndicator } from "../models/economic-indicator.model";
import { GeographicIndicator } from "../models/geographic-indicator.model";
import { PopulationIndicator } from "../models/population-indicator.model";
import { TownIndicators } from "../models/town-indicators.model";
import { UnitValue } from "../models/unit-value.model";

export const mapTownIndicators = (data: any): TownIndicators => {
    return {
        geographic: _mapToGeographicIndicator(data),
        population: _mapToPopulationIndicator(data),
        economical: _mapToEconomicIndicator(data)
    } as TownIndicators;
}

const _mapToGeographicIndicator = (data: any): GeographicIndicator => {
    return {
        area: _mapToIndicator(data, Indicator.SURFACE_AREA),
        altitude: _mapToIndicator(data, Indicator.ALTITUDE),
        longitude: _mapToIndicator(data, Indicator.LONGITUDE),
        latitude: _mapToIndicator(data, Indicator.LATITUDE)
    } as GeographicIndicator;
}

const _mapToPopulationIndicator = (data: any): PopulationIndicator => {
    return {
        men: _mapToIndicator(data, Indicator.MEN),
        women: _mapToIndicator(data, Indicator.WOMEN),
        total: _mapToIndicator(data, Indicator.TOTAL_POPULATION)
    } as PopulationIndicator;
}

const _mapToEconomicIndicator = (data: any): EconomicIndicator => {
    return {
        employed: _mapToIndicator(data, Indicator.EMPLOYED_POPULATION),
        unemployed: _mapToIndicator(data, Indicator.UNEMPLOYED_POPULATION),
        active: _mapToIndicator(data, Indicator.ACTIVE_POPULATION),
        inactive: _mapToIndicator(data, Indicator.INACTIVE_POPULATION)
    } as EconomicIndicator;
}

const _mapToIndicator = (data: any, indicatorId: Indicator): UnitValue => {
    return {
        unit: _getIndicatorUnitById(data, indicatorId),
        value: _getIndicatorValueById(data, indicatorId),
        review: _getIndicatorReviewById(data, indicatorId)
    } as UnitValue;
}

const _getIndicatorById = (data: any, indicatorId: Indicator) => {
    return data.find((indicator: any) => indicator.id === indicatorId);
}

const _getIndicatorValueById = (data: any, indicatorId: Indicator): number => {
    const indicator = _getIndicatorById(data, indicatorId);
    if (indicator?.v) {
        const value = indicator.v;
        return +(value.split(',')[0]);
    }
    return 0;
}

const _getIndicatorUnitById = (data: any, indicatorId: Indicator): string => {
    const indicator = _getIndicatorById(data, indicatorId);
    return indicator?.u;
}

const _getIndicatorReviewById = (data: any, indicatorId: Indicator): number => {
    const indicator = _getIndicatorById(data, indicatorId);
    return +indicator?.r;
}