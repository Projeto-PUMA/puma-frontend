import peerApi from '../../api/peer';
import * as PeerAC from './actionCreators';
import * as MetaAC from '../meta/actionCreators';

export const loadPeers = () => (dispatch) => {
  dispatch(MetaAC.syncOperationLoading());
  peerApi.getPeers()
    .then((result) => {
      if (result.status >= 200 && result.status <= 300) dispatch(PeerAC.loadPeers(result.data));
      if (result.status === 404) dispatch(PeerAC.loadPeers(null));
      dispatch(MetaAC.syncOperationFinished(result));
    })
    .catch((error) => {
      console.log(error);
      dispatch(MetaAC.syncOperationFinished(error));
    });
};

export const createPeer = (title, description, referral) => (dispatch) => {

  const thenCallback = (result) => {
    dispatch(MetaAC.syncOperationFinished(result));
    dispatch(loadPeers());
    if (result.status === 200) {
      alert('Competência criada com sucesso!');
    }
  };

  const catchCallback = (error) => {
    alert('Competência não cadastrada!');
    console.log('create peer error: ', error);
    dispatch(MetaAC.syncOperationFinished(error));
  };

  dispatch(MetaAC.syncOperationLoading());
  peerApi.postPeer(title, description, referral)
      .then(thenCallback)
      .catch(catchCallback);
};

export const deletePeer = id => dispatch =>
  peerApi.deletePeer(id)
    .then(result => {
      dispatch(loadPeers());
      if (result.status >= 200 && result.status <= 300) alert('Competência deletada');
    })
    .catch(error => console.log(error));