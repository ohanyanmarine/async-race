import { ICar, IEngineState } from '../reducers/type';
import { GarageTypes } from '../types/GarageTypes';

export const getCarsAction = () => ({
  type: GarageTypes.GET_CARS,
});

export const setCarsAction = (cars: ICar[]) => ({
  type: GarageTypes.SET_CARS,
  payload: cars,
});

export const getCarAction = (id: number) => ({
  type: GarageTypes.GET_CAR,
  payload: { id },
});

export const setCarAction = (car: ICar) => ({
  type: GarageTypes.SET_CAR,
  payload: car,
});

export const addCarAction = (car: { name: string; color: string }) => ({
  type: GarageTypes.ADD_CAR,
  payload: car,
});

export const updateCarAction = (id: number, data: { name: string; color: string }) => ({
  type: GarageTypes.UPDATE_CAR,
  payload: { id, data },
});

export const deleteCarAction = (id: number) => ({
  type: GarageTypes.DELETE_CAR,
  payload: { id },
});

export const setEngineStateAction = (carId: number, engine: IEngineState) => ({
  type: GarageTypes.SET_ENGINE_STATE,
  payload: { carId, engine },
});

export const startEngineAction = (id: number) => ({
  type: GarageTypes.START_ENGINE,
  payload: { id },
});

export const stopEngineAction = (id: number) => ({
  type: GarageTypes.STOP_ENGINE,
  payload: { id },
});

export const driveEngineAction = (id: number) => ({
  type: GarageTypes.DRIVE_ENGINE,
  payload: { id },
});

export const setScreenStateAction = (isScreenSet: boolean) => ({
  type: GarageTypes.SET_SCREEN_STATE,
  payload: isScreenSet,
});

export const getScreenStateAction = () => ({
  type: GarageTypes.GET_SCREEN_STATE,
});

export const setCarPositionAction = (carId: number, position: number) => ({
  type: GarageTypes.SET_CAR_POSITION,
  payload: { carId, position },
});
