// import { APIBase } from '../APIBase';
import { APIBase } from '../APIBase';
import { validateRequiredParameters } from '../helpers/validation';

export class Trade extends APIBase {
  newOrderTest(symbol, side, type, options = {}) {
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
   * New Order (TRADE)<br>
   *
   * POST /api/v3/order<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#new-order-trade}
   *
   * @param {string} symbol
   * @param {string} side
   * @param {string} type
   * @param {object} [options]
   * @param {string} [options.timeInForce]
   * @param {number} [options.quantity]
   * @param {number} [options.quoteOrderQty]
   * @param {number} [options.price]
   * @param {string} [options.newClientOrderId]
   * @param {number} [options.stopPrice]
   * @param {number} [options.icebergQty]
   * @param {string} [options.newOrderRespType]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  newOrder(symbol, side, type, options = {}) {
    validateRequiredParameters({ symbol, side, type });

    return this.signRequest(
      'POST',
      '/api/v3/order',
      Object.assign(options, {
        symbol: symbol.toUpperCase(),
        side: side.toUpperCase(),
        type: type.toUpperCase(),
      }),
    );
  }

  /**
   * Cancel Order (TRADE)<br>
   *
   * DELETE /api/v3/order<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#cancel-order-trade}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.orderId]
   * @param {string} [options.origClientOrderId]
   * @param {string} [options.newClientOrderId]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  cancelOrder(symbol, options = {}) {
    validateRequiredParameters({ symbol });

    return this.signRequest(
      'DELETE',
      '/api/v3/order',
      Object.assign(options, {
        symbol: symbol.toUpperCase(),
      }),
    );
  }

  /**
   * Cancel all Open Orders on a Symbol (TRADE)<br>
   *
   * DELETE /api/v3/openOrders<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#cancel-all-open-orders-on-a-symbol-trade}
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  cancelOpenOrders(symbol, options = {}) {
    validateRequiredParameters({ symbol });

    return this.signRequest(
      'DELETE',
      '/api/v3/openOrders',
      Object.assign(options, {
        symbol: symbol.toUpperCase(),
      }),
    );
  }

  /**
   * Query Order (USER_DATA)<br>
   *
   * GET /api/v3/order<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#query-order-user_data}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.orderId]
   * @param {string} [options.origClientOrderId]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  getOrder(symbol, options = {}) {
    validateRequiredParameters({ symbol });
    return this.signRequest(
      'GET',
      '/api/v3/order',
      Object.assign(options, {
        symbol: symbol.toUpperCase(),
      }),
    );
  }

  /**
   * Current Open Orders (USER_DATA)<br>
   *
   * GET /api/v3/openOrders<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#current-open-orders-user_data}
   *
   * @param {object} [options]
   * @param {string} [options.symbol]
   * @param {number} [options.recvWindow] - The value cannot be greater than 60000
   */
  openOrders(options = {}) {
    return this.signRequest('GET', '/api/v3/openOrders', options);
  }

  /**
   * All Orders (USER_DATA)<br>
   *
   * GET /api/v3/allOrders<br>
   *
   * {@link https://binance-docs.github.io/apidocs/spot/en/#all-orders-user_data}
   *
   * @param {string} symbol
   * @param {object} [options]
   * @param {number} [options.orderId]
   * @param {number} [options.startTime]
   * @param {number} [options.endTime]
   * @param {number} [options.limit]
   * @param {string} [options.recvWindow] - The value cannot be greater than 60000
   */
  allOrders(symbol, options = {}) {
    validateRequiredParameters({ symbol });
    return this.signRequest(
      'GET',
      '/api/v3/allOrders',
      Object.assign(options, {
        symbol: symbol.toUpperCase(),
      }),
    );
  }
}
