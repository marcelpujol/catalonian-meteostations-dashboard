import { useState } from "react";
import { SearchComponent } from "../../components/search/search.component"
import { MeteoStationListComponent } from "./components/meteo-stations-list/meteo-station-list.component"
import { MeteoStationsMap } from "./components/meteo-stations-map/meteo-stations-map.component";
import { ViewSelectorComponent } from "./components/view-selector/view-selector.component";

import './meteo-stations.page.scss';

export const MeteoStationsPage = () => {
    const [searchTerm, setSearchTerm] = useState<string>();
    const [isMapView, setIsMapView] = useState<boolean>(false);

    const handleChangeSearch = (value: string) => setSearchTerm(value);
    const onViewSelectorChanged = (state: boolean) => setIsMapView(state);

    return (
        <>
            <div className="filters-container">
                <SearchComponent onChangeSearch={handleChangeSearch}/>
                <ViewSelectorComponent viewSelectorChanged={onViewSelectorChanged}/>
            </div>
            {
                isMapView 
                    ? <MeteoStationsMap></MeteoStationsMap>
                    : <MeteoStationListComponent searchTerm={searchTerm!}/>
            }
        </>
    )
}