import * as WebSocket from 'ws';
import { validateRequiredParameters } from '../helpers/validation.js';
import { isEmptyValue } from '../helpers/utils.js';
import { APIBase } from '../APIBase.js';
import { NewOrderOptions } from '../types.js';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export class Websocket extends APIBase {
  wsURL?;
  reconnectDelay?;
  logger;

  constructor(options) {
    super(options);
    this.wsURL =
      process.env.BINANCE_WS_ENDPOINT || 'wss://stream.binance.com:9443';
    this.reconnectDelay = 5000;
    this.logger = options.logger;
  }

  subscribe(url, callbacks) {
    const wsRef = {
      closeInitiated: false,
      ws: null,
    };
    const initConnect = () => {
      const ws = new WebSocket(url);
      wsRef.ws = ws;
      Object.keys(callbacks).forEach((event) => {
        ws.on(event, callbacks[event]);
      });

      ws.on('ping', () => {
        this.logger.debug('Received ping from server');
        ws.pong();
      });

      ws.on('pong', () => {
        this.logger.debug('Received pong from server');
      });

      ws.on('error', (err) => {
        this.logger.error(err);
      });

      ws.on('close', (closeEventCode, reason) => {
        if (!wsRef.closeInitiated) {
          this.logger.error(
            `Connection close due to ${closeEventCode}: ${reason}.`,
          );
          setTimeout(() => {
            this.logger.debug('Reconnect to the server.');
            initConnect();
          }, this.reconnectDelay);
        } else {
          wsRef.closeInitiated = false;
        }
      });
    };
    this.logger.debug(url);
    initConnect();
    return wsRef;
  }

  unsubscribe(wsRef) {
    if (!wsRef || !wsRef.ws) this.logger.warn('No connection to close.');
    else {
      wsRef.closeInitiated = true;
      wsRef.ws.close();
    }
  }

  newOrderTest(symbol, side, type, options: NewOrderOptions) {
    validateRequiredParameters({ symbol, side, type });

    return this.signRequest(
      'POST',
      '/api/v3/order/test',
      Object.assign(options, {
        symbol: symbol.toUpperCase(),
        side: side.toUpperCase(),
        type: type.toUpperCase(),
      }),
    );
  }

  /**
   * Aggregate Trade Streams<br>
   *
   * The Aggregate Trade Streams push trade information that is aggregated for a single taker order.<br>
   *
   * Stream Name: &lt;symbol&gt;@aggTrade <br>
   * Update Speed: Real-time<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#aggregate-trade-streams}
   *
   * @param {string} symbol
   */
  public aggTradeWS(symbol, callbacks) {
    validateRequiredParameters({ symbol });
    const url = `${this.wsURL}/ws/${symbol.toLowerCase()}@aggTrade`;
    return this.subscribe(url, callbacks);
  }

  tradeWS(symbol, callbacks) {
    validateRequiredParameters({ symbol });
    const url = `${this.wsURL}/ws/${symbol.toLowerCase()}@trade`;
    return this.subscribe(url, callbacks);
  }

  klineWS(symbol, interval, callbacks) {
    validateRequiredParameters({ symbol, interval });
    const url = `${this.wsURL}/ws/${symbol.toLowerCase()}@kline_${interval}`;
    return this.subscribe(url, callbacks);
  }

  miniTickerWS(symbol = null, callbacks) {
    let path = '!miniTicker@arr';
    if (!isEmptyValue(symbol)) {
      path = `${symbol.toLowerCase()}@miniTicker`;
    }
    const url = `${this.wsURL}/ws/${path}`;
    return this.subscribe(url, callbacks);
  }

  tickerWS(symbol = null, callbacks) {
    let path = '!ticker@arr';
    if (!isEmptyValue(symbol)) {
      path = `${symbol.toLowerCase()}@ticker`;
    }
    const url = `${this.wsURL}/ws/${path}`;
    return this.subscribe(url, callbacks);
  }

  bookTickerWS(symbol = null, callbacks) {
    let path = '!bookTicker';
    if (!isEmptyValue(symbol)) {
      path = `${symbol.toLowerCase()}@bookTicker`;
    }
    const url = `${this.wsURL}/ws/${path}`;
    return this.subscribe(url, callbacks);
  }

  partialBookDepth(symbol, levels, speed, callbacks) {
    validateRequiredParameters({ symbol, levels, speed });
    const url = `${
      this.wsURL
    }/ws/${symbol.toLowerCase()}@depth${levels}@${speed}`;
    return this.subscribe(url, callbacks);
  }

  diffBookDepth(symbol, speed, callbacks) {
    validateRequiredParameters({ symbol, speed });
    const url = `${this.wsURL}/ws/${symbol.toLowerCase()}@depth@${speed}`;
    return this.subscribe(url, callbacks);
  }

  userData(listenKey, callbacks) {
    validateRequiredParameters({ listenKey });
    const url = `${this.wsURL}/ws/${listenKey}`;
    return this.subscribe(url, callbacks);
  }

  combinedStreams(streams, callbacks) {
    if (!Array.isArray(streams)) {
      streams = [streams];
    }

    const url = `${this.wsURL}/stream?streams=${streams.join('/')}`;
    return this.subscribe(url, callbacks);
  }
}
