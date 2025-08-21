/**
 * Scoring-related TypeScript interfaces for Enhanced Stock Alert App
 */

export interface AssetScore {
  symbol: string;
  overall_score: number;
  momentum_score: number;
  volatility_score: number;
  sentiment_score: number;
  recommendation: Recommendation;
  last_updated: string;
  metadata?: ScoreMetadata;
}

export interface ScoreRequest {
  symbols: string[];
  criteria?: ScoreCriteria[];
  timeframe?: string;
  weights?: ScoreWeights;
}

export interface ScoreResponse {
  scores: AssetScore[];
  metadata: ResponseMetadata;
}

export interface ScoreMetadata {
  data_points: number;
  confidence_level: number;
  calculation_method: string;
  timeframe_used: string;
  last_price?: number;
  price_change_24h?: number;
  volume_24h?: number;
}

export interface ResponseMetadata {
  calculation_time: string;
  criteria_used: ScoreCriteria[];
  total_symbols: number;
  data_source: string;
  version: string;
  cache_status?: 'hit' | 'miss';
  processing_time_ms?: number;
}

export interface ScoreWeights {
  momentum: number;
  volatility: number;
  sentiment: number;
  technical?: number;
  fundamental?: number;
}

export type ScoreCriteria = 
  | 'momentum'
  | 'volatility'
  | 'sentiment'
  | 'technical_indicators'
  | 'fundamental_analysis'
  | 'market_sentiment'
  | 'social_sentiment'
  | 'news_sentiment';

export type Recommendation = 
  | 'strong_buy'
  | 'buy'
  | 'hold'
  | 'sell'
  | 'strong_sell';

export interface MarketSummary {
  market_sentiment: string;
  average_score: number;
  total_analyzed: number;
  top_sector: string;
  volatility_index: number;
  momentum_trend: 'positive' | 'negative' | 'neutral';
  last_updated: string;
  recommendations: RecommendationCounts;
}

export interface RecommendationCounts {
  strong_buy: number;
  buy: number;
  hold: number;
  sell: number;
  strong_sell: number;
}

export interface ScoringConfig {
  update_frequency_minutes: number;
  min_data_points: number;
  confidence_threshold: number;
  default_weights: ScoreWeights;
  supported_timeframes: string[];
}