const news = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_NEWS':
      if (action.news === null || action.news.status === 0) {
        return state;
      }
      return action.news;

    default:
      return state;
  }
};

export default news;
