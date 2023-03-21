import { useEffect, useState } from "react";
import { SearchComponent } from "../../components/search/search.component"
import { VIEW_PREFERENCE_KEY } from "../../constants/storage.constants";
import { ViewOption } from "../../enums/view-options.enum";
import { getStoragePreference } from "../../services/storage.service";
import { MeteoStationListComponent } from "./components/meteo-stations-list/meteo-station-list.component"
import { MeteoStationsMap } from "./components/meteo-stations-map/meteo-stations-map.component";
import { ViewSelectorComponent } from "./components/view-selector/view-selector.component";

import './meteo-stations.page.scss';

export const MeteoStationsPage = () => {
    const [searchTerm, setSearchTerm] = useState<string>();
    const [isMapView, setIsMapView] = useState<boolean>(false);

    const handleChangeSearch = (value: string) => setSearchTerm(value);
    const onViewSelectorChanged = (state: boolean) => setIsMapView(state);

    useEffect(() => {
        const viewPreference = getStoragePreference(VIEW_PREFERENCE_KEY);
        setIsMapView(viewPreference === ViewOption.MAP);
    }, []);

    return (
        <>
            <div className="filters-container">
                <SearchComponent onChangeSearch={handleChangeSearch}/>
                <ViewSelectorComponent 
                    viewSelectorChanged={onViewSelectorChanged}
                    defaultValue={isMapView}/>
            </div>
            {
                isMapView 
                    ? <MeteoStationsMap></MeteoStationsMap>
                    : <MeteoStationListComponent searchTerm={searchTerm!}/>
            }
        </>
    )
}