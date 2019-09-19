import { ActionType } from '../types';

const initialState = {
  loading: false,
  selectedParkingId: null,
  parkingList: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FETCH_PARKING_PENDING:
      return {
        ...state,
        loading: true
      }

    case ActionType.FETCH_PARKING_FAILURE:
      return {
        ...state,
        loading: false
      }

    case ActionType.FETCH_PARKING_SUCCESS:
      return {
        ...state,
        loading: false,
        parkingList: action.payload
      }

    case ActionType.SELECTED_PARKING:
      return {
        ...state,
        selectedParkingId: action.parkingId
      }

    case ActionType.CLEAR_SELECTED_PARKING:
      return {
        ...state,
        selectedParkingId: null
      }

    default:
      return state;
  }
}
