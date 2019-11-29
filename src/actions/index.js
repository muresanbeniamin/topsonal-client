import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, RECOVER_PASSWORD_SUCCESS, RECOVER_PASSWORD_ERROR } from './types';

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('/api/v1/users/signup', formProps);
    dispatch({ type: AUTH_USER, payload: response.data.auth_token });
    localStorage.setItem('token', response.data.auth_token);
    callback();
  } catch (e) {
    const errorMessage = e.response.data.errors.join(', ');
    dispatch({ type: AUTH_ERROR, payload: errorMessage })
  }
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('/api/v1/users/signin', formProps);
    dispatch({ type: AUTH_USER, payload: response.data.auth_token });
    localStorage.setItem('token', response.data.auth_token);
    callback();
  } catch (e) {
    const errorMessage = e.response.data.error.user_authentication;
    dispatch({ type: AUTH_ERROR, payload: errorMessage })
  }
};

export const recoverpassword = formProps => async dispatch => {
  try {
    const response = await axios.post('api/v1/users/recover_password', formProps);
    dispatch({ type: RECOVER_PASSWORD_SUCCESS, payload: response.data.message });
    dispatch({ type: RECOVER_PASSWORD_ERROR, payload: '' });
  } catch (e) {
    const errorMessage = e.response.data.error;
    dispatch({ type: RECOVER_PASSWORD_SUCCESS, payload: '' });
    dispatch({ type: RECOVER_PASSWORD_ERROR, payload: errorMessage });
  }
}

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  };
}; 