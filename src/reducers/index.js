import { combineReducers } from 'redux';
import news from './news';
import project from './projects/index';
import occupations from './occupations';
import meta from './meta/index';

export default combineReducers({
  news,
  project,
  occupations,
  meta,
});
