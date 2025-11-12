import React from 'react';

const SettingsPage: React.FC<{ darkMode: boolean }> = ({darkMode}) => {
  return (
    <div className="space-y-6">
      <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-600'}`}>Settings & Integrations</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}>
            <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Integrations</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: 'Microsoft 365', status: 'connected', icon: 'M365', color: 'bg-blue-600' },
                { name: 'CrowdStrike', status: 'connected', icon: 'CS', color: 'bg-red-600' },
                { name: 'Okta', status: 'connected', icon: 'OK', color: 'bg-orange-600' },
                { name: 'AWS', status: 'connected', icon: 'AWS', color: 'bg-yellow-600' },
                { name: 'Slack', status: 'connected', icon: 'SL', color: 'bg-purple-600' },
                { name: 'ServiceNow', status: 'disconnected', icon: 'SN', color: 'bg-gray-600' }
              ].map((integration, index) => (
                <div key={index} className={`${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'} rounded-lg p-4`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-8 h-8 rounded-lg ${integration.color} flex items-center justify-center text-white font-bold text-xs`}>
                      {integration.icon}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      integration.status === 'connected' ? (darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-700 border-green-300') : (darkMode ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-700 border-gray-300')
                    }`}>
                      {integration.status}
                    </span>
                  </div>
                  <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{integration.name}</h4>
                  <button className={`text-sm mt-2 ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>
                    {integration.status === 'connected' ? 'Configure' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}>
            <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Notification Preferences</h3>
            <div className="space-y-4">
              {['Email', 'Slack', 'SMS', 'Webhook'].map((channel) => (
                <div key={channel} className="flex items-center justify-between">
                  <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{channel}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className={`w-11 h-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}>
            <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Appearance</h3>
            <div className="space-y-4">
              <div>
                <label className={`block mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Theme</label>
                <select className={`w-full border rounded-lg px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}>
                  <option>Dark Mode</option>
                  <option>Light Mode</option>
                  <option>Midnight Blue</option>
                </select>
              </div>
              <div>
                <label className={`block mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Density</label>
                <select className={`w-full border rounded-lg px-3 py-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}>
                  <option>Comfortable</option>
                  <option>Compact</option>
                </select>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2">
                <span>Toggle Theme</span>
              </button>
            </div>
          </div>

          <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}>
            <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>API Keys</h3>
            <div className="space-y-3">
              <div className={`${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'} rounded-lg p-3`}>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>SOC-API-PROD</span>
                  <span className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-600'}`}>Active</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs font-mono ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>sk_live_***8291</span>
                  <button className={`text-xs ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}>Regenerate</button>
                </div>
              </div>
              <button className={`w-full py-2 px-4 rounded-lg text-sm ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'}`}>
                + Create New Key
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;