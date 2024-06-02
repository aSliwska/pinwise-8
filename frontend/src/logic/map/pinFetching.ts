import { Dispatch, SetStateAction } from "react";


export async function fetchServices(setServices : Dispatch<SetStateAction<{
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
  //     id: number;
  //     tagKey: string;
  //     tagValue: string;
  //     name: string;
  //     logo: string;
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
  //         id: number;
  //         tagKey: string;
  //         tagValue: string;
  //         name: string;
  //         logo: string;
  //       }) => {
  //         services.push({
  //           id: element.id,
  //           tagKey: element.tagKey,
  //           tagValue: element.tagValue,
  //           name: element.name,
  //           logo: element.logo,
  //         });
  //       });
  //       setServices(data);

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
  }]);
}
