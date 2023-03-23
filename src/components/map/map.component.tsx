import L, { LatLngTuple } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { MapProps } from "./map.props";

import 'leaflet/dist/leaflet.css'
import './map.component.scss';
import { getMeteoStationMarker } from "../../pages/meteo-stations/components/meteo-stations-map/meteo-station-marker/meteo-station-marker";

export const MapComponent = ({ latitude, longitude, zoom = 10, code }: MapProps) => {
    const position: LatLngTuple = [latitude, longitude];

    return (
        <div className="map-container">
            <MapContainer style={{ width: "300px", height: "300px" }} 
                center={position} 
                zoom={zoom} 
                scrollWheelZoom={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker 
                    position={position} 
                    icon={getMeteoStationMarker(code)}/>
            </MapContainer>
        </div>
    );
}