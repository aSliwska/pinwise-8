"use client";

import 'leaflet/dist/leaflet.css';
import { useAtomValue } from 'jotai';
import { Icon } from 'leaflet';
import { showExistingLocationsOnMapAtom } from '@/components/store';
import { useEffect, useState } from 'react';
import { fetchExistingLocations } from '@/logic/map/existingLocationFetching';
import { Marker, Popup } from 'react-leaflet';

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
  const [searchedService, ____] = useState<{
    tagKey: string,
    tagValue: string,
    name: string,
    logo: string,
  }>(JSON.parse(localStorage.getItem('searchedService')!)); 
  const [existingLocations, setExistingLocations] = useState<{
    tagKey: string,
    tagValue: string,
    name: string,
    logo: string,
    lat: number,
    lon: number,
  }[]>([]);

  useEffect(() => {
    if (searchedService.name != "") {
      fetchExistingLocations(
        searchedService.name, 
        searchedService.tagKey, 
        searchedService.tagValue, 
        setExistingLocations
      );
    }
  }, [searchedService]);

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
              bleh
              {/* <ExistingLocationPopupContent 
                pin={pin}
              /> */} {/* todo: existing location popup content*/}
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