import React from 'react';
import { Search, Filter } from 'lucide-react';
import AlertsTable from '../components/ui/AlertsTable';
import QuickActions from '../components/ui/QuickActions';
import IncidentTimeline from '../components/ui/IncidentTimeline';

interface Alert {
  id: string;
  severity: string;
  title: string;
  user: string;
  time: string;
  status: string;
}

interface AlertsPageProps {
  alerts: Alert[];
  getSeverityColor: (severity: string, darkMode: boolean) => string;
  darkMode: boolean;
}

const AlertsPage: React.FC<AlertsPageProps> = ({ alerts, getSeverityColor, darkMode }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-600'}`}>Alerts & Incidents</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search alerts..."
              className={`${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border rounded-lg pl-10 pr-4 py-2 w-80`}
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <AlertsTable alerts={alerts} getSeverityColor={getSeverityColor} darkMode={darkMode} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <QuickActions darkMode={darkMode} />
        <IncidentTimeline darkMode={darkMode} />
      </div>
    </div>
  );
};

export default AlertsPage;