export const setUser = user => ({
  type: 'SET_USER',
  user,
});

export const fetchUsers = users => ({
  type: 'FETCH_USERS',
  users,
});

export const fetchUserById = user_by_id => ({
  type: 'FETCH_USER_BY_ID',
  user_by_id,
});