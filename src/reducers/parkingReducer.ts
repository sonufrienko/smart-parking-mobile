import { 
  START_PARKING_PENDING,
  START_PARKING_SUCCESS,
  START_PARKING_FAILURE
} from '../actions';

const initialState = {
  history: [],
  activeInvoice: {},
  loadingStartParking: false,
  loadingFinishParking: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case START_PARKING_PENDING:
      return {
        ...state,
        loadingStartParking: true
      }

    case START_PARKING_SUCCESS:
      return {
        ...state,
        activeInvoice: action.invoice,
        loadingStartParking: false
      }

    case START_PARKING_FAILURE:
      return {
        ...state,
        loadingStartParking: false
      }

    default:
      return state;
  }
}
