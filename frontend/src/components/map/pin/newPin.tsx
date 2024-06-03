import { DragOutlined, DeleteOutlined } from '@ant-design/icons';
import Image from "next/image";
import { Ref, RefObject, useEffect, useState } from 'react';
import { Button } from 'antd';
import ImageWithDefault from '@/components/imageWithDefault';
import { reverseGeocode } from '@/logic/map/existingLocationFetching';
import { deletePin, postNewPinCoordinates } from '@/logic/map/pinModification';
import { Icon } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';


export default function NewPin(props: {
  lon: number,
  lat: number,
}) {
  const [markerNewIcon, _] = useState(new Icon({
    iconUrl: "/marker-new.svg",
    iconSize: [24, 40],
    iconAnchor: [12, 40],
    popupAnchor: [-1, -32],
  }));

  return (
    <Marker
      position={[props.lon, props.lat]} 
      icon={markerNewIcon}
      zIndexOffset={9002}
    >
      <Popup 
        closeButton={false} 
        // todo start with open popup
      >
        <div className="flex flex-col gap-2">
          <span className="text-neutral-600 text-sm text-center">
            Chcę, aby tu powstał <br/> nowy lokal.
          </span>
          <div className="flex flex-row justify-center">
            <Button type="primary" onClick={() => {

            }}>
              Dodaj pineskę +
            </Button>
          </div>
        </div>  
      </Popup>
    </Marker>
  );
}