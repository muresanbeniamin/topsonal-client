import { FIND_ITEMS, GET_ITEM } from '../actions/types';

const INITIAL_STATE = {
  items: [],
  item: {}
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FIND_ITEMS:
      return { ...state, items: action.payload }
    case GET_ITEM:
        return { ...state, item: action.payload }
    default:
      return state;
  }
}