"use client";

import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import PinPopupContent from '@/components/map/pin';
import { useCallback, useMemo, useRef, useState } from 'react';


const allUserPins = [{
  id: 0,
  x: 50.06194,
  y: 19.93686,
  name: "Firma 0",
  serviceType: "Typ usługi 0",
  address: "ul. Temp 8",
  lastModificationDate: "21/03/2025",
  logo: "/temp_rectangle.svg",
  draggable: false,
  selected: false,
  inDeleteMode: false,
},
{
  id: 1,
  x: 50.06147,
  y: 19.93799,
  name: "Firma 1",
  serviceType: "Typ usługi 1",
  address: "ul. Temp 10",
  lastModificationDate: "22/03/2025",
  logo: "/temp_rectangle.svg",
  draggable: false,
  selected: false,
  inDeleteMode: false,
}];

export default function MapOverlay() {
  const [markerIcon, _] = useState(new Icon({
    iconUrl: 'marker.svg', 
    iconSize: [24, 40],
    iconAnchor: [12, 40],
    popupAnchor: [-1, -32],
  }));
  const [markerSelectedIcon, __] = useState(new Icon({
    iconUrl: "marker-selected.svg",
    iconSize: [24, 40],
    iconAnchor: [12, 40],
    popupAnchor: [-1, -32],
  }));
  
  const [pins, setPins] = useState(allUserPins.map((pin) => {
    return {
      ...pin, 
      markerRef: useRef<L.Marker>(null)
    }
  }));

  const toggleDraggable = useCallback((id: number) => {
    setPins(pins.map((pin) => {
      if (pin.id === id) {
        return {
          ...pin,
          selected: !pin.draggable,
          draggable: !pin.draggable,
        };
      }
      return pin;
    }));
  }, [pins, setPins]);

  const setFocus = useCallback((id: number, selected: boolean) => {
    setPins(pins.map((pin) => {
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
  }, [pins, setPins]);

  const setCoordinates = useCallback((id: number, x: number, y: number, draggable: boolean) => {
    setPins(pins.map((pin) => {
      if (pin.id === id) {
        return {
          ...pin,
          x: x,
          y: y,
          selected: draggable,
          draggable: draggable,
        };
      }
      return pin;
    }));
  }, [pins, setPins]);

  const setInDeleteMode = useCallback((id: number, inDeleteMode: boolean) => {
    setPins(pins.map((pin) => {
      if (pin.id === id) {
        return {
          ...pin,
          inDeleteMode: inDeleteMode,
        };
      }
      return pin;
    }));
  }, [pins, setPins]);

  const deletePin = useCallback((id: number) => {
    setPins(pins.filter((pin) => pin.id !== id));
  }, [pins, setPins]);
  
  const eventHandlersArray = useMemo(() => {
    return pins.map((pin) => {
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
  }, [pins, setCoordinates]);

  return (
    <>
      {pins.map((pin, index) => (
        <Marker 
          key={pin.id}
          position={[pin.x, pin.y]} 
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
