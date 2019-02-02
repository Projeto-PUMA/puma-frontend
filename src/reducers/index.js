import { combineReducers } from 'redux';
import news from './news';
import projects from './projects';
import occupations from './occupations';
import meta from './meta/index';

export default combineReducers({
  news,
  projects,
  occupations,
  meta,
});
