import type { Module } from '../types';

interface StatusModuleProps {
  module: Module;
}

const statusConfig = {
  operational: {
    color: 'bg-green-100 border-green-500 text-green-800',
    dot: 'bg-green-500',
    badge: 'bg-green-500 text-white',
    label: 'Operational'
  },
  degraded: {
    color: 'bg-yellow-100 border-yellow-500 text-yellow-800',
    dot: 'bg-yellow-500',
    badge: 'bg-yellow-500 text-white',
    label: 'Degraded'
  },
  partial: {
    color: 'bg-orange-100 border-orange-500 text-orange-800',
    dot: 'bg-orange-500',
    badge: 'bg-orange-500 text-white',
    label: 'Partial Outage'
  },
  outage: {
    color: 'bg-red-100 border-red-500 text-red-800',
    dot: 'bg-red-500',
    badge: 'bg-red-500 text-white',
    label: 'Outage'
  },
  maintenance: {
    color: 'bg-blue-100 border-blue-500 text-blue-800',
    dot: 'bg-blue-500',
    badge: 'bg-blue-500 text-white',
    label: 'Maintenance'
  }
};

export function StatusModule({ module }: StatusModuleProps) {
  const config = statusConfig[module.status];

  return (
    <div className={`border-l-4 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow ${config.color}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="text-3xl">{module.icon}</div>
          <div>
            <h3 className="text-lg font-semibold mb-1">{module.name}</h3>
            <p className="text-sm opacity-80">{module.description}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {module.latency && (
            <span className="text-xs opacity-70">{module.latency}ms</span>
          )}
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.badge}`}>
            {config.label}
          </span>
          <div className={`w-3 h-3 rounded-full ${config.dot} animate-pulse`}></div>
        </div>
      </div>
      
      {module.uptime && (
        <div className="mt-4 pt-4 border-t border-current opacity-50">
          <span className="text-xs">Uptime: {module.uptime}</span>
        </div>
      )}
    </div>
  );
}
