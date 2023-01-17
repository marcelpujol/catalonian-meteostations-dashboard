import { useEffect, useState } from "react"
import { useToolbar } from "../../../../hooks/useUpdateToolbar.hook";
import { MeteoStation } from "../../../../models/meteo/meteo-station.model";
import { insertData, METADATA_STORE_NAME } from "../../../../services/internal-storage.service";
import { getMeteoMetadata } from "../../../../services/meteo-metadata.service";
import { getMeteoStations } from "../../../../services/meteo-stations.service";
import { MeteoStationListItemComponent } from "../meteo-station-list-item/meteo-station-list-item.component";

import './meteo-station-list.component.scss';

type MeteoStationListProps = {
    searchTerm: string;
}

export const MeteoStationListComponent = ({searchTerm}: MeteoStationListProps) => {
    const { updateToolbar } = useToolbar();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [allMeteoStations, setAllMeteoStations] = useState<MeteoStation[]>([]);
    const [displayedMeteoStations, setDisplayedMeteoStations] = useState<MeteoStation[]>([]);

    function getFilteredMeteoStations(searchTerm: string): MeteoStation[] {
        if (searchTerm) {
            let searchTermLowerCase = searchTerm.toLocaleLowerCase();
            return allMeteoStations.filter((meteoStation: MeteoStation) => {
                return meteoStation.name.toLowerCase().includes(searchTermLowerCase) || 
                       meteoStation.town.name.toLowerCase().includes(searchTermLowerCase) ||
                       meteoStation.region.name.toLowerCase().includes(searchTermLowerCase)
            });
        }
        return allMeteoStations;
    }

    useEffect(() => {
        const filteredMeteoStations = getFilteredMeteoStations(searchTerm);
        setDisplayedMeteoStations([...filteredMeteoStations]);
    }, [searchTerm]);

    useEffect(() => {
        let initialLoading: boolean = true;
        updateToolbar('Meteostations', false);
        setTimeout(() => {
            if (initialLoading) {
                Promise.all([
                    getMeteoStations(),
                    getMeteoMetadata()
                ]).then(async ([meteoStations, meteoMetadata]) => {
                    setAllMeteoStations(meteoStations);
                    setDisplayedMeteoStations(meteoStations);
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
                displayedMeteoStations?.map((meteoStation: MeteoStation) => {
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