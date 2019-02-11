const project_by_id = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_PROJECT_BY_ID':
      if (action.project_by_id === null) return null;
      if (action.project_by_id.status === 0) return state;
      return action.project_by_id;

    default:
      return state;
  }
};

export default project_by_id;
