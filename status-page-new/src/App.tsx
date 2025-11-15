import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusModule } from './components/StatusModule';
import { useModulesStatus } from './api';
import { AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';

const queryClient = new QueryClient();

function StatusPage() {
  const { data: modules, isLoading, error, isRefetching } = useModulesStatus();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading status...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-800 font-semibold mb-2">Unable to fetch status</p>
          <p className="text-gray-600 text-sm">Please check your API connection</p>
        </div>
      </div>
    );
  }

  const allOperational = modules?.every(m => m.status === 'operational');
  const hasOutage = modules?.some(m => m.status === 'outage');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">FV Company Status</h1>
              <p className="text-gray-600 mt-1">Real-time platform status and uptime monitoring</p>
            </div>
            <div className="flex items-center space-x-2">
              {isRefetching && <RefreshCw className="w-5 h-5 animate-spin text-blue-500" />}
              {allOperational && !isRefetching && (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-green-700 font-medium">All Systems Operational</span>
                </>
              )}
              {hasOutage && (
                <>
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-700 font-medium">System Outage</span>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Status Modules */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {modules?.map((module) => (
            <StatusModule key={module.id} module={module} />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>Last updated: {new Date().toLocaleString()}</p>
          <p className="mt-2">Status refreshes automatically every 10 seconds</p>
        </footer>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusPage />
    </QueryClientProvider>
  );
}

export default App;
