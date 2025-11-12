import React from 'react';

const IncidentTimeline: React.FC<{ darkMode?: boolean }> = ({ darkMode = true }) => {
  return (
    <div className={`lg:col-span-2 ${darkMode ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-xl p-6 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Incident Timeline</h3>
      <div className="space-y-4">
        <div className="flex items-start space-x-4">
          <div className="mt-1 w-2 h-2 bg-red-500 rounded-full"></div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>User login from unusual location</span>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>10:23 AM</span>
            </div>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>IP: 192.168.1.100 (San Francisco, CA)</p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="mt-1 w-2 h-2 bg-orange-500 rounded-full"></div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Access to sensitive database</span>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>10:25 AM</span>
            </div>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Database: customer_pii, 2.4GB data accessed</p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="mt-1 w-2 h-2 bg-yellow-500 rounded-full"></div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Data exfiltration attempt</span>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>10:28 AM</span>
            </div>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Endpoint: file-sharing service, 1.8GB uploaded</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentTimeline;