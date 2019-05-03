const news = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_NEWS':
      if (action.news === null || action.news.status === 0) {
        return state;
      }
      return action.news;

    case 'GET_NEWS':
      if (action.news_by_id === null || action.news_by_id === 0) {
        return {
          ...state,
          news_by_id: null,
        };
      }
      return {
        ...state,
        news_by_id: action.news_by_id,
      };

    default:
      return state;
  }
};

export default news;
