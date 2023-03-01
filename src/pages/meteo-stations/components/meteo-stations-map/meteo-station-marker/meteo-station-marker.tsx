import L from "leaflet";
import './meteo-station-marker.scss';

export function getMeteoStationMarker(code: string) {
    return L.divIcon({
        className: `custom-marker marker-code-${code}`,
        html: getMarkerHtml(code),
        iconSize: [15, 15],
        iconAnchor: [10, 10]
    });
}

function getMarkerHtml(code: string): string {
    return `<div id="marker-${code}">${code}</div>`;
}