export type IActionType = {
  type: string;
  payload?: any;
};

export type ICar = {
  id?: number;
  name: string;
  color: string;
  position?: number;
};


export interface IGarageState {
  cars: ICar[];
}
