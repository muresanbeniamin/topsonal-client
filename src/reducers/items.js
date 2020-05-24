import { FIND_ITEMS } from '../actions/types';

const INITIAL_STATE = {
  items: []
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FIND_ITEMS:
      return { ...state, items: action.payload }
    default:
      return state;
  }
}