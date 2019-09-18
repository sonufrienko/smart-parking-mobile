import { ActionType } from '../types';

const initialState = {
  history: [],
  activeTicket: null,
  loadingStartParking: false,
  loadingFinishParking: false
}

export default (state = initialState, action) => {
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
        loadingStartParking: false
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
