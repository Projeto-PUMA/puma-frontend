import { combineReducers } from 'redux';

import projects from './projects';
import project_by_id from './project';
import my_projects from './myProjects';

const project = combineReducers({
  projects,
  project_by_id,
  my_projects,
});

export default project;
