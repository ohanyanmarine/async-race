export const GarageTypes = {
  GET_CARS: '@GarageTypes/GET_CARS',
  SET_CARS: '@GarageTypes/SET_CARS',
  ADD_CAR: '@GarageTypes/ADD_CAR',
  UPDATE_CAR: '@GarageTypes/UPDATE_CAR',
  DELETE_CAR: '@GarageTypes/DELETE_CAR',
} as const;

export type GarageActionKeys = keyof typeof GarageTypes;
