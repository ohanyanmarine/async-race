import { RootState } from '../reducers';

const carsSelector = (state: RootState) => state.garage.cars;

export default carsSelector;
