import data from '../../../../data/stations.json';
import L, { LatLngTuple } from 'leaflet';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

import { MeteoStationDataProp } from '../../../../enums/meteo-station-data-props.enum';
import { MeteoStationProp } from '../../../../enums/meteo-station-props.enum';
import { getMeteoStationMarker } from './meteo-station-marker/meteo-station-marker';

import './meteo-stations-map.component.scss';
import 'leaflet/dist/leaflet.css';
import { getStoragePreference, setStoragePreference } from '../../../../services/storage.service';
import { CENTER_MAP_PREFERENCE_KEY, ZOOM_MAP_PREFERENCE_KEY } from '../../../../constants/storage.constants';
import { DEFAULT_CENTER_MAP, DEFAULT_ZOOM_MAP } from '../../../../constants/general.constants';

export const MeteoStationsMap = () => {
    const centralPosition: LatLngTuple = [41.591159, 1.520862];
    const [ meteoStationPositions, setMeteoStationPositions ] = useState<any[]>([]);
    const [ map, setMap] = useState<L.Map | any>();
    const navigate = useNavigate();

    useEffect(() => {
        const storedZoom = getStoragePreference(ZOOM_MAP_PREFERENCE_KEY);
        const storedCenter = JSON.parse(getStoragePreference(CENTER_MAP_PREFERENCE_KEY)!);
        map?.setView(storedCenter || DEFAULT_CENTER_MAP, storedZoom || DEFAULT_ZOOM_MAP);
        getMeteoStationMarkers();
    }, [map]);

    const MapEvents = () => {
        const events = useMapEvents({
            zoomend: () => {
                const currentZoom = events.getZoom().toString();
                setStoragePreference(ZOOM_MAP_PREFERENCE_KEY, currentZoom);
            },
            dragend: () => {
                const currentCenter = [events.getCenter().lat, events.getCenter().lng];
                setStoragePreference(CENTER_MAP_PREFERENCE_KEY, JSON.stringify(currentCenter));
            }
        });
        return null;
    }

    function getMeteoStationMarkers(): void {
        let positions: any[] = [];
        data.elements.forEach((meteoStation) => {
            const coordinates = [meteoStation[MeteoStationProp.LATITUDE], meteoStation[MeteoStationProp.LONGITUDE]];
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
            <MapContainer style={{ width: "600px", height: "600px" }} 
                center={centralPosition} 
                zoom={DEFAULT_ZOOM_MAP} 
                scrollWheelZoom={true}
                ref={(map) => setMap(map)}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                { 
                    meteoStationPositions.map((position, index) => {
                        const code = (data.elements[index] as any)![MeteoStationDataProp.STATION_CODE];
                        return (
                            <Marker
                                key={`marker-${code}`} 
                                position={position} 
                                icon={getMeteoStationMarker(code)}
                                eventHandlers={{ click: onClick}}/>
                        );
                    })
                }
                <MapEvents/>
            </MapContainer>
        </div>
    );
}