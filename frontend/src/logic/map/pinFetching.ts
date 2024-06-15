import React, { Dispatch, RefObject, SetStateAction, useRef } from "react";


export async function fetchAllServiceTypes(setServices : Dispatch<SetStateAction<{
  type: string,
  companyName: string | undefined,
  service : {
    id: number,
    tagKey: string,
    tagValue: string,
    name: string,
    logo: string,
  }
}[]>>) {
  // try {
  //   const services: {
      // type: string,
      // companyName: string | undefined,
      // service : {
      //   id: number,
      //   tagKey: string,
      //   tagValue: string,
      //   name: string,
      //   logo: string,
  // }
  //   }[] = [];

  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/map/services`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  
  //     if (response.ok) {
  //       const { data } = await response.json(); 
  //       data.forEach((element:{
  // type: string,
  // companyName: string | undefined,
  // service : {
  //   id: number,
  //   tagKey: string,
  //   tagValue: string,
  //   name: string,
  //   logo: string,
  // }
  //       }) => {
  //         services.push({
  // type: "service",
  // companyName: undefined,
  // service : {
  //   id: element.id,
  //   tagKey: element.tagKey,
  //   tagValue: element.tagValue,
  //   name: element.name,
      // logo: "/service_icons/" + element.tagKey + "/" + element.tagValue ".svg",
  // }
  //         });
  //       });
  //       setServices(services);

  //       return { success: true, message: "Data fetched successfully" };
  //     } 
  //     else {
  //       const errorMessage = await response.text(); 
  //       return { success: false, message: errorMessage };
  //     }
  //   } catch (error) {
  //     return { success: false, message: "An unexpected error occurred" };
  //   }

  // todo: set list of services fetched from db

  setServices([{
    type: "service",
    companyName: undefined,
    service : {
      id: 0,
      tagKey: "shop",
      tagValue: "supermarket",
      name: "Supermarket",
      logo: "/service_icons/shop/supermarket.svg",
    }
  }, {
    type: "service",
    companyName: undefined,
    service : {
      id: 1,
      tagKey: "amenity",
      tagValue: "community_centre",
      name: "Ośrodek kultury",
      logo: "/service_icons/amenity/community_centre.svg",
    }
  }, {
    type: "service",
    companyName: undefined,
    service : {
      id: 2,
      tagKey: "leisure",
      tagValue: "sports_centre",
      name: "Centrum sportowe",
      logo: "/service_icons/leisure/sports_centre.svg",
    }
  }].sort((a, b) => a.service.name.localeCompare(b.service.name)));
}

export async function fetchAllUserPins(email: string, setUserPins : Dispatch<SetStateAction<{
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
}[]>>) {

  // todo: set list of pins fetched from db

  setUserPins([{
    id: 0,
    lon: 19.93686,
    lat: 50.06194,
    type: "company",
    companyName: "Firma 0",
    lastModificationDate: new Date("2024-05-01"),
    service: {
      id: 5,
      tagKey: "shop",
      tagValue: "supermarket",
      name: "Supermarket",
      logo: "/service_icons/shop/supermarket.svg",
    },
    draggable: false,
    selected: false,
    inDeleteMode: false,
  }, {
    id: 1,
    lon: 19.93799,
    lat: 50.06147,
    type: "company",
    companyName: "Firma 1",
    lastModificationDate: new Date("2024-01-01"),
    service: {
      id: 8,
      tagKey: "shop",
      tagValue: "bakery",
      name: "Piekarnia",
      logo: "/service_icons/shop/bakery.svg",
    },
    draggable: false,
    selected: false,
    inDeleteMode: false,
  }]);

}

export async function fetchMatchingUserPins(
  email: string,
  searchedCompany: {
    type: string;
    companyName: string | undefined;
    service: {
        id: number;
        tagKey: string;
        tagValue: string;
        name: string;
        logo: string;
    };
  },
  setUserPins : Dispatch<SetStateAction<{
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
}[]>>) {

  // todo: set filtered list of pins fetched from db based on searchedCompany

  setUserPins([{
    id: 0,
    lon: 19.93686,
    lat: 50.06194,
    type: "company",
    companyName: "Firma 0",
    lastModificationDate: new Date("2024-05-01"),
    service: {
      id: 5,
      tagKey: "shop",
      tagValue: "supermarket",
      name: "Supermarket",
      logo: "/service_icons/shop/supermarket.svg",
    },
    draggable: false,
    selected: false,
    inDeleteMode: false,
  }]);

}

export async function fetchHeatmapData(company: {
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
  setHeatMapData: Dispatch<SetStateAction<{
    lat: number,
    lon: number,
    lastModificationDate: Date,
}[]>>) {  
  // todo: fetch heatmap data

  setHeatMapData([
    {
      lon: 19.93586,
      lat: 50.06184,
      lastModificationDate: new Date("2024-05-01"),
    },
    {
      lon: 19.93636,
      lat: 50.06134,
      lastModificationDate: new Date("2023-01-01"),
    },
    {
      lon: 19.93646,
      lat: 50.06184,
      lastModificationDate: new Date("2024-01-01"),
    },
    {
      lon: 19.93696,
      lat: 50.06294,
      lastModificationDate: new Date("2022-01-01"),
    },
    {
      lon: 19.93486,
      lat: 50.06184,
      lastModificationDate: new Date("2024-06-01"),
    },
  ]);
}