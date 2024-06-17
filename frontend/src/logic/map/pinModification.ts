import { getReverseGeocoding } from "./existingLocationFetching";

export async function postNewPinCoordinates(email: string, token: string | null, id: number, lon: number, lat: number): Promise<string | null> {
  try {
    const address = await getReverseGeocoding(lat, lon);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/updatePin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email, 
          id: id,
          x_coord: lon,
          y_coord: lat,
          adres: address,
        }),
      }
    );
    
    if (response.ok) {
      return address;
    } 
    else {
      const errorMessage = await response.text(); 
      console.log(errorMessage);
    }
  } catch (error) {
    console.log("An unexpected error occurred");
  }

  return null;
}
  
export async function deletePin(email: string, token: string | null, id: number) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/deletePin?email=${email}&id=${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    
    if (response.ok) {
      return true;
    } 
    else {
      const errorMessage = await response.text(); 
      console.log(errorMessage);
    }
  } catch (error) {
    console.log("An unexpected error occurred");
  }

  return false;
}

export async function postNewPin(email: string, token: string | null, lat: number, lon: number, company: {
  type: string;
  companyName: string | undefined;
  service: {
      id: number;
      tagKey: string;
      tagValue: string;
      name: string;
      logo: string;
  };
}): Promise<{
  id: number;
  lon: number;
  lat: number;
  type: string;
  companyName: string | undefined;
  lastModificationDate: Date;
  address: string;
  service: {
      id: number;
      tagKey: string;
      tagValue: string;
      name: string;
      logo: string;
  };
  draggable: boolean;
  selected: boolean;
  inDeleteMode: boolean;
} | null> {
  try {
    const address = await getReverseGeocoding(lat, lon);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/createPin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email, 
          id_serwis: company.service.id,
          type_id: (company.type == "service") ? 2 : 1,
          company_name: (company.companyName !== undefined) ? company.companyName : "",
          x_coord: lon,
          y_coord: lat,
          adres: address,
        }),
      }
    );
    
    if (response.ok) {
      const data = await response.json(); 
      //console.log(JSON.stringify(data, null, 2));
      
      return {
        id: data,
        lon: lon,
        lat: lat,
        ...company,
        lastModificationDate: new Date(Date.now()),
        address: address,
        draggable: false,
        selected: false,
        inDeleteMode: false,
      };
    } 
    else {
      const errorMessage = await response.text(); 
      console.log(errorMessage);
    }
  } catch (error) {
    console.log("An unexpected error occurred");
  }

  return null;
}