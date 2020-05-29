import { FIND_ITEMS, SET_ITEMS_LOADING } from '../actions/types';

const INITIAL_STATE = {
  items: [],
  are_loading: false
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FIND_ITEMS:
      return { ...state, items: action.payload, are_loading: false }
    case SET_ITEMS_LOADING:
      return { ...state, are_loading: action.payload }
    default:
      return state;
  }
}