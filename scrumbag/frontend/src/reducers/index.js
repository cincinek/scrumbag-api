import { combineReducers } from 'redux';

import errors from './errors';
import messages from './messages';
import auth from './auth';
import boards from './boards'

export default combineReducers({
  errors,
  messages,
  auth,
  boards
});
