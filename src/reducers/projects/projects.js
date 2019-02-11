const projects = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_PROJECTS':
      if (action.projects === null || action.projects.status === 0) {
        return state;
      }
      return action.projects;

    default:
      return state;
  }
};

export default projects;
