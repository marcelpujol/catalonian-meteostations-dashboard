import { UnitValue } from "./unit-value.model";

export interface EconomicIndicator {
  employed: UnitValue;
  unemployed: UnitValue;
  active: UnitValue;
  inactive: UnitValue;
}
