const user = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      if (action.user === null || action.user === 0) {
        return state;
      }
      return action.user;

    default:
      return state;
  }
};

export default user;
