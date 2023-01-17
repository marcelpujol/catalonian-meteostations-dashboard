import { useNavigate } from 'react-router-dom';
import { useToolbar } from '../../../../hooks/useUpdateToolbar.hook';
import { MeteoStation } from '../../../../models/meteo/meteo-station.model';
import './meteo-station-list-item.component.scss';

type Props = {
    meteoStation: MeteoStation
}

export const MeteoStationListItemComponent = ({ meteoStation }: Props) => {
    const navigate = useNavigate();
    const { updateToolbar } = useToolbar();

    function handleClick(meteoStationCode: string) {
        console.log('click', meteoStationCode);
        navigate(`/meteodata/${meteoStationCode}`);
        updateToolbarTitle();
    }

    function updateToolbarTitle() {
        updateToolbar(meteoStation.name, true);
    }

    return (
        <div className="meteo-station__container" key={meteoStation.code} onClick={() => { handleClick(meteoStation.code) }}>
            <div className="meteo-station__row first-line">
                <span>{meteoStation.name}</span>
                <span>{meteoStation.code}</span>
            </div>
            <div className="meteo-station__row">
                <span>{meteoStation.town.name}</span>
                <span>{meteoStation.region.name}</span>
            </div>
        </div>
    )
}