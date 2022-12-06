import { useEffect, useState } from "react"
import { MeteoStationVariable } from "../../../../models/meteo-station-variable.model";
import { MeteoStation } from "../../../../models/meteo-station.model";
import { getMeteoMetadata } from "../../../../services/meteo-metadata.service";
import { getMeteoStations } from "../../../../services/meteo-stations.service";
import { MeteoStationListItemComponent } from "../meteo-station-list-item/meteo-station-list-item.component";

import './meteo-station-list.component.scss';

export const MeteoStationListComponent = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [meteoStations, setMeteoStations] = useState<MeteoStation[]>([]);
    const [meteoMetadata, setMeteoMetaData] = useState<MeteoStationVariable[]>([]);

    useEffect(() => {
        let initialLoading: boolean = true;
        setTimeout(() => {
            if (initialLoading) {
                Promise.all([
                    getMeteoStations(),
                    getMeteoMetadata()
                ]).then(([meteoStations, meteoMetadata]) => {
                    setMeteoStations(meteoStations);
                    setMeteoMetaData(meteoMetadata);
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
                            meteoStation={meteoStation}/>
                    );
                })
            }
        </div>
    )
}