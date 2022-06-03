export type Grid = {
  name: string;
  symbol: string;
  orderAmount?: number;
  hightLevel: number;
  lowLevel: number;
  gridsCount: number;
  lastTradePrice?: number;
  status?: GridStatus;
  stepValue?: number;
};

export enum GridStatus {
  ACTIVE,
  STOPED,
  OVER_LEVEL,
}

export type WorkGrid = {
  [key: string]: Grid;
};
