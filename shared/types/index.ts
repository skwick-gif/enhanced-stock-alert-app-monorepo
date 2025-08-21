/**
 * Main export file for all shared TypeScript interfaces
 * Enhanced Stock Alert App
 */

// Alert types
export * from './alerts';

// Scoring types  
export * from './scoring';

// Asset types
export * from './assets';

// Common/shared utility types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
  metadata?: {
    timestamp: string;
    version: string;
    request_id?: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
}

export interface User {
  id: string;
  email: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  timezone: string;
  currency: string;
  notifications: NotificationPreferences;
  dashboard_layout?: string;
  theme?: 'light' | 'dark' | 'auto';
}

export interface NotificationPreferences {
  email_alerts: boolean;
  push_notifications: boolean;
  sms_alerts: boolean;
  webhook_url?: string;
  alert_frequency: 'immediate' | 'hourly' | 'daily';
  quiet_hours?: {
    start: string; // HH:MM format
    end: string;   // HH:MM format
  };
}

export interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
  timestamp: string;
  path: string;
  request_id?: string;
}