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

export enum ActionType {
  SELECTED_PARKING = 'SELECTED_PARKING',
  CLEAR_SELECTED_PARKING = 'CLEAR_SELECTED_PARKING',
  FETCH_USER_PENDING = 'FETCH_USER_PENDING',
  FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
  FETCH_USER_FAILURE = 'FETCH_USER_FAILURE',
  START_PARKING_PENDING = 'START_PARKING_PENDING',
  START_PARKING_SUCCESS = 'START_PARKING_SUCCESS',
  START_PARKING_FAILURE = 'START_PARKING_FAILURE',
  FINISH_PARKING_PENDING = 'FINISH_PARKING_PENDING',
  FINISH_PARKING_SUCCESS = 'FINISH_PARKING_SUCCESS',
  FINISH_PARKING_FAILURE = 'FINISH_PARKING_FAILURE',
  FETCH_PARKING_PENDING = 'FETCH_PARKING_PENDING',
  FETCH_PARKING_SUCCESS = 'FETCH_PARKING_SUCCESS',
  FETCH_PARKING_FAILURE = 'FETCH_PARKING_FAILURE'
}
