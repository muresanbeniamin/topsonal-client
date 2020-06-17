import { IMAGE_URLS, IMAGE_URLS_ERROR } from '../actions/types';

const INITIAL_STATE = {
  imageUrls: [],
  imageUrlsError: ''
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case IMAGE_URLS:
      return { ...state, imageUrls: action.payload }
    case IMAGE_URLS_ERROR:
        return { ...state, imageUrlsError: action.payload }
    default:
      return state;
  }
}