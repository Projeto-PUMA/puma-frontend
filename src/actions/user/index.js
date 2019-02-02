import userApi from '../../api/user';
import { browserHistory } from 'react-router';

export const createUser = (name, email, password, cpf, scholarity, cep, state, city, neighborhood, street, number, addendum, address_category_id, occupation_id, phone) => (dispatch) => {
  const thenCallback = (result) => {
    if (result.status === 200) {
      alert('Usuário cadastrado com sucesso!');
      browserHistory.push('/login');
    }
  };

  const catchCallback = (error) => {
    alert("Erro ao cadastrar! CPF já cadastrado.");
    console.log('create user error: ', error);
  };

  userApi.postUser(name, email, password, cpf, scholarity, cep, state, city, neighborhood, street, number, addendum, address_category_id, occupation_id, phone)
    .then(thenCallback)
    .catch(catchCallback);
};