"use client";

import 'leaflet/dist/leaflet.css';
import { useAtomValue } from 'jotai';
import { Icon, LatLng } from 'leaflet';
import { showExistingLocationsOnMapAtom, showHeatmapAtom, showUserPinsOnMapAtom } from '@/components/store';
import { useEffect, useState } from 'react';
import { fetchExistingLocations } from '@/logic/map/existingLocationFetching';
import { Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import ExistingLocationPopupContent from '@/components/map/pin/existingLocationPin';
import { fetchHeatmapData } from '@/logic/map/pinFetching';
import { UserPinsLayer } from '../page';
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import NewPin from '@/components/map/pin/newPin';


export default function Heatmap() {
  const showExistingLocationsOnMap = useAtomValue(showExistingLocationsOnMapAtom);
  const showHeatmap = useAtomValue(showHeatmapAtom);
  const showUserPinsOnMap = useAtomValue(showUserPinsOnMapAtom);

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

  const [newMarkerPosition, setNewMarkerPosition] = useState<LatLng | undefined>();
  const mapEvents = useMapEvents({
    click(e) {
      setNewMarkerPosition((newMarkerPosition == undefined) ? e.latlng : undefined);
    },
  })

  return (
    <>
      <ExistingLocationsLayer show={showExistingLocationsOnMap} searchedCompany={searchedCompany}/>
      <UserPinsLayer show={showUserPinsOnMap} forAllPins={false} searchedCompany={searchedCompany}/>
      <HeatmapOverlay show={showHeatmap} searchedCompany={searchedCompany}/>
      {(newMarkerPosition !== undefined) && <NewPin lat={newMarkerPosition!.lat} lon={newMarkerPosition!.lng}/>}
    </>
  );
}

export function ExistingLocationsLayer(props : {
  show: boolean,
  searchedCompany: {
    type: string,
    companyName: string | undefined,
    service : {
      id: number,
      tagKey: string,
      tagValue: string,
      name: string,
      logo: string,
    },
  }
}) {
  const [markerExistingIcon, ___] = useState(new Icon({
    iconUrl: "/marker-existing.svg",
    iconSize: [24, 40],
    iconAnchor: [12, 40],
    popupAnchor: [-1, -32],
  }));

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
    if (props.searchedCompany !== null) {
      fetchExistingLocations(props.searchedCompany, setExistingLocations);
    }
  }, [props.searchedCompany]);

  return (
    <>
      {props.show && existingLocations.map((pin) => (
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
  );
}

export function HeatmapOverlay(props : {
  show: boolean,
  searchedCompany: {
    type: string,
    companyName: string | undefined,
    service : {
      id: number,
      tagKey: string,
      tagValue: string,
      name: string,
      logo: string,
    },
  }
}) {
  const [heatmapData, setHeatmapData] = useState<{
    lat: number,
    lon: number,
  }[]>([]);

  useEffect(() => {
    if (props.searchedCompany !== null) {
      fetchHeatmapData(props.searchedCompany, setHeatmapData);
    }
  }, [props.searchedCompany]);

  return (
    <> 
      {props.show &&
        <HeatmapLayer
        points={heatmapData}
        radius={10}
        max={1}
        longitudeExtractor={(p: {
          lat: number,
          lon: number,
        }) => p.lat}
        latitudeExtractor={(p: {
          lat: number,
          lon: number,
        }) => p.lon}
        intensityExtractor={(p: {
          lat: number,
          lon: number,
        }) => 1}
        />
      }
    </>
  );
}
