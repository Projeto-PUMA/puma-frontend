import { combineReducers } from 'redux';
import news from './news';
import syncOperation from './meta';

export default combineReducers({
  news,
  syncOperation,
});
