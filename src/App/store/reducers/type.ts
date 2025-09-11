export type IActionType = {
  type: string;
  payload?: any;
};

export type ICar = {
  id: number;
  name: string;
  color: string;
  position?: number;
};

export interface IEngineState {
  status: 'started' | 'stopped' | 'drive';
  velocity: number;
  distance: number;
}

export interface IGarageState {
  cars: ICar[];
  engines: Record<number, IEngineState>;
  selectedCar: ICar | null;
  isScreenSet: boolean;
  positions?: Record<number, number>;
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

export type IWinnerCar = {
  id: number;
  name: string;
  wins: number;
  bestTime: number;
  color: string;
};
