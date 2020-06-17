import { DASHBOARD_LOADING, PUBLIC_LISTS_LOADING } from '../actions/types';

const INITIAL_STATE = {
  dashboard: false,
  public_lists: false
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case DASHBOARD_LOADING:
        return { ...state, dashboard: action.payload }
    case PUBLIC_LISTS_LOADING:
      return { ...state, public_lists: action.payload }
    default:
      return state;
  }
}