import { useEffect } from "react";
import { getMeteoData } from "../../services/meteo-data.service";

export const MeteoDataPage = () => {
    useEffect(() => {
        getMeteoData("WB")
            .then((result) => {
                console.log('result', result);
            })
            .catch((err) => {
             console.error(err);   
            })
    }, []);

    return (
        <div>
            <div>Name</div>
            <div>Value</div>
        </div>
    );
}