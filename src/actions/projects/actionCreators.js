export const fetchProjects = projects => ({
  type: 'FETCH_PROJECTS',
  projects,
});

export const fetchProjectById = project_by_id => ({
  type: 'FETCH_PROJECT_BY_ID',
  project_by_id,
});