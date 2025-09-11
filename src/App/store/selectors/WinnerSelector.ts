import { RootState } from '../reducers';
import { IWinner, IWinnerCar } from '../reducers/type';

export const winnersSelector = (state: RootState): IWinner[] => state.winners.winners;

export const selectedWinnerSelector = (state: RootState): IWinnerCar | null =>
  state.winners.selectedWinner;
