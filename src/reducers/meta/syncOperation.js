const initialState = {
  isLoading: false,
  result: {},
};

const syncOperation = (state = initialState, action) => {
  switch (action.type) {
    case 'SYNC_OPERATION_LOADING':
      return {
        ...state,
        isLoading: true,
      };

    case 'SYNC_OPERATION_FINISHED':
      return {
        ...state,
        isLoading: false,
        result: action.result,
      };

    default:
      return state;
  }
};

export default syncOperation;
