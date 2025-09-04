import { ICar } from '../reducers/type';
import { GarageTypes } from '../types/GarageTypes';

export const getCarsAction = () => ({
  type: GarageTypes.GET_CARS,
});

export const setCarsAction = (cars: ICar[]) => ({
  type: GarageTypes.SET_CARS,
  payload: cars,
});

export const addCarAction = (car: ICar) => ({
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
