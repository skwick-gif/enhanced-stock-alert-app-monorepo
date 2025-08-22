export interface Alert {
  id: number;
  symbol: string;
  threshold: number;
  direction: 'above' | 'below';
  type: 'stock' | 'option';
}

export interface StockData {
  symbol: string;
  price: number;
  timestamp: string;
  volume: number;
}

export interface OptionData {
  symbol: string;
  strike: number;
  expiration: string;
  impliedVolatility: number;
  openInterest: number;
}