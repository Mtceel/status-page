export type ModuleStatus = 'operational' | 'degraded' | 'partial' | 'outage' | 'maintenance';

export interface Module {
  id: string;
  icon: string;
  name: string;
  description: string;
  status: ModuleStatus;
  uptime?: string;
  latency?: number;
}

export interface HealthResponse {
  timestamp: string;
  overall: string;
  modules: {
    admin: { status: ModuleStatus; latency?: number };
    checkout: { status: ModuleStatus; latency?: number };
    reports: { status: ModuleStatus; latency?: number };
    storefront: { status: ModuleStatus; latency?: number };
    api: { status: ModuleStatus; latency?: number };
    thirdparty: { status: ModuleStatus; latency?: number };
    support: { status: ModuleStatus; latency?: number };
    pos: { status: ModuleStatus; latency?: number };
  };
}
