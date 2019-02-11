import { combineReducers } from 'redux';

import syncOperation from './syncOperation';

const meta = combineReducers({
  syncOperation,
});

export default meta;
