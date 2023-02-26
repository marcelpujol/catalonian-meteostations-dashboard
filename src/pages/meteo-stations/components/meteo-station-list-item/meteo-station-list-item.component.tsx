import { useNavigate } from 'react-router-dom';
import { MeteoStation } from '../../../../models/meteo/meteo-station.model';

import './meteo-station-list-item.component.scss';

type Props = {
    meteoStation: MeteoStation
}

export const MeteoStationListItemComponent = ({ meteoStation }: Props) => {
    const navigate = useNavigate();

    function handleClick(meteoStationCode: string) {
        console.log('click', meteoStationCode);
        navigate(`/meteodata/${meteoStationCode}`);
    }

    return (
        <div className="meteo-station-container" key={meteoStation.code} onClick={() => { handleClick(meteoStation.code) }}>
            <div className="image-container">
                <span className="material-symbols-outlined">sensors</span>
                <span className="text">{meteoStation.code}</span>
            </div>
            <div className="spacer"></div>
            <div className="info-container">
                <span className="first">{meteoStation.name}</span>
                <span>{meteoStation.town.name}</span>
                <span>{meteoStation.region.name}</span>
            </div>
        </div>
    )
}