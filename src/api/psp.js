import PumaApi from "./puma";

export default {
  getPSPs: () => PumaApi.get(`/psp`),

  postPSP: (name, description, referral) => {
    const data = {
      psp_pai_id: referral,
      nome: name,
      descricao: description
    };
    return PumaApi.post("/psp", data);
  },

  deletePSP: id => PumaApi.delete(`/psp/${id}`)
};
