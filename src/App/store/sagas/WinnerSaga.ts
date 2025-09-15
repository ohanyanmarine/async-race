import { takeEvery, call, put } from 'redux-saga/effects';
import { IActionType, IWinner, IWinnerCar } from '../reducers/type';
import {
  addWinnerRequest,
  deleteWinnerRequest,
  getWinnerRequest,
  getWinnersRequest,
  updateWinnerRequest,
} from '../../services/routes/winners';
import { setWinnerAction, setWinnersAction } from '../actions/WinnerActions';
import { WinnerTypes } from '../types/WinnerTypes';

function* getWinners(): Generator {
  try {
    const winnersResult: IWinner[] = (yield call(getWinnersRequest)) as IWinner[];
    yield put(setWinnersAction(winnersResult ?? []));
  } catch (error) {
    console.error('Saga error in getWinners:', error);
    yield put(setWinnersAction([]));
  }
}

function* getWinner(action: IActionType): Generator {
  try {
    const { id } = action.payload;
    const winnerResult: IWinnerCar = (yield call(getWinnerRequest, id)) as IWinnerCar;
    yield put(setWinnerAction(winnerResult ?? {}));
  } catch (error) {
    console.error('Saga error in getCars:', error);
  }
}

function* addWinner(action: { type: string; payload: { id: number; wins: number; time: number } }) {
  try {
    yield call(addWinnerRequest, action.payload);
    const winnersResult: IWinner[] = yield call(getWinnersRequest);
    yield put(setWinnersAction(winnersResult ?? []));
  } catch (error) {
    console.error('Saga error in addWinner:', error);
  }
}

function* updateWinner(action: {
  type: string;
  payload: { id: number; wins: number; time: number };
}) {
  try {
    yield call(updateWinnerRequest, action.payload);
    const winnersResult: IWinner[] = yield call(getWinnersRequest);
    yield put(setWinnersAction(winnersResult ?? []));
  } catch (error) {
    console.error('Saga error in updateWinner:', error);
  }
}

function* deleteWinner(action: IActionType): Generator {
  try {
    const { id } = action.payload;
    yield call(deleteWinnerRequest, id);
    const winnersResult = (yield call(getWinnersRequest)) as IWinner[];
    yield put(setWinnersAction(winnersResult ?? []));
  } catch (error) {
    console.error('Saga error in deleteWinner:', error);
  }
}

export default function* watchWinnerSaga() {
  yield takeEvery(WinnerTypes.GET_WINNERS, getWinners);
  yield takeEvery(WinnerTypes.GET_WINNER, getWinner);
  yield takeEvery(WinnerTypes.ADD_WINNER, addWinner);
  yield takeEvery(WinnerTypes.UPDATE_WINNER, updateWinner);
  yield takeEvery(WinnerTypes.DELETE_WINNER, deleteWinner);
}
