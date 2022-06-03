import { Logger } from '@nestjs/common';
import { WebSocket } from 'ws';
// import { Websocket } from './models/websocket';

export type Trade = {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  a: number; // Aggregate trade ID
  p: string; // Price
  q: string; // Quantity
  f: number; // First trade ID
  l: number; // Last trade ID
  T: number; // Trade time
  m: boolean; // Is the buyer the market maker?
  M: boolean; // Ignore
};

export type CombinedStreams<T> = {
  stream: string;
  data: T;
};

export type Kline = {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol
  k: KlineInfo;
};

type KlineInfo = {
  t: number; // Kline start time
  T: number; // Kline close time
  s: string; // Symbol
  i: string; // Interval
  f: number; // First trade ID
  L: number; // Last trade ID
  o: string; // Open price
  c: string; // Close price
  h: string; // High price
  l: string; // Low price
  v: string; // Base asset volume
  n: number; // Number of trades
  x: boolean; // Is this kline closed?
  q: string; // Quote asset volume
  V: string; // Taker buy base asset volume
  Q: string; // Taker buy quote asset volume
  B: string; // Ignore
};

export type ExchangeInfoOptions = {
  symbol?: string;
  symbols?: string[];
};

export type BookTicker = {
  symbol: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
};

export type ApiBaseType = {
  apiKey?: string;
  apiSecret?: string;
  baseURL?: string;
  logger?: Logger;
};

export type WsRef = {
  closeInitiated: boolean;
  ws: WebSocket;
};

export type WebsocketCallbacks = {
  [event: string]: () => void;
};

export type WebsocketType = {
  wsURL: string;
  reconnectDelay: number;
  aggTradeWS: (symbol: string, callbacks: WebsocketCallbacks) => WsRef;
  tradeWS: (symbol: string, callbacks: WebsocketCallbacks) => WsRef;
  klineWS: (
    symbol: string,
    interval: string,
    callbacks: WebsocketCallbacks,
  ) => WsRef;
  miniTickerWS: (symbol: string, callbacks: WebsocketCallbacks) => WsRef;
  tickerWS: (symbol: string, callbacks: WebsocketCallbacks) => WsRef;
  bookTickerWS: (symbol: string, callbacks: WebsocketCallbacks) => WsRef;
  partialBookDepth: (
    symbol: string,
    levels: string,
    speed: string,
    callbacks: WebsocketCallbacks,
  ) => WsRef;
  diffBookDepth: (
    symbol: string,
    speed: string,
    callbacks: WebsocketCallbacks,
  ) => WsRef;
  userData: (listenKey: string, callbacks: WebsocketCallbacks) => WsRef;
  combinedStreams: (streams: [string], callbacks: WebsocketCallbacks) => WsRef;
};

export type BinanceApiType = WebsocketType;

export type ApiOptions = {
  apiKey?: string;
  apiSecret?: string;
  baseURL?: string;
  logger: Logger;
};

export enum OrderSide {
  SELL = 'SELL',
  BUY = 'BUY',
}

export enum OrderType {
  LIMIT = 'LIMIT',
  MARKET = 'MARKET',
  STOP_LOSS = 'STOP_LOSS',
  STOP_LOSS_LIMIT = 'STOP_LOSS_LIMIT',
  TAKE_PROFIT = 'TAKE_PROFIT',
  TAKE_PROFIT_LIMIT = 'TAKE_PROFIT_LIMIT',
  LIMIT_MAKER = 'LIMIT_MAKER',
}

export enum TimeInForce {
  GTC = 'GTC',
}

export enum NeworderResType {
  ACK = 'ACK',
  RESULT = 'RESULT',
  FULL = 'FULL',
}

export type NewOrderOptions = {
  timeInForce?: TimeInForce;
  quantity?: number;
  quoteOrderQty?: number;
  price?: number;
  newClientOrderId?: string;
  stopPrice?: number;
  icebergQty?: number;
  newOrderRespType?: NeworderResType;
  recvWindow?: number;
  timestamp: number;
};

export type CancelOrderOptions = {
  orderId?: number;
  origClientOrderId?: string;
  newClientOrderId?: string;
  recvWindow?: number;
};

export type CancelAllOrdersOptions = {
  recvWindow: number;
};
