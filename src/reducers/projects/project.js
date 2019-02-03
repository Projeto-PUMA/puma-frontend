const project_by_id = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_PROJECT_BY_ID':
      if (action.project_by_id === null || action.project_by_id.status === 0) {
        return state;
      }
      return action.project_by_id;

    default:
      return state;
  }
};

export default project_by_id;
