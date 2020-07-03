import axios from 'axios';
import * as types from './types';

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('/api/v1/users/signup', formProps);
    dispatch({ type: types.AUTH_USER, payload: response.data.auth_token });
    localStorage.setItem('token', response.data.auth_token);
    callback();
  } catch (e) {
    const errorMessage = e.response.data.errors.join(', ');
    dispatch({ type: types.AUTH_ERROR, payload: errorMessage })
  }
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post('/api/v1/users/signin', formProps);
    dispatch({ type: types.AUTH_USER, payload: response.data.auth_token });
    localStorage.setItem('token', response.data.auth_token);
    callback();
  } catch (e) {
    const errorMessage = e.response.data.error.user_authentication;
    dispatch({ type: types.AUTH_ERROR, payload: errorMessage })
  }
};

export const recoverpassword = formProps => async dispatch => {
  try {
    const response = await axios.post('/api/v1/users/recover_password', formProps);
    dispatch({ type: types.RECOVER_PASSWORD_SUCCESS, payload: response.data.message });
    dispatch({ type: types.RECOVER_PASSWORD_ERROR, payload: '' });
  } catch (e) {
    const errorMessage = e.response.data.error;
    dispatch({ type: types.RECOVER_PASSWORD_SUCCESS, payload: '' });
    dispatch({ type: types.RECOVER_PASSWORD_ERROR, payload: errorMessage });
  }
};

export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: types.AUTH_USER,
    payload: ''
  };
};

export const getprofile = authToken => async dispatch => {
  dispatch({ type: types.SET_LOADING, payload: true });
  try {
    const config = {headers: {'Authorization': authToken}}
    const profile = await axios.get('/api/v1/users/profile', config);

    dispatch({ type: types.GET_PROFILE, payload: profile.data });

    const usersList = await axios.get('/api/v1/lists', config);
    dispatch({ type: types.CURRENT_USER_LISTS, payload: usersList.data });
  } catch (e) {
    const errorMessage = e.response.data.error;
    dispatch({ type: types.GET_PROFILE_ERROR, payload: errorMessage });
  }
  dispatch({ type: types.SET_LOADING, payload: false });
};

export const getDashboard = authToken => async dispatch => {
  try {
    const config = {headers: {'Authorization': authToken}}
    dispatch({ type: types.DASHBOARD_LOADING, payload: true });
    const dashboard = await axios.get('/api/v1/users/dashboard', config);
    dispatch({ type: types.DASHBOARD, payload: dashboard.data });
    dispatch({ type: types.DASHBOARD_LOADING, payload: false });

    dispatch({ type: types.PUBLIC_LISTS_LOADING, payload: true });
    const publicLists = await axios.get('/api/v1/public_lists', config);
    dispatch({ type: types.PUBLIC_LISTS, payload: publicLists.data });
    dispatch({ type: types.PUBLIC_LISTS_LOADING, payload: false });
  } catch (e) {
    const errorMessage = e.response.data.error;
    dispatch({ type: types.DASHBOARD_ERROR, payload: errorMessage });
  }
};

export const searchFriends = (authToken, name) => async dispatch => {
  try {
    const config = {headers: {'Authorization': authToken}}
    const users = await axios.get(`/api/v1/users?by_name=${name}&search_friends=true`, config);
    dispatch({ type: types.GET_USERS, payload: users.data });
  } catch (e) {
    const errorMessage = e.response.data.error;
    dispatch({ type: types.GET_USERS_ERROR, payload: errorMessage });
  }
};

export const friendRequest = (authToken, userId) => async dispatch => {
  try {
    const config = {headers: {'Authorization': authToken}}
    await axios.post(`/api/v1/users/${userId}/friend_request`, {}, config);
    dispatch(getprofile(authToken));
  } catch (e) {
  }
};

export const acceptFriendRequest = (authToken, userId) => async dispatch => {
  try {
    const config = {headers: {'Authorization': authToken}}
    await axios.post(`/api/v1/users/${userId}/accept_friend_request`, {}, config);
    dispatch(getprofile(authToken));
  } catch (e) {
  }
};

export const unfriendRequest = (authToken, userId) => async dispatch => {
  try {
    const config = {headers: {'Authorization': authToken}}
    await axios.post(`/api/v1/users/${userId}/unfriend_request`, {}, config);
    dispatch(getprofile(authToken));
  } catch (e) {
  }
};

export const withdrawFriendRequest = (authToken, userId) => async dispatch => {
  try {
    const config = {headers: {'Authorization': authToken}}
    await axios.post(`/api/v1/users/${userId}/withdraw_friend_request`, {}, config);
    dispatch(getprofile(authToken));
  } catch (e) {
  }
};

export const getImageUrls = (authToken, keyword) => async dispatch => {
  try {
    const config = {headers: {'Authorization': authToken}}
    const imageUrls = await axios.get(`/api/v1/google_image_search?keyword=${keyword}`, config);
    dispatch({ type: types.IMAGE_URLS, payload: imageUrls.data });
  } catch (e) {
    const errorMessage = e.response.data.error;
    dispatch({ type: types.IMAGE_URLS_ERROR, payload: errorMessage });
  }
};

