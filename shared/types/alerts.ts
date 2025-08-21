/**
 * Alert-related TypeScript interfaces for Enhanced Stock Alert App
 */

export interface Alert {
  id: string;
  symbol: string;
  alert_type: AlertType;
  condition: string;
  value: number;
  message: string;
  status: AlertStatus;
  created_at: string;
  updated_at?: string;
  triggered_at?: string;
  user_id?: string;
}

export interface AlertCreate {
  symbol: string;
  alert_type: AlertType;
  condition: string;
  value: number;
  message: string;
}

export interface AlertUpdate {
  condition?: string;
  value?: number;
  message?: string;
  status?: AlertStatus;
}

export type AlertType = 
  | 'price_above'
  | 'price_below'
  | 'price_change_percent'
  | 'volume_spike'
  | 'volume_drop'
  | 'moving_average_cross'
  | 'rsi_overbought'
  | 'rsi_oversold';

export type AlertStatus = 
  | 'active'
  | 'inactive'
  | 'triggered'
  | 'expired'
  | 'deleted';

export interface AlertCondition {
  field: string;
  operator: 'gt' | 'lt' | 'gte' | 'lte' | 'eq' | 'ne';
  value: number | string;
  timeframe?: string;
}

export interface AlertNotification {
  id: string;
  alert_id: string;
  triggered_at: string;
  current_value: number;
  message: string;
  channels: NotificationChannel[];
}

export type NotificationChannel = 'email' | 'sms' | 'push' | 'webhook';