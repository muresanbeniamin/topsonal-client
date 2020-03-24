import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, RECOVER_PASSWORD_SUCCESS, RECOVER_PASSWORD_ERROR } from './types';
import { GET_PROFILE, GET_PROFILE_ERROR, CURRENT_USER_LISTS, FRIEND_LISTS } from './types';
import { GET_USERS, GET_USERS_ERROR, IMAGE_URLS, IMAGE_URLS_ERROR } from './types';

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('api/v1/users/signup', formProps);
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
    const response = await axios.post('api/v1/users/signin', formProps);
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

export const getprofile = authToken => async dispatch => {
  try {
    const config = {headers: {'Authorization': authToken}}
    const profile = await axios.get('api/v1/users/profile', config);
    dispatch({ type: GET_PROFILE, payload: profile.data });
    dispatch({ type: FRIEND_LISTS, payload: profile.data.friend_lists });

    const usersList = await axios.get('api/v1/lists', config);
    dispatch({ type: CURRENT_USER_LISTS, payload: usersList.data });
  } catch (e) {
    const errorMessage = e.response.data.error;
    dispatch({ type: GET_PROFILE_ERROR, payload: errorMessage });
  }
};


export const searchFriends = (authToken, name) => async dispatch => {
  try {
    const config = {headers: {'Authorization': authToken}}
    const users = await axios.get(`api/v1/users?by_name=${name}&search_friends=true`, config);
    dispatch({ type: GET_USERS, payload: users.data });
  } catch (e) {
    const errorMessage = e.response.data.error;
    dispatch({ type: GET_USERS_ERROR, payload: errorMessage });
  }
};

export const getImageUrls = (authToken, keyword) => async dispatch => {
  try {
    const config = {headers: {'Authorization': authToken}}
    const imageUrls = await axios.get(`api/v1/google_search?keyword=${keyword}`, config);
    dispatch({ type: IMAGE_URLS, payload: imageUrls.data });
  } catch (e) {
    const errorMessage = e.response.data.error;
    dispatch({ type: IMAGE_URLS_ERROR, payload: errorMessage });
  }
};

export const createlist = (formProps, authToken) => async dispatch => {
  try {
    const config = {headers: {'Authorization': authToken}}
    await axios.post('api/v1/lists', formProps, config);
    dispatch(getprofile(authToken));
  } catch (e) {
  }
};

export const deleteList = (authToken, listId) => async dispatch => {
  try {
    const config = {headers: {'Authorization': authToken}}
    await axios.delete(`api/v1/lists/${listId}`, config);
    dispatch(getprofile(authToken));
  } catch (e) {
  }
};

export const friendRequest = (authToken, userId) => async dispatch => {
  try {
    const config = {headers: {'Authorization': authToken}}
    await axios.post(`api/v1/users/${userId}/friend_request`, {}, config);
    dispatch(getprofile(authToken));
  } catch (e) {
  }
};

export const acceptFriendRequest = (authToken, userId) => async dispatch => {
  try {
    const config = {headers: {'Authorization': authToken}}
    await axios.post(`api/v1/users/${userId}/accept_friend_request`, {}, config);
    dispatch(getprofile(authToken));
  } catch (e) {
  }
};

export const unfriendRequest = (authToken, userId) => async dispatch => {
  try {
    const config = {headers: {'Authorization': authToken}}
    await axios.post(`api/v1/users/${userId}/unfriend_request`, {}, config);
    dispatch(getprofile(authToken));
  } catch (e) {
  }
};

export const withdrawFriendRequest = (authToken, userId) => async dispatch => {
  try {
    const config = {headers: {'Authorization': authToken}}
    await axios.post(`api/v1/users/${userId}/withdraw_friend_request`, {}, config);
    dispatch(getprofile(authToken));
  } catch (e) {
  }
};