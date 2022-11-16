import { EconomicIndicator } from "./economic-indicator.model";
import { GeographicIndicator } from "./geographic-indicator.model";
import { PopulationIndicator } from "./population-indicator.model";

export interface TownIndicators {
  geographic: GeographicIndicator;
  population: PopulationIndicator;
  economical: EconomicIndicator;
}
