import { APIBase } from '../APIBase';
import { ExchangeInfoOptions } from '../types';

export class Market extends APIBase {
  /**
   * Symbol Order Book Ticker<br>
   *
   * GET /api/v3/ticker/bookTicker<br>
   *
   * Best price/qty on the order book for a symbol or symbols.<br>
   * {@link https://binance-docs.github.io/apidocs/spot/en/#symbol-order-book-ticker}
   *
   * @param {string} [symbol]
   */
  bookTicker(symbol = '') {
    return this.publicRequest('GET', '/api/v3/ticker/bookTicker', {
      symbol: symbol.toUpperCase(),
    });
  }

  /**
   * Symbol Price Ticker<br>
   *
   * GET /api/v3/ticker/price<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#symbol-price-ticker}
   *
   * @param {string} [symbol]
   */
  tickerPrice(symbol = '') {
    return this.publicRequest('GET', '/api/v3/ticker/price', {
      symbol: symbol.toUpperCase(),
    });
  }

  /**
   * Exchange Information<br>
   *
   * GET /api/v3/exchangeInfo<br>
   *
   * Current exchange trading rules and symbol information<br>
   * {@link https://binance-docs.github.io/apidocs/spot/en/#exchange-information}
   *
   * @param {object} [options]
   * @param {string} [options.symbol] - symbol
   * @param {Array} [options.symbols] - an array of symbols
   *
   */
  exchangeInfo(options: ExchangeInfoOptions = {}) {
    if (Object.prototype.hasOwnProperty.call(options, 'symbol')) {
      options.symbol = options.symbol.toUpperCase();
    }
    if (Object.prototype.hasOwnProperty.call(options, 'symbols')) {
      options.symbols = options.symbols.map((symbol) => symbol.toUpperCase());
    }
    return this.publicRequest('GET', '/api/v3/exchangeInfo', options);
  }
}
