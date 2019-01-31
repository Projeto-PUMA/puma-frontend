import { combineReducers } from 'redux';
import news from './news';
import occupations from './occupations';
import syncOperation from './meta';

export default combineReducers({
  news,
  occupations,
  syncOperation,
});
