"use client";

import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, LeafletEvent } from 'leaflet';
import PinPopupContent from '@/components/map/pin/userPin';
import { Dispatch, RefObject, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fetchAllUserPins, fetchMatchingUserPins } from '@/logic/map/pinFetching';
import { useAtomValue } from 'jotai';
import { showUserPinsOnMapAtom, userAtom } from '@/components/store';


export default function StartMap() {
  const showUserPinsOnMap = useAtomValue(showUserPinsOnMapAtom);
  const user = useAtomValue(userAtom);

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
    fetchAllUserPins(user.email, setUserPins);
  }, []);

  return (
    <UserPinsLayer show={showUserPinsOnMap} pins={userPins} setPins={setUserPins}/>
  );
}


export function UserPinsLayer(props: {
  show: boolean,
  pins: {
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
  }[],
  setPins: Dispatch<SetStateAction<{
    id: number;
    lon: number;
    lat: number;
    type: string;
    companyName: string | undefined;
    lastModificationDate: Date;
    service: {
        id: number;
        tagKey: string;
        tagValue: string;
        name: string;
        logo: string;
    };
    draggable: boolean;
    selected: boolean;
    inDeleteMode: boolean;
  }[]>>,
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

  const toggleDraggable = useCallback((id: number) => {
    props.setPins(props.pins.map((pin) => {
      if (pin.id === id) {
        return {
          ...pin,
          selected: !pin.draggable,
          draggable: !pin.draggable,
        };
      }
      return pin;
    }));
  }, [props.pins]);

  const setFocus = useCallback((id: number, selected: boolean) => {
    props.setPins(props.pins.map((pin) => {
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
  }, [props.pins]);

  const setCoordinates = useCallback((id: number, lon: number, lat: number, draggable: boolean) => {
    props.setPins(props.pins.map((pin) => {
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
  }, [props.pins]);

  const setInDeleteMode = useCallback((id: number, inDeleteMode: boolean) => {
    props.setPins(props.pins.map((pin) => {
      if (pin.id === id) {
        return {
          ...pin,
          inDeleteMode: inDeleteMode,
        };
      }
      return pin;
    }));
  }, [props.pins]);

  const deletePin = useCallback((id: number) => {
    props.setPins(props.pins.filter((pin) => pin.id !== id));
  }, [props.pins]);
  
  const eventHandlersArray = useMemo(() => {
    return props.pins.map((pin) => {
      return {
        dragend(e: LeafletEvent) {
          const coords = e.target.getLatLng();
          setCoordinates(pin.id, coords.lng, coords.lat, true);
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
  }, [props.pins]);

  return (
    <>
      {props.show && props.pins.map((pin, index) => (
        <Marker 
          key={pin.id}
          position={[pin.lat, pin.lon]} 
          icon={pin.selected ? markerSelectedIcon : markerIcon} 
          draggable={pin.draggable} 
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