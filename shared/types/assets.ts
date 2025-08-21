/**
 * Asset-related TypeScript interfaces for Enhanced Stock Alert App
 */

export interface Asset {
  symbol: string;
  name: string;
  exchange: string;
  sector?: string;
  industry?: string;
  market_cap?: number;
  currency: string;
  asset_type: AssetType;
  status: AssetStatus;
  metadata?: AssetMetadata;
}

export interface AssetPrice {
  symbol: string;
  current_price: number;
  previous_close: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  timestamp: string;
  change: number;
  change_percent: number;
}

export interface AssetMetadata {
  description?: string;
  website?: string;
  logo_url?: string;
  founded?: string;
  employees?: number;
  headquarters?: string;
  ceo?: string;
  tags?: string[];
}

export interface TechnicalIndicators {
  symbol: string;
  timestamp: string;
  sma_20?: number;
  sma_50?: number;
  sma_200?: number;
  ema_12?: number;
  ema_26?: number;
  rsi_14?: number;
  macd?: number;
  macd_signal?: number;
  bollinger_upper?: number;
  bollinger_lower?: number;
  volume_sma?: number;
}

export interface MarketData {
  symbol: string;
  price: AssetPrice;
  technical_indicators?: TechnicalIndicators;
  fundamentals?: FundamentalData;
  news?: NewsItem[];
  last_updated: string;
}

export interface FundamentalData {
  symbol: string;
  market_cap?: number;
  pe_ratio?: number;
  eps?: number;
  dividend_yield?: number;
  book_value?: number;
  debt_to_equity?: number;
  roe?: number;
  revenue_growth?: number;
  profit_margin?: number;
  last_updated: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary?: string;
  url: string;
  source: string;
  published_at: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  sentiment_score?: number;
  relevance_score?: number;
  symbols: string[];
}

export interface Watchlist {
  id: string;
  name: string;
  description?: string;
  symbols: string[];
  user_id: string;
  created_at: string;
  updated_at: string;
  is_public: boolean;
  tags?: string[];
}

export interface Portfolio {
  id: string;
  name: string;
  user_id: string;
  positions: Position[];
  total_value: number;
  total_return: number;
  total_return_percent: number;
  created_at: string;
  updated_at: string;
}

export interface Position {
  symbol: string;
  quantity: number;
  average_cost: number;
  current_price: number;
  market_value: number;
  unrealized_gain_loss: number;
  unrealized_gain_loss_percent: number;
  purchase_date: string;
  last_updated: string;
}

export type AssetType = 
  | 'stock'
  | 'etf'
  | 'mutual_fund'
  | 'crypto'
  | 'commodity'
  | 'forex'
  | 'bond'
  | 'option'
  | 'future';

export type AssetStatus = 
  | 'active'
  | 'halted'
  | 'delisted'
  | 'suspended'
  | 'pre_market'
  | 'after_hours';

export interface AssetSearch {
  query: string;
  asset_types?: AssetType[];
  exchanges?: string[];
  sectors?: string[];
  limit?: number;
}

export interface AssetSearchResult {
  assets: Asset[];
  total_count: number;
  query_time_ms: number;
}