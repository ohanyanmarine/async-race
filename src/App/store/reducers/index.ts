import { combineReducers } from 'redux';
import garageReducer from './GarageReducer';
import winnerReducer from './WinnerReducer';

const rootReducer = combineReducers({
  garage: garageReducer,
  winners: winnerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
