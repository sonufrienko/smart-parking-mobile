export type Parking = {
  __typename: "Parking",
  parkingID: string,
  address: {
    __typename: "Address",
    city: string | null,
    countryCode: string | null,
    line1: string | null,
    postalCode: string | null,
    state: string | null,
  } | null,
  features: Array<string | null> | null,
  location: {
    __typename: "Location",
    latitude: number | null,
    longitude: number | null,
  },
  openingHours: string | null,
  rate: number | null,
  title: string,
  slots: Array<{
    __typename: "Slot",
    parkingID: string | null,
    slotNumber: string | null,
    slotStatus: number | null,
    device: number | null,
  } | null> | null
}

export type ParkingResponse = {
  data: {
    parking: Array<Parking> | null
  };
  errors: Array<{ message: string }> | null;
}
