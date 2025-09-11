import { IWinner, IWinnerCar } from '../reducers/type';
import { WinnerTypes } from '../types/WinnerTypes';

export const getWinnersAction = () => ({
  type: WinnerTypes.GET_WINNERS,
});

export const setWinnersAction = (winners: IWinner[]) => ({
  type: WinnerTypes.SET_WINNERS,
  payload: winners,
});

export const getWinnerAction = (id: number) => ({
  type: WinnerTypes.GET_WINNER,
  payload: { id },
});

export const setWinnerAction = (winner: IWinnerCar) => ({
  type: WinnerTypes.SET_WINNER,
  payload: winner,
});

export const addWinnerAction = (winner: IWinner) => ({
  type: WinnerTypes.ADD_WINNER,
  payload: winner,
});

export const updateWinnerAction = (winner: IWinner) => ({
  type: WinnerTypes.UPDATE_WINNER,
  payload: winner,
});

export const deleteWinnerAction = (id: number) => ({
  type: WinnerTypes.DELETE_WINNER,
  payload: { id },
});
