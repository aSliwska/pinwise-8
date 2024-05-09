"use client";

import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import SideMenu from '@/components/navigation/sidemenu';

export default function MapPage({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SideMenu/>
      <div className='h-full w-full'>
        <MapContainer 
          center={[50.06194, 19.93686]} 
          zoom={14} 
          minZoom={12} maxZoom={18}
          zoomSnap={0.5} zoomDelta={1}
          scrollWheelZoom={true} wheelPxPerZoomLevel={120}
          zoomControl={false}
          maxBounds={[[50.1274, 19.7853],[49.9702, 20.2245]]}
          maxBoundsViscosity={0.5}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="bottomright" />

          {children}
        </MapContainer>
      </div>
    </>
    
  );
}