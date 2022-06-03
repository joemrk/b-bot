import { APIBase } from './APIBase.js';
import { flowRight } from './helpers/utils.js';
import { Market } from './models/market.js';
import { Trade } from './models/trade';
import { Websocket } from './models/websocket';
import { ApiOptions } from './types.js';

// export class BinanceApi_ extends flowRight(Websocket, Trade)(APIBase) {
//   constructor(apiKey = '', apiSecret = '', options) {
//     options.baseURL = options.baseURL || process.env.BINANCE_BASE_URL;
//     super({
//       apiKey,
//       apiSecret,
//       ...options,
//     });
//   }
// }

export class BinanceApi {
  options?;
  constructor(options: ApiOptions) {
    this.options = options;
    this.options.baseURL =
      process.env.BINANCE_BASE_URL || 'https://api.binance.com';
  }

  getWebsocket() {
    return new Websocket(this.options);
  }

  getTrade() {
    return new Trade(this.options);
  }

  getMarket() {
    return new Market(this.options);
  }
}
