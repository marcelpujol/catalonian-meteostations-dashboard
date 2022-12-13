import { useEffect, useState } from "react"
import { MeteoStation } from "../../../../models/meteo/meteo-station.model";
import { insertData, METADATA_STORE_NAME } from "../../../../services/internal-storage.service";
import { getMeteoMetadata } from "../../../../services/meteo-metadata.service";
import { getMeteoStations } from "../../../../services/meteo-stations.service";
import { MeteoStationListItemComponent } from "../meteo-station-list-item/meteo-station-list-item.component";

import './meteo-station-list.component.scss';

export const MeteoStationListComponent = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [meteoStations, setMeteoStations] = useState<MeteoStation[]>([]);

    useEffect(() => {
        let initialLoading: boolean = true;
        setTimeout(() => {
            if (initialLoading) {
                Promise.all([
                    getMeteoStations(),
                    getMeteoMetadata()
                ]).then(async ([meteoStations, meteoMetadata]) => {
                    setMeteoStations(meteoStations);
                    await insertData(METADATA_STORE_NAME, meteoMetadata);
                }).catch((err) => {
                    console.error('err', err);
                }).finally(() => {
                    setIsLoading(false);
                });
            }
        });
        return () => { initialLoading = false; }
    }, []);

    return (
        <div className="meteo-station-list__container">
            { 
                meteoStations?.map((meteoStation: MeteoStation) => {
                    return (
                        <MeteoStationListItemComponent 
                            key={meteoStation.code}
                            meteoStation={meteoStation}/>
                    );
                })
            }
        </div>
    )
}