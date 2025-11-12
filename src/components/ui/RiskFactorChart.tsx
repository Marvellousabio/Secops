import React from 'react';

const RiskFactorChart: React.FC<{ darkMode?: boolean }> = ({ darkMode = true }) => {
  return (
    <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}>
      <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Risk Score Distribution</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>High Risk (75-100)</span>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>8 users</span>
            </div>
            <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
              <div className="bg-red-500 h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Medium Risk (50-74)</span>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>23 users</span>
            </div>
            <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Low Risk (0-49)</span>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>156 users</span>
            </div>
            <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskFactorChart;