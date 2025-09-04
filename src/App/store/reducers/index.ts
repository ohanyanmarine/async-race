import { combineReducers } from 'redux';
import garageReducer from './GarageReducer';

const rootReducer = combineReducers({
  garage: garageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
