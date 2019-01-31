const occupations = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_OCCUPATIONS':
      if (action.occupations === null || action.occupations.status === 0) {
        return state;
      }
      return action.occupations;

    default:
      return state;
  }
};

export default occupations;
