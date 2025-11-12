import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  iconColor: string;
}

const StatCard: React.FC<StatCardProps & { darkMode?: boolean }> = ({ title, value, change, icon: Icon, iconColor, darkMode = true }) => {
  return (
    <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-xl p-6 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{title}</p>
          <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
        </div>
        <div className={`w-12 h-12 ${darkMode ? `bg-${iconColor}-500/10` : `bg-${iconColor}-50`} rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${darkMode ? `text-${iconColor}-400` : `text-${iconColor}-600`}`} />
        </div>
      </div>
      {change && <p className={`text-sm mt-2 ${change.startsWith('↓') ? (darkMode ? 'text-green-400' : 'text-green-600') : change.startsWith('↑') ? (darkMode ? 'text-red-400' : 'text-red-600') : (darkMode ? `text-${iconColor}-400` : `text-${iconColor}-600`)}`}>{change}</p>}
    </div>
  );
};

export default StatCard;