import { MeteoStation } from "../../../../models/meteo/meteo-station.model"

type Props = {
    meteoStation: MeteoStation
}

export const MeteoDataInfoComponent = ({ meteoStation }: Props) => {
    return (
        <div>
            <p>Meteo Data Info Component</p>
        </div>
    )
}