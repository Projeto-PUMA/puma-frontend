import occupationsApi from '../../api/occupations';
import * as OccupationsAC from './actionCreators';
import * as SyncOperationAC from '../meta/actionCreators';

export const loadOccupations = () => (dispatch) => {
  dispatch(SyncOperationAC.syncOperationLoading());
  occupationsApi.getOccupations()
    .then((result) => {
      const occupations = result.data;
      dispatch(OccupationsAC.fetchOccupations(occupations));
      dispatch(SyncOperationAC.syncOperationFinished(result));
    })
    .catch((error) => {
      console.log(error);
    });
};