import { DASHBOARD, DASHBOARD_PUBLIC_LISTS, DASHBOARD_ERROR } from '../actions/types';

const INITIAL_STATE = {
  dashboard: {
    friend_lists: []
  },
  dashboardPublicLists: [],
  dashboardError: ''
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case DASHBOARD:
      return { ...state, dashboard: action.payload }
    case DASHBOARD_PUBLIC_LISTS:
        return { ...state, dashboardPublicLists: action.payload }
    case DASHBOARD_ERROR:
        return { ...state, dashboardError: action.payload }
    default:
      return state;
  }
}