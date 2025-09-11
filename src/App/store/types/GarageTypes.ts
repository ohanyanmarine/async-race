export const GarageTypes = {
  GET_CARS: '@GarageTypes/GET_CARS',
  SET_CARS: '@GarageTypes/SET_CARS',
  GET_CAR: '@GarageTypes/GET_CAR',
  SET_CAR: '@GarageTypes/SET_CAR',
  ADD_CAR: '@GarageTypes/ADD_CAR',
  UPDATE_CAR: '@GarageTypes/UPDATE_CAR',
  DELETE_CAR: '@GarageTypes/DELETE_CAR',
  START_ENGINE: '@GarageTypes/START_ENGINE',
  STOP_ENGINE: '@GarageTypes/STOP_ENGINE',
  DRIVE_ENGINE: '@GarageTypes/DRIVE_ENGINE',
  SET_ENGINE_STATE: '@GarageTypes/SET_ENGINE_STATE',
  SET_SCREEN_STATE: '@GarageTypes/SET_SCREEN_STATE',
  GET_SCREEN_STATE: '@GarageTypes/GET_SCREEN_STATE',
  SET_CAR_POSITION: '@GarageTypes/SET_CAR_POSITION',
} as const;

export type GarageActionKeys = keyof typeof GarageTypes;
