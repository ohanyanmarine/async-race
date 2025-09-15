import { takeEvery, call, put } from 'redux-saga/effects';
import { GarageTypes } from '../types/GarageTypes';
import { setCarAction, setCarsAction, setEngineStateAction } from '../actions/GarageActions';
import {
  addCarRequest,
  deleteCarRequest,
  getCarRequest,
  getCarsRequest,
  switchEngineRequest,
  updateCarRequest,
} from '../../services/routes/garage';
import { IActionType, ICar } from '../reducers/type';

function* getCars(): Generator {
  try {
    const carsResult: ICar[] = (yield call(getCarsRequest)) as ICar[];
    yield put(setCarsAction(carsResult ?? []));
  } catch (error) {
    console.error('Saga error in getCars:', error);
    yield put(setCarsAction([]));
  }
}

function* getCar(action: IActionType): Generator {
  try {
    const { id } = action.payload;
    const carResult: ICar = (yield call(getCarRequest, id)) as ICar;
    yield put(setCarAction(carResult ?? {}));
  } catch (error) {
    console.error('Saga error in getCars:', error);
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

function* updateCar(action: IActionType) {
  try {
    yield call(updateCarRequest, action.payload.id, action.payload.data);
    const carsResult: ICar[] = yield call(getCarsRequest);
    yield put(setCarsAction(carsResult ?? []));
  } catch (error) {
    console.error('Saga error in updateCar:', error);
  }
}

function* deleteCar(action: IActionType): Generator {
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

    yield call(switchEngineRequest, id, 'drive');

    yield put(
      setEngineStateAction(id, {
        status: 'drive',
        velocity,
        distance,
      }),
    );
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

function* driveEngine(action: { type: string; payload: { id: number } }) {
  const { id } = action.payload;
  try {
    const { velocity, distance } = yield call(switchEngineRequest, id, 'drive');
    yield put(
      setEngineStateAction(id, {
        status: 'drive',
        velocity,
        distance,
      }),
    );
  } catch (error) {
    console.error('Saga error in driveEngine:', error);
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
  yield takeEvery(GarageTypes.DRIVE_ENGINE, driveEngine);
}
