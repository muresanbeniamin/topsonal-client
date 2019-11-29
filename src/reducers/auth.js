import { AUTH_USER, AUTH_ERROR, RECOVER_PASSWORD_SUCCESS, RECOVER_PASSWORD_ERROR } from '../actions/types';

const INITIAL_STATE = {
  authenticated: {},
  errorAuthMessage: '',
  recoverPasswordSucessMessage: '',
  recoverPasswordErrorMessage: ''
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: action.payload }
    case AUTH_ERROR:
        return { ...state, errorAuthMessage: action.payload }
    case RECOVER_PASSWORD_SUCCESS:
      return { ...state, recoverPasswordSucessMessage: action.payload }
    case RECOVER_PASSWORD_ERROR:
      return { ...state, recoverPasswordErrorMessage: action.payload }
    default:
      return state;
  }
}