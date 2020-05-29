import { FIND_ITEMS, SET_ITEMS_LOADING, GET_ITEM } from '../actions/types';

const INITIAL_STATE = {
  items: [],
  item: {},
  loading: false
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FIND_ITEMS:
      return { ...state, items: action.payload }
    case SET_ITEMS_LOADING:
      return { ...state, loading: action.payload }
    case GET_ITEM:
        return { ...state, item: action.payload }
    default:
      return state;
  }
}