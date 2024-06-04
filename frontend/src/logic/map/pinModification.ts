export async function postNewPinCoordinates(id: number, lon: number, lat: number) {
  alert(`Post new coordinates for pin with id ${id}, x: ${lon}, y: ${lat}`);
  //todo: implement updating pin coordinates and address
}
  
export async function deletePin(id: number) {
  alert(`Delete pin with id ${id}`);
  //todo: implement delete pin
}

export async function postNewPin(lat: number, lon: number, company: {
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
}> {
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  await sleep(1); // was literally too fast lol. delete when fetching is implemented?
  alert(`Post new pin with lat: ${lat}, lon: ${lon}`);
  
  // todo: implement post new pin

  return {
    id: 3456,
    lon: lon,
    lat: lat,
    ...company,
    lastModificationDate: new Date(Date.now()),
    draggable: false,
    selected: false,
    inDeleteMode: false,
  };
}