import PumaApi from './puma';

export default {
  getNews: () => PumaApi.get(`/blog/listAll`),
};
