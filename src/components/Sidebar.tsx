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
  <div className={`${sidebarOpen ? 'w-64' : 'w-20'} fixed h-full transition-all duration-300 z-50 sidebar ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="sidebar-header">
        <div className="flex items-center space-x-2">
          <div className="brand-icon w-8 h-8 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          {sidebarOpen && (
            <span className="brand-text">SecOps</span>
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
              className={`menu-item ${currentPage === item.id ? 'active' : ''}`}
            >
              <Icon className="w-5 h-5" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className={`profile-card rounded-lg`}>
          <div className="profile-avatar"></div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate profile-name">Alex Morgan</p>
              <p className="text-xs truncate profile-role">Security Analyst</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;