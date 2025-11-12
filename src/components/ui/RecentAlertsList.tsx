import React from 'react';
import { AlertCircle } from 'lucide-react';

interface Alert {
  id: string;
  severity: string;
  title: string;
  user: string;
  time: string;
  status: string;
}

interface RecentAlertsListProps {
  alerts: Alert[];
  getSeverityColor: (severity: string, darkMode: boolean) => string;
  darkMode: boolean;
}

const RecentAlertsList: React.FC<RecentAlertsListProps> = ({ alerts, getSeverityColor, darkMode }) => {
  return (
    <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}>
      <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Recent Alerts</h3>
      </div>
      <div className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
        {alerts.slice(0, 5).map((alert) => (
          <div key={alert.id} className={`p-4 ${darkMode ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50'} cursor-pointer`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${alert.severity === 'critical' ? 'bg-red-500' : alert.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'}`}></div>
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{alert.title}</p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{alert.user} • {alert.time}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity, darkMode)}`}>
                <AlertCircle className="w-3 h-3 mr-1" />
                {alert.severity}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentAlertsList;