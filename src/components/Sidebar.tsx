import React from 'react';
import {
  Activity,
  Bell,
  Users,
  Zap,
  Settings,
  FileText,
  Shield
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  darkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, currentPage, setCurrentPage, darkMode }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'alerts', label: 'Alerts & Incidents', icon: Bell },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'automation', label: 'Automated Actions', icon: Zap },
    { id: 'reports', label: 'Reports & Compliance', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-20'} fixed h-full ${darkMode ? 'bg-gray-800' : 'bg-white'} border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300 z-50`}>
      <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          {sidebarOpen && (
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              SecOps
            </span>
          )}
        </div>
      </div>

      <nav className="p-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                currentPage === item.id
                  ? 'bg-blue-600 text-white'
                  : darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className={`flex items-center space-x-3 p-3 ${darkMode ? 'bg-gray-700/50' : 'bg-gray-200/50'} rounded-lg`}>
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <p className={`${darkMode ? 'text-white' : 'text-gray-900'} text-sm font-medium truncate`}>Alex Morgan</p>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-xs truncate`}>Security Analyst</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;