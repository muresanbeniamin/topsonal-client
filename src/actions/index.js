import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

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

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  };
}; 