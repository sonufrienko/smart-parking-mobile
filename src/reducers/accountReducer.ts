import {
  FETCH_USER_PENDING,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE
} from '../actions';

const initialState = {
  user: null,
  vehicleList: [{
    id: 1,
    make: 'Ford',
    model: 'Galaxy',
    plateNumber: 'BKW 7165'
  }, {
    id: 2,
    make: 'VW',
    model: 'Polo',
    plateNumber: 'CD-54-15'
  }]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.user
      }

    default:
      return state;
  }
}
