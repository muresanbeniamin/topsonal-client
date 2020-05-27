import { DASHBOARD, DASHBOARD_ERROR } from '../actions/types';

const INITIAL_STATE = {
  dashboard: {},
  dashboardError: ''
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case DASHBOARD:
      return { ...state, dashboard: action.payload }
    case DASHBOARD_ERROR:
        return { ...state, dashboardError: action.payload }
    default:
      return state;
  }
}