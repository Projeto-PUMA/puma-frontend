import { combineReducers } from 'redux';

import projects from './projects';
import project_by_id from './project';

const project = combineReducers({
  projects,
  project_by_id,
});

export default project;
