import React from 'react';
import { AlertCircle, Eye } from 'lucide-react';

interface Alert {
  id: string;
  severity: string;
  title: string;
  user: string;
  time: string;
  status: string;
}

interface AlertsTableProps {
  alerts: Alert[];
  getSeverityColor: (severity: string, darkMode: boolean) => string;
  darkMode: boolean;
}

const AlertsTable: React.FC<AlertsTableProps> = ({ alerts, getSeverityColor, darkMode }) => {
  return (
    <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
            <tr>
              <th className={`text-left py-4 px-6 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Alert ID</th>
              <th className={`text-left py-4 px-6 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Severity</th>
              <th className={`text-left py-4 px-6 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Title</th>
              <th className={`text-left py-4 px-6 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>User</th>
              <th className={`text-left py-4 px-6 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Time</th>
              <th className={`text-left py-4 px-6 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</th>
              <th className={`text-right py-4 px-6 font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Actions</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {alerts.map((alert) => (
              <tr key={alert.id} className={`${darkMode ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50'}`}>
                <td className={`py-4 px-6 font-mono ${darkMode ? 'text-white' : 'text-gray-900'}`}>{alert.id}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 inline-flex gap-1 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity, darkMode)}`}>
                    <AlertCircle className="w-4 h-4" />
                    {alert.severity}
                  </span>
                </td>
                <td className={`py-4 px-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{alert.title}</td>
                <td className={`py-4 px-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{alert.user}</td>
                <td className={`py-4 px-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{alert.time}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    alert.status === 'open' ? (darkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-50 text-red-700 border-red-300') :
                    alert.status === 'acknowledged' ? (darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-700 border-blue-300') :
                    (darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-700 border-green-300')
                  }`}>
                    {alert.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button className={`p-1 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                      Acknowledge
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlertsTable;