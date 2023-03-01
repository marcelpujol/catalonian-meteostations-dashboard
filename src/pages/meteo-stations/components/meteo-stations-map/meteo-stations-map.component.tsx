import data from '../../../../data/stations.json';
import L, { LatLngTuple, LeafletMouseEvent } from 'leaflet';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import { MeteoStationDataProps } from '../../../../enums/meteo-station-data-props.enum';
import { MeteoStationProps } from '../../../../enums/meteo-station-props.enum';
import { getMeteoStationMarker } from './meteo-station-marker/meteo-station-marker';

import './meteo-stations-map.component.scss';
import 'leaflet/dist/leaflet.css';

export const MeteoStationsMap = () => {
    const centralPosition: LatLngTuple = [41.591159, 1.520862];
    const [ meteoStationPositions, setMeteoStationPositions ] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getMeteoStationMarkers();
    }, []);

    function getMeteoStationMarkers(): void {
        let positions: any[] = [];
        data.elements.forEach((meteoStation) => {
            const coordinates = [meteoStation[MeteoStationProps.LATITUDE], meteoStation[MeteoStationProps.LONGITUDE]];
            positions.push(coordinates);
        });
        setMeteoStationPositions(positions);
    }

    function onClick(event: any): void {
        const target = event.target as any;
        const targetClassName: string = target.options.icon.options.className;
        const meteoStationCode = targetClassName.substring(targetClassName.length - 2);
        navigate(`/meteodata/${meteoStationCode}`);
    }

    return (
        <div className="meteo-stations-map-container">
            <MapContainer style={{ width: "600px", height: "600px" }} center={centralPosition} zoom={7.5} scrollWheelZoom={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                { 
                    meteoStationPositions.map((position, index) => {
                        const code = (data.elements[index] as any)![MeteoStationDataProps.STATION_CODE];
                        return (
                            <Marker 
                                position={position} 
                                icon={getMeteoStationMarker(code)}
                                eventHandlers={{ click: onClick}}/>
                        );
                    })
                }
            </MapContainer>
        </div>
    );
}