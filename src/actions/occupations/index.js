import occupationsApi from '../../api/occupations';
import * as OccupationsAC from './actionCreators';
import * as MetaAC from '../meta/actionCreators';

export const loadOccupations = () => (dispatch) => {
  dispatch(MetaAC.syncOperationLoading());
  occupationsApi.getOccupations()
    .then((result) => {
      const occupations = result.data;
      dispatch(OccupationsAC.fetchOccupations(occupations));
      dispatch(MetaAC.syncOperationFinished(result));
    })
    .catch((error) => {
      console.log(error);
    });
};