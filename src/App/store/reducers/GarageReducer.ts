import { GarageTypes } from '../types/GarageTypes';
import { IActionType, IGarageState } from './type';

const INIT_STATE: IGarageState = {
  cars: [],
};

const garageReducer = (state: IGarageState | undefined, action: IActionType): IGarageState => {
  if (state === undefined) {
    return INIT_STATE;
  }
  switch (action.type) {
    case GarageTypes.SET_CARS:
      return { ...state, cars: action.payload };

    case GarageTypes.ADD_CAR:
      return { ...state, cars: [...state.cars, action.payload] };

    default:
      return state;
  }
};

export default garageReducer;
