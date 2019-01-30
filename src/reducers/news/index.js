const news = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_NEWS':
      console.log('FETCH_NEWS');
      if (action.news === null || action.news.status === 0) {
        return state;
      }
      console.log(action.news);
      return action.news;

    case 'GET_NEWS':
      console.log('GET_NEWS');
      if (action.news_by_id === null || action.news_by_id === 0) {
        return state;
      }
      console.log({
        ...state,
        news_by_id: action.news_by_id,
      });
      return {
        ...state,
        news_by_id: action.news_by_id,
      };

    default:
      return state;
  }
};

export default news;
