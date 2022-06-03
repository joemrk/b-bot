import { BinanceApi } from 'src/binance/binance';
import { BookTicker, CombinedStreams, Kline } from 'src/binance/types';
import { Grid, WorkGrid } from './types';

export class SimpleGrid {
  private readonly binanceApi: BinanceApi;
  private readonly grids: Grid[];
  private workGrids: WorkGrid;

  /*
  grids: [
    {
      name: 'btcusdt_test_grid'
      symbol: 'btcusdt',
      orderAmount: 15 || 15 // >=15
      hightLevel: 50000,
      lowLevel: 40000,
      gridsCount: 8,
      lastTradePrice?: 45000 || current
      status?: ACTIVE
      stepValue?:9 1250
    },
  ]
  */

  constructor(binanceApi, grids) {
    this.binanceApi = binanceApi;
    this.grids = grids;
  }

  async prepareGrid() {
    // const prices = await this.getPrice();
    const gridsWithDefaults = this.grids.map((g) => ({
      ...g,
      // startPrice: g.startPrice || prices[g.symbol],
      orderAmount: g.orderAmount || 15,
      stepValue: (g.hightLevel - g.lowLevel) / g.gridsCount,
    }));

    this.workGrids = this.getGridWithKeys(gridsWithDefaults);
  }

  getGridWithKeys(grids) {
    const gridKeys = {};
    grids.forEach((g) => Object.assign(gridKeys, { [g.symbol]: g }));
    return gridKeys;
  }

  async getPrice() {
    const returned = {};
    const symbols = this.grids.map((g) => g.symbol);
    const market = this.binanceApi.getMarket();
    const book = (await market.bookTicker()).data as BookTicker[];
    book.forEach(
      (b) =>
        symbols.some((g) => b.symbol === g.toUpperCase()) &&
        Object.assign(returned, { [b.symbol]: b.askPrice }),
    );

    return returned;
  }

  clineMessageCallback(data) {
    const parsed = JSON.parse(data.toString()) as CombinedStreams<Kline>;
    // message: cant parse

    if (!Object.keys(this.workGrids).length) {
      return;
    }
    const currentGrid = this.workGrids[parsed.data.k.s.toLowerCase()];
    if (!currentGrid) {
      return;
    }
  }

  start() {
    this.prepareGrid();
    const gridsSymbols = this.grids.map((g) => g.symbol);
    const bws = this.binanceApi.getWebsocket();

    bws.combinedStreams(
      gridsSymbols.map((s) => `${s}@kline_1m`),
      {
        message: this.clineMessageCallback,
      },
    );
  }
}
