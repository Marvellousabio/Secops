import React from 'react';
import { Plus, Play, Pause, CheckCircle, Clock } from 'lucide-react';

const AutomationPage: React.FC<{ darkMode: boolean }> = ({darkMode}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-600'}`}>Automated Actions</h1>
        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center space-x-2">
          <Plus />
          <span>New Playbook</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}>
          <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Active Playbooks</h3>
          </div>
          <div className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Phishing Response</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Auto-contain & notify on phishing detection</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs ${darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-700 border-green-300'}`}>Active</span>
                  <button className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} p-1`}>
                    <Play className="w-4 h-4 text-green-400" />
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <div className={`flex items-center space-x-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Executed 24 times today</span>
                </div>
                <div className={`flex items-center space-x-2 text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Clock className="w-4 h-4" />
                  <span>Avg. response time: 45s</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Ransomware Containment</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Isolate endpoint & backup verification</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs ${darkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-800 border-yellow-400'}`}>Paused</span>
                  <button className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} p-1`}>
                    <Pause className="w-4 h-4 text-yellow-400" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Privilege Escalation</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Revoke privileges & notify security team</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs ${darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-700 border-green-300'}`}>Active</span>
                  <button className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} p-1`}>
                    <Play className="w-4 h-4 text-green-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}>
          <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Playbook Builder</h3>
          <div className="space-y-4">
            <div className={`${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'} rounded-lg p-4`}>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Trigger</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Alert severity ≥ High</p>
                </div>
              </div>
            </div>
            <div className={`${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'} rounded-lg p-4`}>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Action</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Suspend user account</p>
                </div>
              </div>
            </div>
            <div className={`${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'} rounded-lg p-4`}>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Notify</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Send Slack alert to #security-team</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-3 pt-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                Save Playbook
              </button>
              <button className={`flex-1 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} py-2 px-4 rounded-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Test Run
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationPage;