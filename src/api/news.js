import PumaApi from './puma';

export default {
  getNews: () => PumaApi.get(`/sec/post/listAll`),
};
