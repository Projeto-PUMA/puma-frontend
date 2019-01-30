export const fetchNews = news => ({
  type: 'FETCH_NEWS',
  news,
});

export const fetchAllNews = allNews => ({
  type: 'FETCH_ALL_NEWS',
  allNews,
});
