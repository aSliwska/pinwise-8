import { Dispatch, SetStateAction } from "react";
import { getIconFileList } from "./iconReader";


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
  try {
    const services: {
      type: string,
      companyName: string | undefined,
      service : {
        id: number,
        tagKey: string,
        tagValue: string,
        name: string,
        logo: string,
      }
    }[] = [];

    const iconFiles = await getIconFileList();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_UNAUTHORIZED_URL}/services`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  
    if (response.ok) {
      const data = await response.json(); 

      data.forEach((element:{
        id: number,
        name: string,
        tagKey: string,
        tagValue: string,
      }) => {
        services.push({
          type: "service",
          companyName: undefined,
          service : {
            id: element.id,
            tagKey: element.tagKey,
            tagValue: element.tagValue,
            name: element.name,
            logo: (iconFiles.has(element.tagKey + "/" + element.tagValue)) ? 
            "/service_icons/" + element.tagKey + "/" + element.tagValue + ".svg" : 
            "/service_icons/default.svg",
          }
        });
      });

      setServices(services);
    } 
    else {
      const errorMessage = await response.text(); 
      console.log(errorMessage);
    }
  } catch (error) {
    console.log("An unexpected error occurred");
  }
}

export async function fetchAllUserPins(email: string, token: string | null, setUserPins : Dispatch<SetStateAction<{
  id: number,
  lon: number,
  lat: number,
  type: string,
  companyName: string | undefined,
  lastModificationDate: Date,
  address: string,
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
  try {
    const iconFiles = await getIconFileList();

    const pins: {
      id: number,
      lon: number,
      lat: number,
      type: string,
      companyName: string | undefined,
      lastModificationDate: Date,
      address: string,
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
    }[] = [];

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/userPins`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ email: email }),
      }
    );
  
    if (response.ok) {
      const data = await response.json();
      
      data.forEach((element: any) => {
        pins.push({
          id: element.id,
          lon: element.coordinateX,
          lat: element.coordinateY,
          type: (element.type.id == 2) ? "service" : "company",
          companyName: element.companyName,
          lastModificationDate: new Date(element.modificationDate),
          address: element.adres,
          service: {
            id: element.service.id,
            tagKey: element.service.tagKey,
            tagValue: element.service.tagValue,
            name: element.service.name,
            logo: (iconFiles.has(element.service.tagKey + "/" + element.service.tagValue)) ? 
            "/service_icons/" + element.service.tagKey + "/" + element.service.tagValue + ".svg" : 
            "/service_icons/default.svg",
          },
          draggable: false,
          selected: false,
          inDeleteMode: false,
        });
      });

      setUserPins(pins);
    } 
    else {
      const errorMessage = await response.text(); 
      console.log(errorMessage);
    }
  } catch (error) {
    console.log("An unexpected error occurred");
  }
}

export async function fetchMatchingUserPins(
  email: string,
  token: string | null,
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
    address: string,
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
  try {
    const iconFiles = await getIconFileList();

    const pins: {
      id: number,
      lon: number,
      lat: number,
      type: string,
      companyName: string | undefined,
      lastModificationDate: Date,
      address: string,
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
    }[] = [];

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/matchUserPins`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          email: email,
          serwis_id: searchedCompany.service.id,
          type_id: (searchedCompany.type == "service") ? 2 : 1,
          company_name: searchedCompany.companyName,
        }),
      }
    );
  
    if (response.ok) {
      const data = await response.json();
      
      data.forEach((element: any) => {
        pins.push({
          id: element.id,
          lon: element.coordinateX,
          lat: element.coordinateY,
          type: (element.type.id == 2) ? "service" : "company",
          companyName: element.companyName,
          lastModificationDate: new Date(element.modificationDate),
          address: element.adres,
          service: {
            id: element.service.id,
            tagKey: element.service.tagKey,
            tagValue: element.service.tagValue,
            name: element.service.name,
            logo: (iconFiles.has(element.service.tagKey + "/" + element.service.tagValue)) ? 
            "/service_icons/" + element.service.tagKey + "/" + element.service.tagValue + ".svg" : 
            "/service_icons/default.svg",
          },
          draggable: false,
          selected: false,
          inDeleteMode: false,
        });
      });

      setUserPins(pins);
    } 
    else {
      const errorMessage = await response.text(); 
      console.log(errorMessage);
    }
  } catch (error) {
    console.log("An unexpected error occurred");
  }
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
  try {
    const heatmapData: {
      lon: number,
      lat: number,
      lastModificationDate: Date,
    }[] = [];

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_UNAUTHORIZED_URL}/getHeatMap`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          serwis_id: company.service.id,
          type_id: (company.type == "service") ? 2 : 1,
          company_name: company.companyName,
        }),
      }
    );
  
    if (response.ok) {
      const data = await response.json();
      console.log(JSON.stringify(data, null, 2));
      data.forEach((element: any) => {
        heatmapData.push({
          lon: element.coordinateX,
          lat: element.coordinateY,
          lastModificationDate: new Date(element.modificationDate),
        });
      });

      setHeatMapData(heatmapData);
    } 
    else {
      const errorMessage = await response.text(); 
      console.log(errorMessage);
    }
  } catch (error) {
    console.log(error);
  }
  // todo: fetch heatmap data

  // setHeatMapData([
  //   {
  //     lon: 19.93586,
  //     lat: 50.06184,
  //     lastModificationDate: new Date("2024-05-01"),
  //   },
  //   {
  //     lon: 19.93636,
  //     lat: 50.06134,
  //     lastModificationDate: new Date("2023-01-01"),
  //   },
  //   {
  //     lon: 19.93646,
  //     lat: 50.06184,
  //     lastModificationDate: new Date("2024-01-01"),
  //   },
  //   {
  //     lon: 19.93696,
  //     lat: 50.06294,
  //     lastModificationDate: new Date("2022-01-01"),
  //   },
  //   {
  //     lon: 19.93486,
  //     lat: 50.06184,
  //     lastModificationDate: new Date("2024-06-01"),
  //   },
  // ]);
}