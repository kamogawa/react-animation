const BASE_URL = `https://api.coinpaprika.com/v1`;

/*
 * COINS
​ */
export async function fetchCoins() {
  const response = await fetch(`${BASE_URL}/coins`);
  return await response.json();
}

export interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

/*
 * COIN DTAIL
​ */

export async function fetchCoinDetail(coinId: string) {
  const response = await fetch(`${BASE_URL}/coins/${coinId}`);
  return await response.json();
}
export interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

/*
 * TICKERS
​ */
export async function fetchCoinTickers() {
  const response = await fetch(`${BASE_URL}/tickers`);
  return await response.json();
}

/*
 * TICKER DETAIL
​ */
export async function fetchCoinTickerDetail(coinId: string) {
  const response = await fetch(`${BASE_URL}/tickers/${coinId}`);
  return await response.json();
}

export interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

/*
 * HISTORICAL
​ */
export async function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  const response = await fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  );
  return await response.json();
}

export interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}