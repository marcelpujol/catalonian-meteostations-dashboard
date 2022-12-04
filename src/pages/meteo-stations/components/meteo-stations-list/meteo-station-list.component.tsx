import { useEffect, useState } from "react"
import { MeteoStation } from "../../../../models/meteo-station.model";
import { getMeteoStations } from "../../../../services/meteo-stations.service";
import { MeteoStationListItemComponent } from "../meteo-station-list-item/meteo-station-list-item.component";

import './meteo-station-list.component.scss';

export const MeteoStationListComponent = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [meteoStations, setMeteoStations] = useState<MeteoStation[]>([]);

    useEffect(() => {
        getMeteoStations()
            .then((results) => setMeteoStations(results))
            .catch((err) => console.error('err', err))
            .finally(() => setIsLoading(false))
    }, []);

    return (
        <div className="meteo-station-list__container">
            { 
                meteoStations?.map((meteoStation: MeteoStation) => {
                    return (
                        <MeteoStationListItemComponent 
                            meteoStation={meteoStation}/>
                    );
                })
            }
        </div>
    )
}