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
  openingHours: Array<{
    __typename: "WorkDay",
    open: {
      __typename: "DayAndTime",
      day: number,
      time: string | null,
    } | null,
    close: {
      __typename: "DayAndTime",
      day: number,
      time: string | null,
    } | null,
  } | null> | null,
  rate: number | null,
  title: string,
  freeSlots: number,
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

export type CreateInvoiceInput = {
  parkingID?: string | null,
  slotNumber?: string | null,
  plateNumber?: string | null,
};

export type CloseInvoiceInput = {
  parkingID?: string | null,
  invoiceID?: string | null,
};

export type CreateInvoiceMutationVariables = {
  input: CreateInvoiceInput,
};

export type CloseInvoiceMutationVariables = {
  input: CloseInvoiceInput,
};

export type Invoice = {
  __typename: "Invoice",
  parkingID: string | null,
  invoiceID: string | null,
  slotNumber: string | null,
  dateFrom: string | null,
  dateTo: string | null,
  plateNumber: string | null,
  price: number | null
}

export type CreateInvoiceResponse = {
  data: {
    createInvoice: Invoice | null,
  };
  errors: Array<{ message: string }> | null;
};

export type CloseInvoiceResponse = {
  data: {
    closeInvoice: Invoice | null,
  };
  errors: Array<{ message: string }> | null;
};

export type MeResponse = {
  data: {
    me: User | null,
  };
  errors: Array<{ message: string }> | null;
};

export type ParkingState = {
  history: Array<Invoice | null> | null,
  activeTicket: Invoice | null,
  loadingStartParking: boolean,
  loadingFinishParking: boolean
}

export type MapState = {
  loading: boolean,
  selectedParkingId: string | null,
  parkingList: Array<Parking>
}

export type User = {
  userID: string,
  fullName: string,
  email: string,
  phone: string,
  vehicles: Array<Vehicle>,
  invoices: Array<Invoice> | null
}

export type AccountState = {
  user: User
}

export type AppState = {
  map: MapState,
  account: AccountState,
  parking: ParkingState
}

export type Action = {
  type: ActionType,
  payload?: any,
  invoice?: Invoice | null,
  user?: User | null
}

export type Vehicle = {
  make: string,
  model: string
  plateNumber: string
}

export type CognitoUser = {
  attributes: {
    email: string,
    email_verified: boolean,
    phone_number: string,
    phone_number_verified: boolean,
    sub: string
  }
}