import { ActionType, Action, AccountState } from '../types';

const initialState: AccountState = {
  user: null
}

export default (state: AccountState = initialState, action: Action): AccountState => {
  switch (action.type) {
    case ActionType.FETCH_USER_SUCCESS:
      return {
        ...state,
        user: {
          ...action.user,
          vehicles: [{
            make: 'Ford',
            model: 'Galaxy',
            plateNumber: 'BKW 7165'
          }, {
            make: 'VW',
            model: 'Polo',
            plateNumber: 'CD-54-15'
          }]
        }
      }

    default:
      return state;
  }
}
