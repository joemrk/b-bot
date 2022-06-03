import { Injectable, Logger } from '@nestjs/common';
import { BinanceApi } from './binance/binance';
import {
  BookTicker,
  CombinedStreams,
  Kline,
  OrderSide,
  OrderType,
} from './binance/types';

const logger: Logger = new Logger('BinanceApi');

@Injectable()
export class AppService {
  async getHello(): Promise<void> {
    const grids = [
      {
        symbol: 'btcusdt',
        hightLevel: 50000,
        lowLevel: 40000,
        gridsCount: 3,
      },
    ];

    const apiKey = process.env.BINANCE_KEY;
    const apiSecret = process.env.BINANCE_SECRET;

    const binance = new BinanceApi({ apiKey, apiSecret, logger });

    const binanceWs = binance.getWebsocket();

    binanceWs.combinedStreams(['btcusdt@kline_1m', 'ethusdt@kline_1m'], {
      message: (data) => {
        const parsedData = JSON.parse(
          data.toString(),
        ) as CombinedStreams<Kline>;

        console.log(parsedData.data.k.s.toLowerCase(), parsedData.data.k.c);
      },
    });

    // try {
    //   const order = await binanceWs.newOrderTest(
    //     'btcusdt',
    //     OrderSide.SELL,
    //     OrderType.LIMIT,
    //     {
    //       quantity: 0.001,
    //       timestamp: Date.now(),
    //     },
    //   );
    //   console.log(order.data);
    // } catch (error) {
    //   logger.error(error);
    // }

    // const binanceMarket = binance.getMarket();
    // const book = (await binanceMarket.bookTicker()).data as BookTicker[];
    // const grid = ['btcusdt', 'ethbtc'];
    // const filtered = book.filter((b) =>
    //   grid.some((g) => b.symbol === g.toUpperCase()),
    // );

    // console.log(filtered);
  }
}
