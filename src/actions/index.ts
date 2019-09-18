import { Auth, API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import { ParkingResponse, ActionType } from '../types';

export const selectParking = (parkingId) => {
  return {
    type: ActionType.SELECTED_PARKING,
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
       type: ActionType.START_PARKING_PENDING 
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
        type: ActionType.START_PARKING_SUCCESS,
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
      dispatch({ type: ActionType.START_PARKING_FAILURE, error });
    }
  }
}

export const finishParking = () => {
  return async (dispatch, getState) => {
    dispatch({
       type: ActionType.FINISH_PARKING_PENDING 
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

      dispatch({ type: ActionType.FINISH_PARKING_SUCCESS });
    } catch(error) {
      dispatch({ type: ActionType.FINISH_PARKING_FAILURE, error });
    }
  }
}

export const fetchUser = () => {
  return async (dispatch, getState) => {
    dispatch({
       type: ActionType.FETCH_USER_PENDING 
    });
    
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      dispatch({ type: ActionType.FETCH_USER_SUCCESS, user: {
        id: cognitoUser.attributes.sub,
        email: cognitoUser.attributes.email,
        phone: cognitoUser.attributes.phone_number
      } });
    } catch(error) {
      dispatch({ type: ActionType.FETCH_USER_FAILURE, error });
    }
  }
}

export const fetchParkingList = () => async (dispatch) => {
    dispatch({ type: ActionType.FETCH_PARKING_PENDING });
    
    try {
      const response: ParkingResponse = await API.graphql(graphqlOperation(queries.parkingListWithoutSlots));
      const { data: { parking } } = response;

      dispatch({
        type: ActionType.FETCH_PARKING_SUCCESS,
        payload: parking
      });

    } catch(error) {
      dispatch({ type: ActionType.FETCH_PARKING_FAILURE, error });
    }
  }
