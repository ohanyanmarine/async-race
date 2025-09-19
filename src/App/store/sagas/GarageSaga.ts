import { takeEvery, call, put } from 'redux-saga/effects';
import GarageTypes from '../types/GarageTypes';
import { setCarAction, setCarsAction, setEngineStateAction } from '../actions/GarageActions';
import {
  addCarRequest,
  deleteCarRequest,
  getCarRequest,
  getCarsRequest,
  switchEngineRequest,
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

function* getCar(action: { type: string; payload: { id: number } }): Generator {
  try {
    const { id } = action.payload;
    const carResult: ICar = (yield call(getCarRequest, id)) as ICar;
    yield put(setCarAction(carResult ?? ({} as ICar)));
  } catch (error) {
    console.error('Saga error in getCar:', error);
    yield put(setCarsAction([]));
  }
}

function* addCar(action: { type: string; payload: { name: string; color: string } }) {
  try {
    yield call(addCarRequest, action.payload);
    const carsResult: ICar[] = yield call(getCarsRequest);
    yield put(setCarsAction(carsResult ?? []));
  } catch (error) {
    console.error('Saga error in addCar:', error);
  }
}

function* updateCar(action: {
  type: string;
  payload: { id: number; data: { name: string; color: string } };
}): Generator {
  try {
    const { id, data } = action.payload;
    yield call(updateCarRequest, id, data);
    const carsResult: ICar[] = (yield call(getCarsRequest)) as ICar[];
    yield put(setCarsAction(carsResult ?? []));
  } catch (error) {
    console.error('Saga error in updateCar:', error);
  }
}

function* deleteCar(action: { type: string; payload: { id: number } }): Generator {
  try {
    const { id } = action.payload;
    yield call(deleteCarRequest, id);
    const carsResult = (yield call(getCarsRequest)) as ICar[];
    yield put(setCarsAction(carsResult ?? []));
  } catch (error) {
    console.error('Saga error in deleteCar:', error);
  }
}

function* startEngine(action: { type: string; payload: { id: number } }) {
  const { id } = action.payload;
  try {
    const { velocity, distance } = yield call(switchEngineRequest, id, 'started');

    yield put(
      setEngineStateAction(id, {
        status: 'started',
        velocity,
        distance,
      }),
    );
    if (velocity > 0) {
      yield call(switchEngineRequest, id, 'drive');
      yield put(
        setEngineStateAction(id, {
          status: 'drive',
          velocity,
          distance,
        }),
      );
    }
  } catch (error) {
    console.error('Saga error in startEngine:', error);
    yield put(
      setEngineStateAction(id, {
        status: 'stopped',
        velocity: 0,
        distance: 0,
      }),
    );
  }
}

function* stopEngine(action: { type: string; payload: { id: number } }) {
  const { id } = action.payload;
  try {
    yield call(switchEngineRequest, id, 'stopped');
    yield put(
      setEngineStateAction(id, {
        status: 'stopped',
        velocity: 0,
        distance: 0,
      }),
    );
  } catch (error) {
    console.error('Saga error in stopEngine:', error);
  }
}

export default function* watchGarageSaga() {
  yield takeEvery(GarageTypes.GET_CARS, getCars);
  yield takeEvery(GarageTypes.GET_CAR, getCar);
  yield takeEvery(GarageTypes.ADD_CAR, addCar);
  yield takeEvery(GarageTypes.UPDATE_CAR, updateCar);
  yield takeEvery(GarageTypes.DELETE_CAR, deleteCar);
  yield takeEvery(GarageTypes.START_ENGINE, startEngine);
  yield takeEvery(GarageTypes.STOP_ENGINE, stopEngine);
}
