export const fetchProjects = projects => ({
  type: 'FETCH_PROJECTS',
  projects,
});

export const fetchProjectById = project_by_id => ({
  type: 'FETCH_PROJECT_BY_ID',
  project_by_id,
});

export const fetchMyProjects = my_projects => ({
  type: 'FETCH_MY_PROJECTS',
  my_projects,
});