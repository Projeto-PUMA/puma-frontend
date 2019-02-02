import { combineReducers } from 'redux';
import news from './news';
import projects from './projects';
import occupations from './occupations';
import syncOperation from './meta';

export default combineReducers({
  news,
  projects,
  occupations,
  syncOperation,
});
