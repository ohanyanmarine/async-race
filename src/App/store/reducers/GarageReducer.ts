import { GarageTypes } from '../types/GarageTypes';
import { IActionType, IGarageState } from './type';

const INIT_STATE: IGarageState = {
  cars: [],
  engines: {},
  selectedCar: null,
  positions: {},
  currentState: {
    currentPage: 1,
    isRaceStart: false,
    isStart: {},
  },
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
    case GarageTypes.SET_CAR_POSITION:
      return {
        ...state,
        positions: {
          ...state.positions,
          [action.payload.carId]: action.payload.position,
        },
      };
    case GarageTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentState: {
          ...state.currentState,
          currentPage: action.payload,
        },
      };
    case GarageTypes.SET_IS_RACE_START:
      return {
        ...state,
        currentState: {
          ...state.currentState,
          isRaceStart: action.payload,
        },
      };
    case GarageTypes.SET_IS_START:
      return {
        ...state,
        currentState: {
          ...state.currentState,
          isStart: { ...state.currentState.isStart, [action.payload.id]: action.payload.value },
        },
      };

    default:
      return state;
  }
};

export default garageReducer;
