"use client";

import 'leaflet/dist/leaflet.css';
import { useAtomValue } from 'jotai';
import { Icon, LatLng } from 'leaflet';
import { showExistingLocationsOnMapAtom, showHeatmapAtom, showUserPinsOnMapAtom, timePeriodForPinDisplayAtom, userAtom } from '@/components/store';
import { use, useCallback, useEffect, useState } from 'react';
import { fetchExistingLocations } from '@/logic/map/existingLocationFetching';
import { Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import ExistingLocationPopupContent from '@/components/map/pin/existingLocationPin';
import { fetchHeatmapData, fetchMatchingUserPins } from '@/logic/map/pinFetching';
import { UserPinsLayer } from '../page';
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import NewPin from '@/components/map/pin/newPin';
import { time } from 'console';


export default function Heatmap() {
  const showExistingLocationsOnMap = useAtomValue(showExistingLocationsOnMapAtom);
  const showHeatmap = useAtomValue(showHeatmapAtom);
  const showUserPinsOnMap = useAtomValue(showUserPinsOnMapAtom);
  const user = useAtomValue(userAtom);

  const [searchedCompany, _] = useState<{
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

  const [userPins, setUserPins] = useState<{
    id: number,
    lon: number,
    lat: number,
    type: string,
    companyName: string | undefined,
    lastModificationDate: Date,
    service: {
      id: number,
      tagKey: string,
      tagValue: string,
      name: string,
      logo: string,
    },
    draggable: boolean,
    selected: boolean,
    inDeleteMode: boolean,
  }[]>([]);
  useEffect(() => {
    if (searchedCompany !== null) {
      fetchMatchingUserPins(user.email, localStorage.getItem("token"), searchedCompany, setUserPins);
    }
  }, [searchedCompany]);

  const timePeriodForPinDisplay = useAtomValue(timePeriodForPinDisplayAtom);
  const [filtedUserPins, setFilteredUserPins] = useState<{
    id: number,
    lon: number,
    lat: number,
    type: string,
    companyName: string | undefined,
    lastModificationDate: Date,
    service: {
      id: number,
      tagKey: string,
      tagValue: string,
      name: string,
      logo: string,
    },
    draggable: boolean,
    selected: boolean,
    inDeleteMode: boolean,
  }[]>([]);
  useEffect(() => {
    if (timePeriodForPinDisplay == '-1') {
      setFilteredUserPins(userPins);
    }
    else {
      setFilteredUserPins(userPins.filter((p) => (Date.now() - p.lastModificationDate.getTime()) <= parseInt(timePeriodForPinDisplay)));
    }
  }, [timePeriodForPinDisplay, userPins]);

  const [newMarkerPosition, setNewMarkerPosition] = useState<LatLng | undefined>();
  const [showNewMarker, setShowNewMarker] = useState(false);
  const mapEvents = useMapEvents({
    click(e) {
      setNewMarkerPosition(e.latlng);
      setShowNewMarker(!showNewMarker);
    },
  });
  const addNewPin = useCallback((newPin: {
    id: number,
    lon: number,
    lat: number,
    type: string,
    companyName: string | undefined,
    lastModificationDate: Date,
    service: {
      id: number,
      tagKey: string,
      tagValue: string,
      name: string,
      logo: string,
    },
    draggable: boolean,
    selected: boolean,
    inDeleteMode: boolean,
  }) => {
    setShowNewMarker(false);
    setUserPins([...userPins, newPin]);
  }, [userPins]);

  return (
    <>
      <ExistingLocationsLayer show={showExistingLocationsOnMap} searchedCompany={searchedCompany}/>
      <UserPinsLayer show={showUserPinsOnMap} pins={filtedUserPins} setPins={setUserPins}/>
      <HeatmapOverlay show={showHeatmap} searchedCompany={searchedCompany} timePeriod={timePeriodForPinDisplay}/>
      {(showNewMarker && user.isAuthenticated) && 
        <NewPin 
          lat={newMarkerPosition!.lat} 
          lon={newMarkerPosition!.lng}
          company={searchedCompany}
          addNewPin={addNewPin}
        />
      }
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
  timePeriod: string,
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
    lastModificationDate: Date,
  }[]>([]);

  useEffect(() => {
    if (props.searchedCompany !== null) {
      fetchHeatmapData(props.searchedCompany, setHeatmapData);
    }
  }, [props.searchedCompany]);

  const [filtedData, setFilteredData] = useState<{
    lat: number,
    lon: number,
    lastModificationDate: Date,
  }[]>([]);

  useEffect(() => {
    if (props.timePeriod == '-1') {
      setFilteredData(heatmapData);
    }
    else {
      setFilteredData(heatmapData.filter((p) => (Date.now() - p.lastModificationDate.getTime()) <= parseInt(props.timePeriod)));
    }
  }, [props.timePeriod, heatmapData]);

  return (
    <> 
      {props.show &&
        <HeatmapLayer
        points={filtedData}
        radius={10}
        max={1}
        longitudeExtractor={(p: {
          lat: number,
          lon: number,
          lastModificationDate: Date,
        }) => p.lon}
        latitudeExtractor={(p: {
          lat: number,
          lon: number,
          lastModificationDate: Date,
        }) => p.lat}
        intensityExtractor={(p: {
          lat: number,
          lon: number,
          lastModificationDate: Date,
        }) => 1}
        />
      }
    </>
  );
}
