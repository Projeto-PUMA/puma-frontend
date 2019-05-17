const psps = (state = [], action) => {
  switch (action.type) {
    case "LOAD_PSPS":
      return action.psps ? Object.values(action.psps) : null;

    default:
      return state;
  }
};

export default psps;
