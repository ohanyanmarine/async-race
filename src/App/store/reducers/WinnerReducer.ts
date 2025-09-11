import { WinnerTypes } from '../types/WinnerTypes';
import { IActionType, IWinnerState } from './type';

const INIT_STATE: IWinnerState = {
  winners: [],
  selectedWinner: null,
};

const winnerReducer = (state: IWinnerState | undefined, action: IActionType): IWinnerState => {
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
