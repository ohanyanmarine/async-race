import { takeEvery, call, put } from 'redux-saga/effects';
import { GarageTypes } from '../types/GarageTypes';
import { setCarsAction, updateCarAction } from '../actions/GarageActions';
import {
  addCarRequest,
  deleteCarRequest,
  getCarsRequest,
  updateCarRequest,
} from '../../services/routes/garage';
import { ICar } from '../reducers/type';

function* getCars(): Generator {
  try {
    const carsResult: ICar[] = (yield call(getCarsRequest)) as ICar[];
    yield put(setCarsAction(carsResult ?? []));
  } catch (error) {
    console.error('Saga error in getCars:', error);
    yield put(setCarsAction([]));
  }
}

function* addCar(action: { type: string; payload: { name: string; color: string } }) {
  try {
    const newCar: ICar = yield call(addCarRequest, action.payload);
    const carsResult: ICar[] = yield call(getCarsRequest);
    yield put(setCarsAction(carsResult ?? []));
  } catch (error) {
    console.error('Saga error in addCar:', error);
  }
}

function* updateCar(action: ReturnType<typeof updateCarAction>) {
  try {
    const updatedCar: ICar = yield call(updateCarRequest, action.payload.id, action.payload.data);
    const carsResult: ICar[] = yield call(getCarsRequest);
    yield put(setCarsAction(carsResult ?? []));
  } catch (error) {
    console.error('Saga error in updateCar:', error);
  }
}

function* deleteCar(action: any): Generator {
  try {
    const { id } = action.payload;
    yield call(deleteCarRequest, id);
    const carsResult = (yield call(getCarsRequest)) as ICar[];
    yield put(setCarsAction(carsResult ?? []));
  } catch (error) {
    console.error('Saga error in deleteCar:', error);
  }
}

export default function* watchGarageSaga() {
  yield takeEvery(GarageTypes.GET_CARS, getCars);
  yield takeEvery(GarageTypes.ADD_CAR, addCar);
  yield takeEvery(GarageTypes.UPDATE_CAR, updateCar);
  yield takeEvery(GarageTypes.DELETE_CAR, deleteCar);
}
