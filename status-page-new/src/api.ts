import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { HealthResponse, Module } from './types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function useModulesStatus() {
  return useQuery<Module[]>({
    queryKey: ['modules-status'],
    queryFn: async () => {
      const { data } = await axios.get<HealthResponse>(`${API_BASE_URL}/api/health/all-modules`);
      
      return [
        {
          id: 'admin',
          icon: '🎯',
          name: 'Admin',
          description: 'Dashboard and management',
          status: data.modules.admin.status,
          latency: data.modules.admin.latency,
          uptime: '99.99%'
        },
        {
          id: 'checkout',
          icon: '🛒',
          name: 'Checkout',
          description: 'Order processing',
          status: data.modules.checkout.status,
          latency: data.modules.checkout.latency,
          uptime: '99.95%'
        },
        {
          id: 'reports',
          icon: '📊',
          name: 'Reports',
          description: 'Analytics and insights',
          status: data.modules.reports.status,
          latency: data.modules.reports.latency,
          uptime: '99.98%'
        },
        {
          id: 'storefront',
          icon: '🏪',
          name: 'Storefront',
          description: 'Customer-facing stores',
          status: data.modules.storefront.status,
          latency: data.modules.storefront.latency,
          uptime: '99.99%'
        },
        {
          id: 'api',
          icon: '🔌',
          name: 'API & Mobile',
          description: 'Developer APIs',
          status: data.modules.api.status,
          latency: data.modules.api.latency,
          uptime: '99.97%'
        },
        {
          id: 'thirdparty',
          icon: '🤝',
          name: 'Third Party',
          description: 'External integrations',
          status: data.modules.thirdparty.status,
          latency: data.modules.thirdparty.latency,
          uptime: '99.92%'
        },
        {
          id: 'support',
          icon: '💬',
          name: 'Support',
          description: 'Help desk and tickets',
          status: data.modules.support.status,
          latency: data.modules.support.latency,
          uptime: '99.96%'
        },
        {
          id: 'pos',
          icon: '🏬',
          name: 'POS',
          description: 'In-store checkout',
          status: data.modules.pos.status,
          latency: data.modules.pos.latency,
          uptime: '99.94%'
        }
      ];
    },
    refetchInterval: 10000, // Refetch every 10 seconds
    staleTime: 5000,
  });
}
