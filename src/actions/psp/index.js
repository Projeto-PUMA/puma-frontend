import pspApi from "../../api/psp";
import * as PspAC from "./actionCreators";
import * as MetaAC from "../meta/actionCreators";

export const loadPSPs = () => dispatch => {
  dispatch(MetaAC.syncOperationLoading());
  pspApi
    .getPSPs()
    .then(result => {
      if (result.status >= 200 && result.status <= 300)
        dispatch(PspAC.loadPSPs(result.data));
      if (result.status === 404) dispatch(PspAC.loadPSPs(null));
      dispatch(MetaAC.syncOperationFinished(result));
    })
    .catch(error => {
      console.log(error);
      dispatch(MetaAC.syncOperationFinished(error));
    });
};

export const createPSP = (title, description, referral) => dispatch => {
  const thenCallback = result => {
    dispatch(MetaAC.syncOperationFinished(result));
    dispatch(loadPSPs());
    if (result.status === 200) {
      alert("PSP criado com sucesso!");
    }
  };

  const catchCallback = error => {
    alert("PSP não cadastrado!");
    console.log("create psp error: ", error);
    dispatch(MetaAC.syncOperationFinished(error));
  };

  dispatch(MetaAC.syncOperationLoading());
  pspApi
    .postPSP(title, description, referral)
    .then(thenCallback)
    .catch(catchCallback);
};

export const deletePSP = id => dispatch =>
  pspApi
    .deletePSP(id)
    .then(result => {
      dispatch(loadPSPs());
      if (result.status >= 200 && result.status <= 300) alert("PSP deletado");
    })
    .catch(error => console.log(error));
