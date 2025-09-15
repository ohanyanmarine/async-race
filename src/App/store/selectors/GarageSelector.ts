import { RootState } from '../reducers';
import { ICar, ICurrentState, IEngineState } from '../reducers/type';

export const carsSelector = (state: RootState): ICar[] => state.garage.cars;

export const engineSelector = (state: RootState): Record<number, IEngineState> =>
  state.garage.engines;

export const selectedCarSelector = (state: RootState): ICar | null => state.garage.selectedCar;

export const positionsSelector = (state: RootState): Record<number, number> | undefined =>
  state.garage.positions;

export const currentStateSelector = (state: RootState): ICurrentState => state.garage.currentState;
