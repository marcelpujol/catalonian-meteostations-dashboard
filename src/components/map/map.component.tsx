import L, { LatLngTuple } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { MapProps } from "./map.props";

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css'
import './map.component.scss';

export const MapComponent = ({ latitude, longitude, zoom = 10 }: MapProps) => {
    const position: LatLngTuple = [latitude, longitude];

    const DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });
    L.Marker.prototype.options.icon = DefaultIcon;


    return (
        <div className="map-container">
            <MapContainer style={{ width: "300px", height: "300px" }} center={position} zoom={zoom} scrollWheelZoom={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}></Marker>
            </MapContainer>
        </div>
    );
}