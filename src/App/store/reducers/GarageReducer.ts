import { GarageTypes } from '../types/GarageTypes';
import { IActionType, IGarageState } from './type';

const INIT_STATE: IGarageState = {
  cars: [],
  engines: {},
  selectedCar: null,
  isScreenSet: true,
  positions: {},
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

    case GarageTypes.SET_ENGINE_STATE:
      return {
        ...state,
        engines: {
          ...state.engines,
          [action.payload.carId]: action.payload.engine,
        },
      };
    case GarageTypes.SET_CAR:
      return {
        ...state,
        selectedCar: action.payload,
      };
    case GarageTypes.SET_SCREEN_STATE:
      return {
        ...state,
        isScreenSet: action.payload,
      };
    case GarageTypes.SET_CAR_POSITION:
      return {
        ...state,
        positions: {
          ...state.positions,
          [action.payload.carId]: action.payload.position,
        },
      };

    default:
      return state;
  }
};

export default garageReducer;
