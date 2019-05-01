const peers = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_PEERS':
      return action.peers ? Object.values(action.peers) : null;

    default:
      return state;
  }
};

export default peers;
