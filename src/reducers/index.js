import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import profile from './profile';
import users from './users';
import google_image_search from './google_image_search';
import dashboard from './dashboard';
import lists from './lists';
import items from './items';
import loading from './loading';
import followed_lists from './followed_lists';

export default combineReducers({
  auth,
  profile: profile,
  form: formReducer,
  users: users,
  google_image_search: google_image_search,
  dashboard: dashboard,
  lists: lists,
  items: items,
  followed_lists: followed_lists,
  loading: loading
});