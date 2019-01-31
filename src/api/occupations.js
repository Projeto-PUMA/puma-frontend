import PumaApi from './puma';

export default {
  getOccupations: () => PumaApi.get(`/profissao`),
};
