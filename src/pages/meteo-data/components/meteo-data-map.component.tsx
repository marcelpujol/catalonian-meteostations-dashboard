import { MapComponent } from "../../../components/map/map.component";
import './meteo-data-map.component.scss';
import { MeteoDataMapProps } from "./meteo-data-map.props";

export const MeteoDataMapComponent = ({ latitude, longitude, town, land, region }: MeteoDataMapProps) => {
    return (
        <div className="map-container">
            <div className="map-header">
                <div className="image-container">
                    <span className="material-symbols-outlined">map</span>
                </div>
                <div className="spacer"></div>
                <div className="information">
                    <span>Location</span>
                    <span>{town}, {region} ({land})</span>
                </div>
            </div>
            <MapComponent latitude={+latitude} longitude={+longitude}></MapComponent>
        </div>
    );
}