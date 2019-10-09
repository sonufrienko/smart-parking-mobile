import { API, graphqlOperation, Auth } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import {
  ParkingResponse,
  ActionType,
  Action,
  CreateInvoiceMutationVariables,
  CloseInvoiceMutationVariables,
  CreateInvoiceResponse,
  MeResponse,
  CognitoUser,
  User
} from '../types';

export const selectParking = parkingId => ({
  type: ActionType.SELECTED_PARKING,
  parkingId
});

export const startParking = ({ navigation, data }: { navigation: any, data: CreateInvoiceMutationVariables }) => async (dispatch) => {
  dispatch({
    type: ActionType.START_PARKING_PENDING
  });

  try {
    const response: CreateInvoiceResponse = await API.graphql(graphqlOperation(mutations.createInvoice, data));
    const { data: { createInvoice: invoice } } = response;

    dispatch({
      type: ActionType.START_PARKING_SUCCESS,
      invoice: {
        parkingID: invoice.parkingID,
        invoiceID: invoice.invoiceID,
        slotNumber: invoice.slotNumber,
        dateFrom: invoice.dateFrom,
        dateTo: invoice.dateTo,
        plateNumber: invoice.plateNumber,
        price: invoice.price
      }
    } as Action);

    navigation.popToTop();
    navigation.navigate('ParkingHome');
  } catch (error) {
    dispatch({ type: ActionType.START_PARKING_FAILURE, error });
  }
}

export const finishParking = () => async (dispatch, getState) => {
  dispatch({
    type: ActionType.FINISH_PARKING_PENDING
  });

  const { parking: { activeTicket } } = getState();

  try {
    const data: CloseInvoiceMutationVariables = {
      input: {
        parkingID: activeTicket.parkingID,
        invoiceID: activeTicket.invoiceID
      }
    };

    await API.graphql(graphqlOperation(mutations.closeInvoice, data));
    dispatch(fetchUser());

    dispatch({ type: ActionType.FINISH_PARKING_SUCCESS });
  } catch (error) {
    dispatch({ type: ActionType.FINISH_PARKING_FAILURE, error });
  }
}

export const fetchUser = () => async (dispatch) => {
  dispatch({
    type: ActionType.FETCH_USER_PENDING
  });

  try {
    const [cognitoUser, response]: [CognitoUser, MeResponse] = await Promise.all([
      Auth.currentAuthenticatedUser(),
      API.graphql(graphqlOperation(queries.me))
    ]);

    const { data: { me } } = response;

    const user: User = {
      ...me,
      email: cognitoUser.attributes.email,
      phone: cognitoUser.attributes.phone_number
    }

    dispatch({ type: ActionType.FETCH_USER_SUCCESS, user });
  } catch (error) {
    dispatch({ type: ActionType.FETCH_USER_FAILURE, error });
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

  } catch (error) {
    dispatch({ type: ActionType.FETCH_PARKING_FAILURE, error });
  }
}