export const createlist = (formProps, authToken) => async dispatch => {
  try {
    const config = {headers: {'Authorization': authToken}}
    await axios.post('/api/v1/lists', formProps, config);
    dispatch(getprofile(authToken));
  } catch (e) {
  }
};

export const updateList = (id, formProps, authToken) => async dispatch => {
  try {
    const config = {headers: {'Authorization': authToken}}
    const response = await axios.patch(`/api/v1/lists/${id}`, formProps, config);
    dispatch({ type: types.GET_LIST, payload: response.data });
  } catch (e) {
  }
};

export const deleteList = (authToken, listId) => async dispatch => {
  try {
    const config = {headers: {'Authorization': authToken}}
    await axios.delete(`/api/v1/lists/${listId}`, config);
    dispatch(getprofile(authToken));
  } catch (e) {
  }
};

export const deleteItem = (authToken, item) => async dispatch => {
  try {
    const config = {headers: {'Authorization': authToken}}
    const response = await axios.delete(`/api/v1/items/${item.id}`, config);
    dispatch(getList(response.data.list.id, authToken));
  } catch (e) {
  }
};

export const getList = (listId, authToken) => async dispatch => {
  dispatch({ type: types.SET_LOADING, payload: true });
  try {
    const config = {headers: {'Authorization': authToken}}
    const response = await axios.get(`/api/v1/lists/${listId}`, config);
    dispatch({ type: types.GET_LIST, payload: response.data });
  } catch (e) {
  }
  dispatch({ type: types.SET_LOADING, payload: false });
};

export const itemFinder = (keyword, itemType, authToken) => async dispatch => {
  dispatch({ type: types.SET_LOADING, payload: true });
  try {
    const config = {headers: {'Authorization': authToken}}
    const response = await axios.get(`/api/v1/items/finder?keyword=${keyword}&item_type=${itemType}`, config);
    dispatch({ type: types.FIND_ITEMS, payload: response.data });
  } catch (e) {
    console.log(e);
  }
  dispatch({ type: types.SET_LOADING, payload: false });
};

export const itemDetails = (itemId, itemType, authToken) => async dispatch => {
  dispatch({ type: types.SET_LOADING, payload: true });
  try {
    const config = {headers: {'Authorization': authToken}}
    const response = await axios.get(`/api/v1/omdb/${itemId}`, config);
    dispatch({ type: types.GET_ITEM, payload: response.data });
  } catch (e) {
    console.log(e);
  }
  dispatch({ type: types.SET_LOADING, payload: false });
};

export const createItem = (listId, formProps, authToken) => async dispatch => {
  try {
    const config = {headers: {'Authorization': authToken}}
    formProps.list_id = listId
    await axios.post(`/api/v1/items`, formProps, config);
    dispatch(getList(listId, authToken));
  } catch (e) {
  }
};

export const updateUser = (formProps, userId, authToken) => async dispatch => {
  try {
    const config = {headers: {'Authorization': authToken}}
    await axios.patch(`/api/v1/users/${userId}`, formProps, config);
  } catch (e) {
  }
};

export const followList = (listId, authToken) => async dispatch => {
  try {
    const config = {headers: {'Authorization': authToken}}
    await axios.post(`/api/v1/lists/${listId}/follow`, {}, config);
    dispatch({ type: types.FOLLOW_LIST_OK, payload: 'Successfully followed list' });
    dispatch(getprofile(authToken));
  } catch (e) {
    dispatch({ type: types.FOLLOW_LIST_ERROR, payload: 'Already following list' });
  }
};

export const unfollowList = (listId, authToken) => async dispatch => {
  try {
    const config = {headers: {'Authorization': authToken}}
    await axios.post(`/api/v1/lists/${listId}/unfollow`, {}, config);
    dispatch({ type: types.FOLLOW_LIST_OK, payload: 'Successfully unfollowed list' });
    dispatch(getprofile(authToken));
  } catch (e) {
    dispatch({ type: types.FOLLOW_LIST_ERROR, payload: 'Failed unfollowing list' });
  }
};

export const getFollowedList = (listId, authToken) => async dispatch => {
  dispatch({ type: types.SET_LOADING, payload: true });
  try {
    const config = {headers: {'Authorization': authToken}}
    const response = await axios.get(`/api/v1/user_followed_lists/${listId}`, config);
    dispatch({ type: types.GET_LIST, payload: response.data });
  } catch (e) {
  }
  dispatch({ type: types.SET_LOADING, payload: false });
};

export const getFollowedLists = (listId, authToken) => async dispatch => {
  dispatch({ type: types.SET_LOADING, payload: true });
  try {
    const config = {headers: {'Authorization': authToken}}
    const response = await axios.get(`/api/v1/user_followed_lists/${listId}`, config);
    dispatch({ type: types.GET_LIST, payload: response.data });
  } catch (e) {
  }
  dispatch({ type: types.SET_LOADING, payload: false });
};