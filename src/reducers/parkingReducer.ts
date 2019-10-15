import { ActionType, Action, ParkingState } from '../types';

const initialState: ParkingState = {
  history: [],
  activeTicket: null,
  loadingStartParking: false,
  loadingFinishParking: false,
  startParkingError: null,
}

export default (state: ParkingState = initialState, action: Action): ParkingState => {
  switch (action.type) {
    case ActionType.START_PARKING_PENDING:
      return {
        ...state,
        loadingStartParking: true
      }

    case ActionType.START_PARKING_SUCCESS:
      return {
        ...state,
        activeTicket: action.invoice,
        loadingStartParking: false
      }

    case ActionType.START_PARKING_FAILURE:
      return {
        ...state,
        loadingStartParking: false,
        startParkingError: action.error
      }

    case ActionType.START_PARKING_FAILURE_CLOSE:
      return {
        ...state,
        startParkingError: null
      }

    case ActionType.FINISH_PARKING_PENDING:
      return {
        ...state,
        loadingFinishParking: true
      }

    case ActionType.FINISH_PARKING_SUCCESS:
      return {
        ...state,
        loadingFinishParking: false,
        activeTicket: null
      }

    default:
      return state;
  }
}
