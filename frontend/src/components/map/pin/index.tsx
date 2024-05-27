import { DragOutlined, DeleteOutlined } from '@ant-design/icons';
import Image from "next/image";
import { Ref, RefObject, useState } from 'react';
import { Button } from 'antd';

export async function postPinCoordinates(id: number, x: number, y: number) {
  alert(`Post new coordinates for pin with id ${id}, x: ${x}, y: ${y}`);
  //todo: implement post request
}

export async function postDeletePin(id: number) {
  alert(`Delete pin with id ${id}`);
  //todo: implement delete request
}

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
    selected: boolean;
    inDeleteMode: boolean;
    markerRef: RefObject<L.Marker>;
  },
  toggleDraggable: (id: number) => void;
  setCoordinates: (id: number, x: number, y: number, draggable: boolean) => void;
  setInDeleteMode: (id: number, inDeleteMode: boolean) => void;
  deletePin: (id: number) => void;
}) {
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
        props.pin.inDeleteMode ? (
          <>
            <span className="text-neutral-600 text-sm text-center">
              Na pewno <br/> usunąć pineskę?
            </span>
            <div className="flex flex-row gap-2 justify-between items-center">
              <Button danger type="primary" onClick={() => {
                  postDeletePin(props.pin.id);
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
                  setOldCoords({x: props.pin.x, y: props.pin.y});
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
