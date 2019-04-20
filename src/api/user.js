import PumaApi from './puma';
import { authToken } from '../helpers/token';

export default {
  postUser: (name, email, password, cpf, scholarity, cep, state, city, neighborhood, street, number, addendum, address_category_id, occupation_id, phone) => {
    const data = {
      nome: name,
      email,
      senha: password,
      cpf,
      escolaridade: scholarity,
      endereco: {
        cep,
        estado: state,
        cidade: city,
        bairro: neighborhood,
        rua: street,
        numero: number,
        complemento: addendum,
        endereco_categoria_id: address_category_id,
      },
      profissao_id: occupation_id,
      telefone: {
        telefone: phone,
      },
    };
    return PumaApi.post('/usuario', data);
  },
  
  getUsers: (token) => {
    return PumaApi.get(`/usuario`, authToken(token));
  },

  getUserById: (id, token) => {
    return PumaApi.get(`/usuario/${id}`, authToken(token));
  },

  updateUser: (user, token) => {
    console.log("%o",user)
    return PumaApi.patch(`/usuario/${user.id}`,user, authToken(token));
  },

  login: (user) => PumaApi.post('/auth/login', user),

  confirmation: (token) => PumaApi.get(`/auth/tokenConfirmacao/${token}`),
};
