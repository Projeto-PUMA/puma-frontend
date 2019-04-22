const user_by_id = (state = null, action) => {
    switch (action.type) {
        case 'FETCH_USER_BY_ID':
        if (action.user_by_id === null || action.user === 0) {
          return state;
        }
        return action.user_by_id;
  
      default:
        return state;
    }
  };
  
  export default user_by_id;
  