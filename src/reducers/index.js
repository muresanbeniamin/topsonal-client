import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import profile from './profile';
import users from './users';
import google_search from './google_search';
import dashboard from './dashboard';
import lists from './lists';
import items from './items';

export default combineReducers({
  auth,
  profile: profile,
  form: formReducer,
  users: users,
  google_search: google_search,
  dashboard: dashboard,
  lists: lists,
  items: items
});