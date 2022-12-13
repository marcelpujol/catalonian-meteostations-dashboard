export interface MeteoStationData {
    id: string;
    station_code: string;
    variable_code: string;
    lecture_data: Date;
    extreme_data: Date;
    value: number;
    state_code: string;
    base_code: string;
}