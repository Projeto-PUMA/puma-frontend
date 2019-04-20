export const setUser = user => ({
  type: 'SET_USER',
  user,
});

export const fetchUsers = users => ({
  type: 'FETCH_USERS',
  users,
});
