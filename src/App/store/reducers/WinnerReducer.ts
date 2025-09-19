import WinnerTypes from '../types/WinnerTypes';
import { IWinner, IWinnerCar, IWinnerState } from './type';

const INIT_STATE: IWinnerState = {
  winners: [],
  selectedWinner: null,
};

type IWinnerAction =
  | { type: WinnerTypes.SET_WINNERS; payload: IWinner[] }
  | { type: WinnerTypes.ADD_WINNER; payload: IWinner }
  | { type: WinnerTypes.SET_WINNER; payload: IWinnerCar };

const winnerReducer = (state: IWinnerState | undefined, action: IWinnerAction): IWinnerState => {
  if (state === undefined) {
    return INIT_STATE;
  }
  switch (action.type) {
    case WinnerTypes.SET_WINNERS:
      return { ...state, winners: action.payload };

    case WinnerTypes.SET_WINNER:
      return {
        ...state,
        selectedWinner: action.payload,
      };

    case WinnerTypes.ADD_WINNER:
      return { ...state, winners: [...state.winners, action.payload] };

    default:
      return state;
  }
};

export default winnerReducer;
