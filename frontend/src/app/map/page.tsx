"use client";

import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import PinPopupContent from '@/components/map/pin/userPin';
import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fetchAllUserPins, fetchMatchingUserPins } from '@/logic/map/pinFetching';
import { useAtomValue } from 'jotai';
import { showUserPinsOnMapAtom, userAtom } from '@/components/store';


export default function StartMap() {
  const showUserPinsOnMap = useAtomValue(showUserPinsOnMapAtom);

  return (
    <UserPinsLayer show={showUserPinsOnMap} forAllPins={true}/>
  );
}

export function UserPinsLayer(props: {
  show: boolean,
  forAllPins: boolean,
  searchedCompany?: {
    type: string,
    companyName: string | undefined,
    service : {
      id: number,
      tagKey: string,
      tagValue: string,
      name: string,
      logo: string,
    },
  } | undefined,
}) {
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

  const user = useAtomValue(userAtom);

  const [userPins, setUserPins] = useState<{
    id: number,
    lon: number,
    lat: number,
    type: string,
    companyName: string,
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
    markerRef: RefObject<L.Marker>,
  }[]>([]);

  useEffect(() => {
    if (props.forAllPins) {
      fetchAllUserPins(user.email, setUserPins);
    }
    else if (props.searchedCompany !== null) {
      fetchMatchingUserPins(user.email, props.searchedCompany!, setUserPins);
    }
  }, [props.searchedCompany]);

  const toggleDraggable = useCallback((id: number) => {
    setUserPins(userPins.map((pin) => {
      if (pin.id === id) {
        return {
          ...pin,
          selected: !pin.draggable,
          draggable: !pin.draggable,
        };
      }
      return pin;
    }));
  }, [userPins, setUserPins]);

  const setFocus = useCallback((id: number, selected: boolean) => {
    setUserPins(userPins.map((pin) => {
      if (pin.id === id) {
        if (!selected) {
          return {
            ...pin,
            selected: selected,
            inDeleteMode: false,
          };
        }
        return {
          ...pin,
          selected: selected,
        };
      } else if (!pin.draggable) {
        return {
          ...pin,
          selected: false,
        };
      }
      return pin;
    }));
  }, [userPins, setUserPins]);

  const setCoordinates = useCallback((id: number, lon: number, lat: number, draggable: boolean) => {
    setUserPins(userPins.map((pin) => {
      if (pin.id === id) {
        return {
          ...pin,
          lon: lon,
          lat: lat,
          selected: draggable,
          draggable: draggable,
        };
      }
      return pin;
    }));
  }, [userPins, setUserPins]);

  const setInDeleteMode = useCallback((id: number, inDeleteMode: boolean) => {
    setUserPins(userPins.map((pin) => {
      if (pin.id === id) {
        return {
          ...pin,
          inDeleteMode: inDeleteMode,
        };
      }
      return pin;
    }));
  }, [userPins, setUserPins]);

  const deletePin = useCallback((id: number) => {
    setUserPins(userPins.filter((pin) => pin.id !== id));
  }, [userPins, setUserPins]);
  
  const eventHandlersArray = useMemo(() => {
    return userPins.map((pin) => {
      return {
        dragend() {
          const marker = pin.markerRef.current;
          if (marker != null) {
            const coords = marker.getLatLng();
            setCoordinates(pin.id, coords.lat, coords.lng, true);
          }
        },
        popupopen() {
          setFocus(pin.id, true);
        },
        popupclose() {
          if (!pin.draggable) {
            setFocus(pin.id, false);
          }
        },
      };
    });
  }, [userPins, setCoordinates]);

  return (
    <>
      {props.show && userPins.map((pin, index) => (
        <Marker 
          key={pin.id}
          position={[pin.lon, pin.lat]} 
          icon={pin.selected ? markerSelectedIcon : markerIcon} 
          draggable={pin.draggable} 
          ref={pin.markerRef} 
          eventHandlers={eventHandlersArray[index]}
          zIndexOffset={pin.selected ? 9001 : 0}
        >
          <Popup 
            closeButton={false} 
            closeOnClick={true}
          >
            <PinPopupContent 
              pin={pin} 
              toggleDraggable={toggleDraggable} 
              setCoordinates={setCoordinates}
              setInDeleteMode={setInDeleteMode}
              deletePin={deletePin}
            />
          </Popup>
        </Marker>
      ))}
    </>
  );
}