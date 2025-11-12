import React from 'react';
import {
  AlertCircle,
  User,
  Shield,
  CheckCircle
} from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import RecentAlertsList from '../components/ui/RecentAlertsList';
import RiskFactorChart from '../components/ui/RiskFactorChart';

interface Alert {
  id: string;
  severity: string;
  title: string;
  user: string;
  time: string;
  status: string;
}

interface DashboardPageProps {
  alerts: Alert[];
  getSeverityColor: (severity: string, darkMode: boolean) => string;
  darkMode: boolean;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ alerts, getSeverityColor, darkMode }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-3xl font-bold  ${darkMode ? 'text-white' : 'text-gray-600'}`}>Security Operations Dashboard</h1>
        <div className="flex items-center space-x-4">
            <label htmlFor="time-range-select" className="sr-only">Time Range</label>
          <select id="time-range-select" className={`${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border rounded-lg px-4 py-2`}>
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Alerts"
          value="42"
          change="↓ 12% from yesterday"
          icon={AlertCircle}
          iconColor="red"
          darkMode={darkMode}
        />
        <StatCard
          title="High Risk Users"
          value="8"
          change="↑ 2 new this hour"
          icon={User}
          iconColor="orange"
          darkMode={darkMode}
        />
        <StatCard
          title="Active Incidents"
          value="12"
          change="3 requiring attention"
          icon={Shield}
          iconColor="blue"
          darkMode={darkMode}
        />
        <StatCard
          title="System Health"
          value="99.8%"
          change="All systems operational"
          icon={CheckCircle}
          iconColor="green"
          darkMode={darkMode}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentAlertsList alerts={alerts} getSeverityColor={getSeverityColor} darkMode={darkMode} />
        <RiskFactorChart darkMode={darkMode} />
      </div>
    </div>
  );
};

export default DashboardPage;