import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MeteoStationData } from "../../models/meteo/meteo-station-data.model";
import { getMeteoData } from "../../services/meteo-data.service";

export const MeteoDataPage = () => {
    const params: any = useParams();
    const [meteodata, setMeteodata] = useState<MeteoStationData[]>([]);
    
    useEffect(() => {
        getMeteoData(params.id)
            .then((result) => {
               console.log('final result', result); 
            })
            .catch((err) => {
             console.error(err);   
            })
    }, [params.id]);

    return (
        <div>
            <div>Name</div>
            <div>Value</div>
        </div>
    );
}