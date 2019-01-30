export const fetchNews = news => ({
  type: 'FETCH_NEWS',
  news,
});

export const getNews = news_by_id => ({
  type: 'GET_NEWS',
  news_by_id,
});