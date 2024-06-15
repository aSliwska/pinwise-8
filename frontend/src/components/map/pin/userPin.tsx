import { DragOutlined, DeleteOutlined } from '@ant-design/icons';
import Image from "next/image";
import { Ref, RefObject, useEffect, useState } from 'react';
import { Button } from 'antd';
import ImageWithDefault from '@/components/imageWithDefault';
import { reverseGeocode } from '@/logic/map/existingLocationFetching';
import { deletePin, postNewPinCoordinates } from '@/logic/map/pinModification';


export default function PinPopupContent(props: {
  pin: {
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
  },
  toggleDraggable: (id: number) => void;
  setCoordinates: (id: number, x: number, y: number, draggable: boolean) => void;
  setInDeleteMode: (id: number, inDeleteMode: boolean) => void;
  deletePin: (id: number) => void;
}) {
  const [oldCoords, setOldCoords] = useState({
    lon: props.pin.lon, 
    lat: props.pin.lat,
  });
  
  const [address, setAddress] = useState("");
  const [runReverseGeocode, setRunReverseGeocode] = useState(false);
  
  useEffect(() => {
    reverseGeocode(props.pin.lat, props.pin.lon, setAddress);
  }, [runReverseGeocode]);

  return (
    <div className="flex flex-col gap-2">
      {props.pin.draggable ? (
        <>
          <span className="text-neutral-600 text-sm text-center">
            Zapisać nową <br/> pozycję pineski?
          </span>
          <div className="flex flex-row gap-2 justify-between">
            <Button type="primary" onClick={() => {
                postNewPinCoordinates(props.pin.id, props.pin.lon, props.pin.lat);
                setRunReverseGeocode(!runReverseGeocode);
                props.toggleDraggable(props.pin.id);
              }}>
              Tak
            </Button>
            <Button ghost style={{color: "#555555", borderColor: "#555555"}} onClick={() => {
              props.setCoordinates(props.pin.id, oldCoords.lon, oldCoords.lat, false);
            }}>
              Nie
            </Button>
          </div>
        </>
      ) : (
        props.pin.inDeleteMode ? (
          <>
            <span className="text-neutral-600 text-sm text-center">
              Na pewno <br/> usunąć pineskę?
            </span>
            <div className="flex flex-row gap-2 justify-between items-center">
              <Button danger type="primary" onClick={() => {
                  deletePin(props.pin.id);
                  props.deletePin(props.pin.id);
                }}>
                Tak
              </Button>
              <Button ghost style={{color: "#555555", borderColor: "#555555"}} onClick={() => {
                props.setInDeleteMode(props.pin.id, false);
              }}>
                Nie
              </Button>
            </div>
          </>
        ) :(
          <>
            <div className="flex flex-row gap-3 items-center">
              <ImageWithDefault
                className="relative p-1"
                style={{'filter': 'invert(34%) sepia(0%) saturate(38%) hue-rotate(274deg) brightness(93%) contrast(98%)'}}
                src={props.pin.service.logo}
                alt="company logo or service icon"
                width={32}
                height={32}
                priority
                defaultSrc='/service_icons/default.svg'
              />
              <span className="flex text-neutral-600 text-lg">
                {(props.pin.companyName !== undefined) ? props.pin.companyName : props.pin.service.name}
              </span>
            </div>
            
            <div className="flex flex-row gap-6 justify-between items-end">
              <div className="flex flex-col text-neutral-600 text-xs">
                {(props.pin.companyName !== undefined) && <span>{props.pin.service.name}</span>}
                <span>{(address !== "") ? address : props.pin.lat + ", " + props.pin.lon}</span>
                <span>{props.pin.lastModificationDate.getDate().toString().padStart(2, '0') + "/" + (props.pin.lastModificationDate.getMonth()+1).toString().padStart(2, '0') + "/" + props.pin.lastModificationDate.getFullYear()}</span>
              </div>
              <div className='flex flex-row text-lg gap-3 text-neutral-600'>
                <DragOutlined onClick={() => {
                  setOldCoords({lon: props.pin.lon, lat: props.pin.lat});
                  props.toggleDraggable(props.pin.id);
                }}/>
                <div onClick={(e) => 
                  e.stopPropagation() // stops popup from closing after the onClick
                }> 
                  <DeleteOutlined onClick={() => {
                    props.setInDeleteMode(props.pin.id, true);
                  }}/>
                </div>
                
              </div>
            </div>
          </>
        )
      )}
    </div>  
  );
}
