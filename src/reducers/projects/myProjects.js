const my_projects = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_MY_PROJECTS':
      if (action.my_projects === null || action.my_projects.status === 0) {
        return state;
      }
      return action.my_projects;

    default:
      return state;
  }
};

export default my_projects;
