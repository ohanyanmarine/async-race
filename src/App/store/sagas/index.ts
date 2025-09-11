import { all } from 'redux-saga/effects';
import watchGarageSaga from './GarageSaga';
import watchWinnerSaga from './WinnerSaga';

function* rootSaga() {
  yield all([watchGarageSaga(), watchWinnerSaga()]);
}

export default rootSaga;
