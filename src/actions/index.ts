import { Auth, API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import { ParkingResponse } from '../types';

export const SELECTED_PARKING = 'SELECTED_PARKING';
export const CLEAR_SELECTED_PARKING = 'CLEAR_SELECTED_PARKING';

export const FETCH_USER_PENDING = 'FETCH_USER_PENDING';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const START_PARKING_PENDING = 'START_PARKING_PENDING';
export const START_PARKING_SUCCESS = 'START_PARKING_SUCCESS';
export const START_PARKING_FAILURE = 'START_PARKING_FAILURE';

export const FINISH_PARKING_PENDING = 'FINISH_PARKING_PENDING';
export const FINISH_PARKING_SUCCESS = 'FINISH_PARKING_SUCCESS';
export const FINISH_PARKING_FAILURE = 'FINISH_PARKING_FAILURE';

export const FETCH_PARKING_PENDING = 'FETCH_PARKING_PENDING';
export const FETCH_PARKING_SUCCESS = 'FETCH_PARKING_SUCCESS';
export const FETCH_PARKING_FAILURE = 'FETCH_PARKING_FAILURE';

export const selectParking = (parkingId) => {
  return {
    type: SELECTED_PARKING,
    parkingId
  }
}

type StartParking = {
  vehicleId: number,
  plateNumber: string,
  slotNumber: string,
  navigation: any
}

type StartParkingInput = {
  UserID: string,
  PlateNumber: string,
  SlotNumber: string
};

type StartParkingMutation = {
  startParking:  {
    Id: string,
    UserID: string | null,
    PlateNumber: string | null,
    DateFrom: number | null,
    DateTo: number | null,
    Price: number | null,
  } | null,
};

type FinishParkingInput = {
  UserID: string
  InvoiceID: string
}

export const startParking = ({ vehicleId, plateNumber, slotNumber, navigation }: StartParking) => {
  return async (dispatch, getState) => {
    dispatch({
       type: START_PARKING_PENDING 
    });

    const { 
      account: { user }, 
      map: { selectedParkingId } 
    } = getState();
    
    try {
      const input: StartParkingInput = {
        UserID: user.id,
        PlateNumber: plateNumber,
        SlotNumber: slotNumber
      };
      
      const response = await API.graphql(graphqlOperation(mutations.startParking, { input }));
      const data: StartParkingMutation = response.data;
      const invoice = data.startParking;

      dispatch({
        type: START_PARKING_SUCCESS,
        invoice: {
          invoiceId: invoice.Id,
          dateFrom: invoice.DateFrom,
          dateTo: invoice.DateTo,
          plateNumber: invoice.PlateNumber,
          price: invoice.Price,
          userID: invoice.UserID,
          slotNumber,
          vehicleId,
          parkingId: selectedParkingId
        }
      });

      navigation.popToTop();
      navigation.navigate('ParkingHome');
    } catch(error) {
      dispatch({ type: START_PARKING_FAILURE, error });
    }
  }
}

export const finishParking = () => {
  return async (dispatch, getState) => {
    dispatch({
       type: FINISH_PARKING_PENDING 
    });

    const { 
      account: { user }, 
      parking: { activeTicket } 
    } = getState();
    
    try {
      const input: FinishParkingInput = {
        UserID: user.id,
        InvoiceID: activeTicket.invoiceId
      };
      
      await API.graphql(graphqlOperation(mutations.finishParking, { input }));

      dispatch({ type: FINISH_PARKING_SUCCESS });
    } catch(error) {
      dispatch({ type: FINISH_PARKING_FAILURE, error });
    }
  }
}

export const fetchUser = () => {
  return async (dispatch, getState) => {
    dispatch({
       type: FETCH_USER_PENDING 
    });
    
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      dispatch({ type: FETCH_USER_SUCCESS, user: {
        id: cognitoUser.attributes.sub,
        email: cognitoUser.attributes.email,
        phone: cognitoUser.attributes.phone_number
      } });
    } catch(error) {
      dispatch({ type: FETCH_USER_FAILURE, error });
    }
  }
}

export const fetchParkingList = () => async (dispatch) => {
    dispatch({ type: FETCH_PARKING_PENDING });
    
    try {
      const response: ParkingResponse = await API.graphql(graphqlOperation(queries.parkingListWithoutSlots));
      const { data: { parking } } = response;

      dispatch({
        type: FETCH_PARKING_SUCCESS,
        payload: parking
      });

    } catch(error) {
      dispatch({ type: FETCH_PARKING_FAILURE, error });
    }
  }
