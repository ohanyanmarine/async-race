import { RootState } from '../reducers';
import { IEngineState, ICar } from '../reducers/type';

export const carsSelector = (state: RootState): ICar[] => state.garage.cars;

export const engineSelector = (state: RootState) => state.garage.engines;

export const selectedCarSelector = (state: RootState): ICar | null => state.garage.selectedCar;

export const isScreenSetSelector = (state: RootState): boolean => state.garage.isScreenSet;

export const positionsSelector = (state: RootState) => state.garage.positions;
