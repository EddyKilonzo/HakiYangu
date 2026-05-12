'use client';

import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './KenyaMap.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const KENYA_CENTER: [number, number] = [0.0236, 37.9062];

const CITIES: Array<{ name: string; pos: [number, number]; desc: string }> = [
  { name: 'Nairobi', pos: [-1.2921, 36.8219], desc: 'Capital — Head Office' },
  { name: 'Mombasa', pos: [-4.0435, 39.6682], desc: 'Coast Region' },
  { name: 'Kisumu', pos: [-0.0917, 34.7679], desc: 'Western Region' },
  { name: 'Nakuru', pos: [-0.3031, 36.0800], desc: 'Rift Valley' },
  { name: 'Eldoret', pos: [0.5143, 35.2698], desc: 'North Rift' },
];

export default function KenyaMapInner() {
  return (
    <MapContainer
      center={KENYA_CENTER}
      zoom={6}
      scrollWheelZoom={false}
      className="kenya-map"
      style={{ height: '100%', width: '100%', borderRadius: '1rem', zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      {CITIES.map(city => (
        <CircleMarker
          key={city.name}
          center={city.pos}
          radius={city.name === 'Nairobi' ? 10 : 7}
          pathOptions={{
            color: '#DB1A1A',
            fillColor: '#DB1A1A',
            fillOpacity: city.name === 'Nairobi' ? 0.9 : 0.6,
            weight: 2,
          }}
        >
          <Popup className="kenya-map-popup">
            <strong style={{ color: '#DB1A1A' }}>{city.name}</strong>
            <br />
            <span style={{ fontSize: '0.75rem', color: '#555' }}>{city.desc}</span>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
