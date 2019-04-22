import { browserHistory } from 'react-router';
import userApi from '../../api/user';
import * as UserAC from './actionCreators';
import * as MetaAC from '../meta/actionCreators';

export const createUser = (name, email, password, cpf, scholarity, cep, state, city, neighborhood, street, number, addendum, address_category_id, occupation_id, phone) => (dispatch) => {
  dispatch(MetaAC.syncOperationLoading());
  const thenCallback = (result) => {
    if (result.status === 200) {
      browserHistory.push({
        pathname: '/confirmacao',
        state: {
          email: result.data.email,
        },
      });
    } else if (result.status === 400) {
      alert('Erro ao cadastrar! CPF já cadastrado ou e-mail já cadastrado.');
    }
    dispatch(MetaAC.syncOperationFinished(result));
  };

  const catchCallback = (error) => {
    alert('Erro ao cadastrar! CPF já cadastrado.');
    dispatch(MetaAC.syncOperationFinished(error));
    console.log('create user error: ', error);
  };

  userApi.postUser(name, email, password, cpf, scholarity, cep, state, city, neighborhood, street, number, addendum, address_category_id, occupation_id, phone)
    .then(thenCallback)
    .catch(catchCallback);
};

export const setUser = (user) => (dispatch) => {
  dispatch(MetaAC.syncOperationLoading());
  userApi.login(user)
    .then((result) => {
      if (result.status === 200) {
        localStorage.setItem('currentUser', JSON.stringify({ token: result.data.token }));
        dispatch(UserAC.setUser(result.data));
        dispatch(MetaAC.syncOperationFinished(result));
        browserHistory.push('/submeterprojeto');
      } else {
        dispatch(MetaAC.syncOperationFinished(result.data.error));
        console.log('login error: ', result.data);
        alert(result.data.error === 'Not Found' ? 'CPF não encontrado!' : result.data.error);
      }
    })
    .catch((error) => {
      dispatch(MetaAC.syncOperationFinished(error));
      alert('CPF ou senha incorreto!');
      console.log('login error: ', error);
    });
};

export const tokenConfirm = (token) => (dispatch) => {
  dispatch(MetaAC.syncOperationLoading());
  userApi.confirmation(token)
    .then((result) => {
      if (result.status === 200) {
        dispatch(MetaAC.syncOperationFinished(result));
      } else {
        console.log('confirmation error: ', result.error);
        dispatch(MetaAC.syncOperationFinished(result));
        alert(result.error);
      }
    })
    .catch((error) => {
      dispatch(MetaAC.syncOperationFinished(error));
      console.log('confirmation error: ', error);
    });
};

export const loadUsers = (token) => (dispatch) => {
  dispatch(MetaAC.syncOperationLoading());
  userApi.getUsers(token)
    .then((result) => {
      if (result.status === 200) {
        const users = result.data;
        dispatch(UserAC.fetchUsers(users));
      }
      dispatch(MetaAC.syncOperationFinished(result));
    })
    .catch((error) => {
      console.log(error);
      alert('Ocorreu um erro ao carregar os usuários!');
      dispatch(MetaAC.syncOperationFinished(error));
    });
};

export const loadUserById = (id, token) => (dispatch) => {
  dispatch(MetaAC.syncOperationLoading());
  userApi.getUserById(id, token)
    .then((result) => {
      if (result.status === 200) {
        const user_by_id = result.data;
        dispatch(UserAC.fetchUserById(user_by_id));
      }
      dispatch(MetaAC.syncOperationFinished(result));
    })
    .catch((error) => {
      console.log(error);
      alert('Ocorreu um erro ao carregar o usuário!');
      dispatch(MetaAC.syncOperationFinished(error));
    });
};

export const updateUser = (id, user_by_id, token) => (dispatch) => {
  dispatch(MetaAC.syncOperationLoading());
  userApi.updateUser(id, user_by_id, token)
      .then((result) => {
        if(result.status >= 200 && result.status <= 300) {
          alert('Usuário atualizado com sucesso!');
        }
        dispatch(MetaAC.syncOperationFinished(result));
        dispatch(loadUsers());
      })
      .catch((error) => {
        alert('Ocorreu um erro ao atualizar o usuário!');
        console.log('update user error: ', error);
        dispatch(MetaAC.syncOperationFinished(error));
      });
}
