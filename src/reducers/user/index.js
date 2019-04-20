import { combineReducers } from 'redux';

import setUser from './setUser';
import user_by_id from './userById';
import users from './users';

const user = combineReducers({
  setUser,
  user_by_id,
  users,
});

export default user;
