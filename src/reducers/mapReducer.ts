import { 
  SELECTED_PARKING, 
  CLEAR_SELECTED_PARKING 
} from '../actions';

const initialState = {
  location: null,
  selectedParkingId: null,
  parkingList: [{
    id: 1001,
    title: 'Amsterdam Central Parking'
  }, {
    id: 1002,
    title: 'Q-Park Nieuwendijk'
  }]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_PARKING:
      return {
        ...state,
        selectedParkingId: action.parkingId
      }

    case CLEAR_SELECTED_PARKING:
      return {
        ...state,
        selectedParkingId: null
      }

    default:
      return state;
  }
}
