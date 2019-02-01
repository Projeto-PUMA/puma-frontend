import PumaApi from './puma';

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
};
