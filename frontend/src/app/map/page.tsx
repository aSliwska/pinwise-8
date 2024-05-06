"use client";

import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

export default function MapPage() {
  const icon = new Icon({iconUrl: 'marker.svg', iconSize: [24, 40]});

  return (
    <>
      <Marker position={[50.06194, 19.93686]} icon={icon} draggable>
        <Popup closeButton={false} offset={[0, -4]} className='rounded-sm'>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>

      <Marker position={[50.1274, 19.7853]} icon={icon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <Marker position={[49.9702, 20.2245]} icon={icon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </>
    
  );
}