"use client";

import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import SideMenu from '@/components/navigation/sidemenu';
import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { userAtom } from '@/components/store';
import SiteTour from '@/components/map/siteTour';
import { usePathname } from 'next/navigation';

export const mapBounds = {
  north: 50.1274,
  west: 19.7853,
  south: 49.9702,
  east: 20.2245
}

export default function MapPage({
  children
}: {
  children: React.ReactNode
}) {
  const [showTour, setShowTour] = useState<boolean>(localStorage.getItem('finishedTour') == null);

  return (
    <>
      <SideMenu/>
      {showTour && <SiteTour setShowTour={setShowTour}/>}
      <div className='h-full w-full'>
        <MapContainer 
          center={[50.06194, 19.93686]} 
          zoom={14} 
          minZoom={12} maxZoom={18}
          zoomSnap={0.5} zoomDelta={1}
          scrollWheelZoom={true} wheelPxPerZoomLevel={120}
          zoomControl={false}
          maxBounds={[[mapBounds.north, mapBounds.west],[mapBounds.south, mapBounds.east]]}
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
