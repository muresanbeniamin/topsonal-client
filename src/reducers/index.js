import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import profile from './profile';
import users from './users';

export default combineReducers({
  auth,
  profile: profile,
  form: formReducer,
  users: users
});