import { all } from 'redux-saga/effects';
import watchGarageSaga from './GarageSaga';

function* rootSaga() {
  yield all([watchGarageSaga()]);
}

export default rootSaga;
