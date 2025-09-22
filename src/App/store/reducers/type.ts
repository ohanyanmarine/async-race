export interface ICar {
  id: number;
  name: string;
  color: string;
  position?: number;
}

export interface IEngineState {
  status: 'started' | 'stopped' | 'drive';
  velocity: number;
  distance: number;
}

export interface ICurrentState {
  currentPage: number;
  isRaceStart?: boolean;
  isStart?: { [id: number]: boolean };
}

export interface IGarageState {
  cars: ICar[];
  engines: Record<number, IEngineState>;
  selectedCar: ICar | null;
  positions?: Record<number, number>;
  currentState: ICurrentState;
}

export interface IWinner {
  id: number;
  wins: number;
  time: number;
}

export interface IWinnerState {
  winners: IWinner[];
  selectedWinner: IWinnerCar | null;
}

export interface IWinnerCar {
  id: number;
  name: string;
  wins: number;
  bestTime: number;
  color: string;
}

export interface RaceResult {
  car: ICar;
  time: number;
}
