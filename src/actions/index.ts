import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../graphql/mutations';

export const SELECTED_PARKING = 'SELECTED_PARKING';
export const CLEAR_SELECTED_PARKING = 'CLEAR_SELECTED_PARKING';

export const START_PARKING_PENDING = 'START_PARKING_PENDING';
export const START_PARKING_SUCCESS = 'START_PARKING_SUCCESS';
export const START_PARKING_FAILURE = 'START_PARKING_FAILURE';

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
      console.log(invoice);

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
    } catch(err) {
      console.log(err);
    }
  }
}
