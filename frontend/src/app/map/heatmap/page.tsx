"use client";

import 'leaflet/dist/leaflet.css';
import { useAtomValue } from 'jotai';
import { Icon } from 'leaflet';
import { showExistingLocationsOnMapAtom } from '@/components/store';
import { useEffect, useState } from 'react';
import { fetchExistingLocations } from '@/logic/map/existingLocationFetching';
import { Marker, Popup } from 'react-leaflet';
import ExistingLocationPopupContent from '@/components/map/pin/existingLocationPin';

export default function HeatmapOverlay() {
  const [markerIcon, _] = useState(new Icon({
    iconUrl: '/marker.svg', 
    iconSize: [24, 40],
    iconAnchor: [12, 40],
    popupAnchor: [-1, -32],
  }));
  const [markerSelectedIcon, __] = useState(new Icon({
    iconUrl: "/marker-selected.svg",
    iconSize: [24, 40],
    iconAnchor: [12, 40],
    popupAnchor: [-1, -32],
  }));
  const [markerExistingIcon, ___] = useState(new Icon({
    iconUrl: "/marker-existing.svg",
    iconSize: [24, 40],
    iconAnchor: [12, 40],
    popupAnchor: [-1, -32],
  }));

  const showExistingLocationsOnMap = useAtomValue(showExistingLocationsOnMapAtom);
  const [searchedCompany, ____] = useState<{
    type: string,
    companyName: string | undefined,
    service : {
      id: number,
      tagKey: string,
      tagValue: string,
      name: string,
      logo: string,
    },
  }>(JSON.parse(localStorage.getItem('searchedCompany')!)); 
  const [existingLocations, setExistingLocations] = useState<{
    lat: number,
    lon: number,
    type: string,
    companyName: string | undefined,
    service : {
      id: number,
      tagKey: string,
      tagValue: string,
      name: string,
      logo: string,
    },
  }[]>([]);

  useEffect(() => {
    if (searchedCompany !== null) {
      fetchExistingLocations(searchedCompany, setExistingLocations);
    }
  }, [searchedCompany]);

  return (
    <>
    {showExistingLocationsOnMap == true ? (
      <>
        {existingLocations.map((pin) => (
          <Marker 
            key={pin.lat + '-' + pin.lon}
            position={[pin.lat, pin.lon]} 
            icon={markerExistingIcon} 
            draggable={false}
          >
            <Popup 
              closeButton={false} 
              closeOnClick={true}
            >
              <ExistingLocationPopupContent pin={pin}/> 
            </Popup>
          </Marker>
        ))}
      </>
    ) : (
      <></>
    )}
    </>
  );
}