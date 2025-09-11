export const WinnerTypes = {
  GET_WINNERS: '@WinnerTypes/GET_WINNERS',
  SET_WINNERS: '@WinnerTypes/SET_WINNERS',
  GET_WINNER: '@WinnerTypes/GET_WINNER',
  SET_WINNER: '@WinnerTypes/SET_WINNER',
  ADD_WINNER: '@GarageTypes/ADD_WINNER',
  UPDATE_WINNER: '@GarageTypes/UPDATE_WINNER',
  DELETE_WINNER: '@GarageTypes/DELETE_WINNER',
} as const;

export type WinnerActionKeys = keyof typeof WinnerTypes;
