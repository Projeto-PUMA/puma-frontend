import * as jwt_decode from 'jwt-decode';

export const tokenInfo = () => {
  try {
    return jwt_decode(token());
  }
  catch(Error){
    return null;
  }
}

export const token = () => {
  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
  var token = currentUser && currentUser.token;

  return token;
}

export const auth = {
  headers: { 'Authorization': 'Bearer ' + token() },
};