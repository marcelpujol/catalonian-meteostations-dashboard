import { useState } from "react";
import { SearchComponent } from "../../components/search/search.component"
import { MeteoStationListComponent } from "./components/meteo-stations-list/meteo-station-list.component"

export const MeteoStationsPage = () => {
    const [searchTerm, setSearchTerm] = useState<string>();

    function handleChangeSearch(value: string) {
        setSearchTerm(value);
    }

    return (
        <>
            <SearchComponent onChangeSearch={handleChangeSearch}/>
            <MeteoStationListComponent searchTerm={searchTerm!}/>
        </>
    )
}