import React from 'react';
import { User, Mail, Terminal } from 'lucide-react';

const QuickActions: React.FC<{ darkMode?: boolean }> = ({ darkMode = true }) => {
  return (
    <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-xl p-6 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Quick Actions</h3>
      <div className="space-y-3">
        <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2">
          <User className="w-4 h-4" />
          <span>Suspend User</span>
        </button>
        <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2">
          <Mail className="w-4 h-4" />
          <span>Notify Team</span>
        </button>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2">
          <Terminal className="w-4 h-4" />
          <span>Run Enrichment</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;