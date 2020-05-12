import { GET_LIST } from '../actions/types';

const INITIAL_STATE = {
  list: { items: [] }
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_LIST:
      return { ...state, list: action.payload }
    default:
      return state;
  }
}