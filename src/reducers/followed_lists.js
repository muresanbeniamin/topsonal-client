import { GET_FOLLOWED_LISTS, GET_FOLLOWED_LIST } from '../actions/types';

const INITIAL_STATE = {
  lists: [],
  list: {}
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_FOLLOWED_LIST:
      return { ...state, list: action.payload }
    case GET_FOLLOWED_LISTS:
      return { ...state, lists: action.payload }
    default:
      return state;
  }
}