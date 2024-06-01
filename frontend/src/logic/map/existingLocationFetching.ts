import { mapBounds } from "@/app/map/layout";
import { Dispatch, SetStateAction } from "react";

export async function handleCompanySearch(
  substring: string,
  setCompanies: Dispatch<SetStateAction<{
    tagKey: string;
    tagValue: string;
    name: string;
    logo: string;
  }[]>>
) {
  substring = substring.trim();

  const possibleKeys = ["amenity", "shop", "leisure", "tourism"];

  const result: string = await fetch(
    "https://overpass-api.de/api/interpreter",
    {
      method: "POST",
      body: "data="+ encodeURIComponent(`
        [out:csv(name, ${possibleKeys.join(', ')}; false)]
        [timeout:50]
        [bbox:${mapBounds.south}, ${mapBounds.west}, ${mapBounds.north}, ${mapBounds.east}];
        (
          node[amenity][name~'${substring}',i];
          node[shop][name~'${substring}',i];
          node[leisure][name~'${substring}',i];
          node[tourism][name~'${substring}',i];
        );
        out;
      `)
    },
  ).then((data)=>data.text());

  const companies: {
    tagKey: string,
    tagValue: string,
    name: string,
    logo: string,
  }[] = [];
  
  const resultRows = new Set(result.split("\n"));
  
  resultRows.forEach(row => {
    if (row === "") 
      return;

    const cols = row.split("\t");

    for (let i = 0; i < possibleKeys.length; i++) {
      if (cols[i+1] !== "") {
        companies.push({
          tagKey: possibleKeys[i],
          tagValue: cols[i+1],
          name: cols[0],
          logo: "/temp_rectangle.svg",
        });
        break;
      }
    }
  });

  setCompanies(companies);
}

export async function handleServiceSearch(
    substring: string,
    setServices: Dispatch<SetStateAction<{
        tagKey: string;
        tagValue: string;
        name: string;
        logo: string;
    }[]>>
) {
    substring = substring.trim();

    // try {
    //     const response = await fetch(
    //       `${process.env.NEXT_PUBLIC_API_URL}/map/services/namepattern`,
    //       {
    //         method: "GET",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ substring }),
    //       }
    //     );
    
    //     if (response.ok) {
    //       const data = await response.json(); 
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
}

export async function fetchExistingLocations(
    name: string, 
    tagKey: string, 
    tagValue: string, 
    setExistingLocations: Dispatch<SetStateAction<{
        tagKey: string;
        tagValue: string;
        name: string;
        logo: string;
        lat: number;
        lon: number;
}[]>>) {
    const fetchedLocations: {
        tagKey: string;
        tagValue: string;
        name: string;
        logo: string;
        lat: number;
        lon: number;
    }[] = [];

    const result = await fetch(
        "https://overpass-api.de/api/interpreter",
        {
            method: "POST",
            body: "data="+ encodeURIComponent(`
                [bbox:${mapBounds.south}, ${mapBounds.west}, ${mapBounds.north}, ${mapBounds.east}]
                [out:json][timeout:50];
                node[${tagKey}=${tagValue}][name='${name}'];
                out;
            `)
        },
    ).then((data)=>data.json());

    result.elements.forEach((element: any) => {
        fetchedLocations.push({
            tagKey: tagKey,
            tagValue: tagValue,
            name: name,
            logo: "/temp_rectangle.svg",
            lat: element.lat,
            lon: element.lon,
        });
    });

    setExistingLocations(fetchedLocations);
}