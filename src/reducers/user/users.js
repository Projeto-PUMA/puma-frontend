const users = (state = null, action) => {
    switch (action.type) {
        case 'FETCH_USERS':
        if (action.users === null || action.users === 0) {
          return state;
        }
        return action.users;

      default:
        return state;
    }
  };
  
  export default users;
  