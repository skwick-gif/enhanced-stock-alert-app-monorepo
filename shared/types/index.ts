export interface Asset {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  lastUpdated: string;
}

export interface Alert {
  id: string;
  assetId: string;
  assetSymbol: string;
  type: 'price_above' | 'price_below' | 'percentage_change';
  targetValue: number;
  isActive: boolean;
  createdAt: string;
  triggeredAt?: string;
}

export interface Score {
  id: string;
  assetId: string;
  assetSymbol: string;
  score: number;
  factors: {
    volatility: number;
    momentum: number;
    volume: number;
  };
  calculatedAt: string;
}

export interface CreateAlertRequest {
  assetId: string;
  type: Alert['type'];
  targetValue: number;
}

export interface UpdateAlertRequest {
  assetId?: string;
  type?: Alert['type'];
  targetValue?: number;
  isActive?: boolean;
}

export interface AlertResponse {
  alerts: Alert[];
  total: number;
}

export interface ScoreResponse {
  scores: Score[];
  total: number;
}