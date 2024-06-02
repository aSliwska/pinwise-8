import Image from "next/image";
import { useEffect, useState } from 'react';
import { reverseGeocode } from '@/logic/map/existingLocationFetching';
import ImageWithDefault from "@/components/imageWithDefault";


export default function ExistingLocationPopupContent(props: {
  pin: {
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
  },
}) {
  const [address, setAddress] = useState("");
  
  useEffect(() => {
    reverseGeocode(props.pin.lat, props.pin.lon, setAddress);
  }, [props.pin]);

  return (
    <div className="flex flex-col gap-2 w-max">
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
          {(props.pin.companyName !== undefined) && <span>{props.pin.service.name}</span> }
          <span>{(address !== "") ? address : props.pin.lat + ", " + props.pin.lon}</span>
        </div>
      </div>
    </div>  
  );
}
  