import { SearchComponent } from "../../components/search/search.component"
import { MeteoStationListComponent } from "./components/meteo-stations-list/meteo-station-list.component"

export const MeteoStationsPage = () => {

    function handleChangeSearch(value: string) {
        console.log('handleChangeSearch', value);
    }

    return (
        <>
            <SearchComponent onChangeSearch={handleChangeSearch}/>
            <MeteoStationListComponent/>
        </>
    )
}