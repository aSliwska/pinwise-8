export async function postNewPinCoordinates(id: number, lon: number, lat: number) {
  alert(`Post new coordinates for pin with id ${id}, x: ${lon}, y: ${lat}`);
  //todo: implement updating pin coordinates and address
}
  
export async function deletePin(id: number) {
  alert(`Delete pin with id ${id}`);
  //todo: implement delete pin
}