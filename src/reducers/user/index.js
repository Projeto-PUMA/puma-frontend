const user = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      if (action.user === null || action.user === 0) {
        return state;
      }
      return action.user;

      case 'FETCH_USERS':
      if (action.users === null || action.users === 0) {
        return state;
      }
      return action.users;

    default:
      return state;
  }
};

export default user;
