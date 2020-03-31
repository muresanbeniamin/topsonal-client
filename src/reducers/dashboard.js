import { DASHBOARD, DASHBOARD_ERROR } from '../actions/types';

const INITIAL_STATE = {
  dashboardLists: [],
  dashboardError: ''
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case DASHBOARD:
      return { ...state, dashboardLists: action.payload }
    case DASHBOARD_ERROR:
        return { ...state, dashboardError: action.payload }
    default:
      return state;
  }
}