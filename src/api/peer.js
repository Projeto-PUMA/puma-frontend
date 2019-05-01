import PumaApi from './puma';

export default {
  getPeers: () => PumaApi.get(`/competencia`),

  postPeer: (title, description, referral) => {
    const data = {
      competencia_categoria_id: referral === null ? null : 1,
      competencia_pai_id: referral,
      nome: title,
      descricao: description,
    };
    return PumaApi.post('/competencia', data);
  },

  deletePeer: id => PumaApi.delete(`/competencia/${id}`),
};
