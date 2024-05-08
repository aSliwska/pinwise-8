import { DragOutlined, DeleteOutlined } from '@ant-design/icons';
import Image from "next/image";
import { Ref, useState } from 'react';
import { Button } from 'antd';


export default function PinPopupContent(props: {
  pin: {
    id: number;
    x: number;
    y: number;
    name: string;
    serviceType: string;
    address: string;
    lastModificationDate: string;
    logo: string;
    draggable: boolean;
    markerRef: Ref<L.Marker>;
  },
  toggleDraggable: (id: number) => void;
  setCoordinates: (id: number, x: number, y: number, draggable: boolean) => void;
}) {
  const [inDeleteMode, setInDeleteMode] = useState(false);
  const [oldCoords, setOldCoords] = useState({
    x: props.pin.x, 
    y: props.pin.y
  });

  return (
    <div className="flex flex-col gap-2">
      {props.pin.draggable ? (
        <>
          <span className="text-neutral-600 text-sm text-center">
            Zapisać nową <br/> pozycję pineski?
          </span>
          <div className="flex flex-row gap-2 justify-between">
            <Button type="primary" onClick={() => {
                postPinCoordinates(props.pin.id, props.pin.x, props.pin.y);
                props.toggleDraggable(props.pin.id);
              }}>
              Tak
            </Button>
            <Button ghost style={{color: "#555555", borderColor: "#555555"}} onClick={() => {
              props.setCoordinates(props.pin.id, oldCoords.x, oldCoords.y, false);
            }}>
              Nie
            </Button>
          </div>
        </>
      ) : (
        inDeleteMode ? (
          <>
            <span className="text-neutral-600 text-sm text-center">
              Na pewno <br/> usunąć pineskę?
            </span>
            <div className="flex flex-row gap-2 justify-between">
              <Button danger type="primary" onClick={() => {
                  //TODO: delete pin from list
                  //TODO: post delete request
                }}>
                Tak
              </Button>
              <Button ghost style={{color: "#555555", borderColor: "#555555"}} onClick={() => {
                setInDeleteMode(false);
              }}>
                Nie
              </Button>
            </div>
          </>
        ) :(
          <>
            <div className="flex flex-row gap-3 items-center">
              <Image
                className="relative"
                src={props.pin.logo}
                alt="company logo or service icon"
                width={40}
                height={40}
                priority
              />
              <span className="text-neutral-600 text-lg">
                {props.pin.name}
              </span>
            </div>
            
            <div className="flex flex-row gap-6 justify-between items-end">
              <div className="flex flex-col text-neutral-600 text-xs">
                <span>{props.pin.serviceType}</span> 
                <span>{props.pin.address}</span>
                <span>{props.pin.lastModificationDate}</span>
              </div>
              <div className='flex flex-row text-lg gap-3 text-neutral-600'>
                <DragOutlined onClick={() => {
                  props.toggleDraggable(props.pin.id);
                  setOldCoords({x: props.pin.x, y: props.pin.y});
                }}/>
                <DeleteOutlined onClick={() => {
                  setInDeleteMode(true);
                  // TODO: dont close popup
                  // TODO: toggle selected mode
                }}/>
              </div>
            </div>
          </>
        )
      )}
    </div>  
  );
}

function postPinCoordinates(id: number, x: number, y: number) {
  alert(`Post new coordinates for pin with id ${id}, x: ${x}, y: ${y}`);
  //todo: implement post request
}