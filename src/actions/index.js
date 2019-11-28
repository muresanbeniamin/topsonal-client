import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('/v1/users/signup', formProps);
    dispatch({ type: AUTH_USER, payload: response.data.auth_token });
    localStorage.setItem('token', response.data.auth_token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email already taken" })
  }
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('/v1/users/signin', formProps);
    dispatch({ type: AUTH_USER, payload: response.data.auth_token });
    localStorage.setItem('token', response.data.auth_token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Invalid login credentials" })
  }
};

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: ''
  };
}; 