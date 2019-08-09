import { combineReducers } from 'redux';
import mapReducer from './mapReducer'
import accountReducer from './accountReducer'
import parkingReducer from './parkingReducer'

export default combineReducers({
  map: mapReducer,
  account: accountReducer,
  parking: parkingReducer
});
