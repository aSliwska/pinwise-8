import { mapBounds } from "@/app/map/layout";
import { Dispatch, SetStateAction } from "react";

export async function handleCompanySearch(
  substring: string,
  setCompanies: Dispatch<SetStateAction<{
    type: string,
    companyName: string | undefined,
    service : {
      id: number,
      tagKey: string,
      tagValue: string,
      name: string,
      logo: string,
    },
  }[]>>,
  services: {
    type: string,
    companyName: string | undefined,
    service : {
      id: number,
      tagKey: string,
      tagValue: string,
      name: string,
      logo: string,
    },
  }[],
) {
  const serviceMap = new Map<string, {id: number; name: string, logo: string}>(); 
  services.forEach(s => {
    serviceMap.set(s.service.tagKey+"="+s.service.tagValue, {
      id: s.service.id,
      name: s.service.name,
      logo: s.service.logo,
    });
  });

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
          way[amenity][name~'${substring}',i];
          way[shop][name~'${substring}',i];
          way[leisure][name~'${substring}',i];
          way[tourism][name~'${substring}',i];
        );
        out;
      `)
    },
  ).then((data)=>data.text());

  const companies: {
    type: string,
    companyName: string | undefined,
    service : {
      id: number,
      tagKey: string,
      tagValue: string,
      name: string,
      logo: string,
    },
  }[] = [];
  
  const resultRows = new Set(result.split("\n"));
  
  resultRows.forEach(row => {
    if (row === "") 
      return;

    const cols = row.split("\t");

    for (let i = 0; i < possibleKeys.length; i++) {
      if (cols[i+1] !== "" && serviceMap.has(possibleKeys[i]+"="+cols[i+1])) {
        const service = serviceMap.get(possibleKeys[i]+"="+cols[i+1]);
        if (service !== null) {
          companies.push({
            type: "company",
            companyName: cols[0],
            service : {
              id: service!.id,
              tagKey: possibleKeys[i],
              tagValue: cols[i+1],
              name: service!.name,
              logo: service!.logo,
            },
          });
        }
        break;
      }
    }
  });

  setCompanies(companies);
}

export async function fetchExistingLocations(
  searchedCompany : {
    type: string,
    companyName: string | undefined,
    service : {
      id: number,
      tagKey: string,
      tagValue: string,
      name: string,
      logo: string,
    }
  },
  setExistingLocations: Dispatch<SetStateAction<{
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
  }[]>>
) {
  const fetchedLocations: {
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
  }[] = [];

  const result = (searchedCompany.type == "company") ? 
  (
    await fetch(
      "https://overpass-api.de/api/interpreter",
      {
        method: "POST",
        body: "data="+ encodeURIComponent(`
          [bbox:${mapBounds.south}, ${mapBounds.west}, ${mapBounds.north}, ${mapBounds.east}]
          [out:json][timeout:50];
          node[${searchedCompany.service.tagKey}=${searchedCompany.service.tagValue}][name='${searchedCompany.companyName}'];
          way[${searchedCompany.service.tagKey}=${searchedCompany.service.tagValue}][name='${searchedCompany.companyName}'];
          out geom;
        `)
      },
    ).then((data)=>data.json()) 
  ) : (
    await fetch(
      "https://overpass-api.de/api/interpreter",
      {
        method: "POST",
        body: "data="+ encodeURIComponent(`
          [bbox:${mapBounds.south}, ${mapBounds.west}, ${mapBounds.north}, ${mapBounds.east}]
          [out:json][timeout:50];
          node[${searchedCompany.service.tagKey}=${searchedCompany.service.tagValue}];
          way[${searchedCompany.service.tagKey}=${searchedCompany.service.tagValue}];
          out geom;
        `)
      },
    ).then((data)=>data.json())
  );
  
  result.elements.forEach((element: any) => {
    if (element.type === "node") {
      fetchedLocations.push({
        lat: element.lat,
        lon: element.lon,
        type: searchedCompany.type,
        companyName: (searchedCompany.companyName !== undefined) ? searchedCompany.companyName : element.tags.name,
        service : searchedCompany.service,
      });
    }
    else {
      fetchedLocations.push({
        lat: element.bounds.minlat + (element.bounds.maxlat - element.bounds.minlat) / 2.0,
        lon: element.bounds.minlon + (element.bounds.maxlon - element.bounds.minlon) / 2.0,
        type: searchedCompany.type,
        companyName: (searchedCompany.companyName !== undefined) ? searchedCompany.companyName : element.tags.name,
        service : searchedCompany.service,
      });
    }
  });

  function compare( a: {
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
  }, b: {
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
  } ) {
    if (a == undefined && b == undefined) {
      return 0;
    }
    if (a == undefined) {
      return 1;
    }
    if (b == undefined) {
      return -1;
    }
    if ( a.companyName! < b.companyName! ){
      return -1;
    }
    if ( a.companyName! > b.companyName! ){
      return 1;
    }
    return 0;
  }

  setExistingLocations(fetchedLocations.sort(compare));
}

export async function reverseGeocode(lat: number, lon: number, setAddress: Dispatch<SetStateAction<string>>) {
  try {
    const result = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${lat}&lon=${lon}&zoom=18&layer=address&addressdetails=1`,
      { 
        method: "GET",
        cache: "force-cache"
      }
    ).then((data) => data.json());

    if (result.features[0].properties.address.road !== undefined && result.features[0].properties.address.house_number !== undefined) {
      setAddress("ul. " + result.features[0].properties.address.road + " " + result.features[0].properties.address.house_number);
    }
    else {
      setAddress("lat: " + lat + ", lon: " + lon);
    }
  }
  catch {
    setAddress("lat: " + lat + ", lon: " + lon);
  }  
}