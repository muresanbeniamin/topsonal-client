import { GET_LIST, FOLLOW_LIST_OK, FOLLOW_LIST_ERROR } from '../actions/types';

const INITIAL_STATE = {
  list: { items: [] },
  follow_list_status: ''
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_LIST:
      return { ...state, list: action.payload }
    case FOLLOW_LIST_OK:
      return { ...state, follow_list_status: action.payload }
    case FOLLOW_LIST_ERROR:
      return { ...state, follow_list_status: action.payload }
    default:
      return state;
  }
}