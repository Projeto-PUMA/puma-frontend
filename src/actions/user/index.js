// import { browserHistory } from 'react-router';
import userApi from '../../api/user';
// import * as UserAC from './actionCreators';
import * as SyncOperationAC from '../meta/actionCreators';
import { browserHistory } from 'react-router';

export const createUser = (name, email, password, cpf, scholarity, cep, state, city, neighborhood, street, number, addendum, address_category_id, occupation_id, phone) => (dispatch) => {
  const thenCallback = (result) => {
    dispatch(SyncOperationAC.syncOperationFinished(result));
    console.log(    dispatch(SyncOperationAC.syncOperationFinished(result))    )
    // dispatch(loadNews());
    // browserHistory.push('/gerenciarnoticias');
    if (result.status === 200) {
      alert('Usuário cadastrado com sucesso!');
      browserHistory.push('/login');
    }
  };

  const catchCallback = (error) => {
    alert("Erro ao cadastrar! CPF já cadastrado.");
    console.log('create user error: ', error);
    dispatch(SyncOperationAC.syncOperationFinished(error));
  };

  dispatch(SyncOperationAC.syncOperationLoading());
  userApi.postUser(name, email, password, cpf, scholarity, cep, state, city, neighborhood, street, number, addendum, address_category_id, occupation_id, phone)
    .then(thenCallback)
    .catch(catchCallback);
};