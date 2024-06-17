import {  useCallback, useState } from 'react';
import { Button } from 'antd';
import { postNewPin } from '@/logic/map/pinModification';
import { Icon, LeafletEvent } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import React from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { showUserPinsOnMapAtom, userAtom } from '@/components/store';


export default function NewPin(props: {
  lon: number,
  lat: number,
  company: {
    type: string,
    companyName: string | undefined,
    service : {
      id: number,
      tagKey: string,
      tagValue: string,
      name: string,
      logo: string,
    },
  },
  addNewPin: (newPin: {
    id: number;
    lon: number;
    lat: number;
    type: string;
    companyName: string | undefined;
    lastModificationDate: Date;
    address: string;
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
  }) => void,
}) {
  const [markerNewIcon, _] = useState(new Icon({
    iconUrl: "/marker-new.svg",
    iconSize: [24, 40],
    iconAnchor: [12, 40],
    popupAnchor: [-1, -32],
  }));
  const setShowUserPins = useSetAtom(showUserPinsOnMapAtom);

  const eventHandlers = useCallback(() => {
    return {
      add: (e: LeafletEvent) => e.target.openPopup(),
    };
  }, []);
  const { email } = useAtomValue(userAtom);

  return (
    <Marker
      position={[props.lat, props.lon]} 
      icon={markerNewIcon}
      zIndexOffset={9002}
      eventHandlers={eventHandlers()}
      interactive
    >
      <Popup 
        closeButton={false} 
      >
        <div className="flex flex-col gap-2">
          <span className="text-neutral-600 text-sm text-center">
            Chcę, aby tu powstał <br/> nowy lokal.
          </span>
          <div className="flex flex-row justify-center">
            <Button type="primary" onClick={() => {
              async function createNewPin() {
                const newPin = await postNewPin(email, localStorage.getItem("token"), props.lat, props.lon, props.company);
                if (newPin != null) {
                  props.addNewPin(newPin);
                  setShowUserPins(true);
                }
              };

              createNewPin();
            }}>
              Dodaj pineskę +
            </Button>
          </div>
        </div>  
      </Popup>
    </Marker>
  );
}