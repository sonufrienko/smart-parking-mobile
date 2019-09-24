import { ActionType, Action, AccountState } from '../types';

const initialState: AccountState = {
  user: null
}

export default (state: AccountState = initialState, action: Action): AccountState => {
  switch (action.type) {
    case ActionType.FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.user
      }

    default:
      return state;
  }
}
