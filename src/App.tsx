import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronDown,
  Bell,
  Activity,
  Users,
  Zap,
  Settings,
  FileText,
  Sun,
  Moon
} from 'lucide-react';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import AlertsPage from './pages/AlertsPage';
import UsersPage from './pages/UsersPage';
import AutomationPage from './pages/AutomationPage';
import SettingsPage from './pages/SettingsPage';
import ReportsPage from './pages/ReportsPage';
import UserProfileModal from './components/UserProfileModal';

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [userRevealed, setUserRevealed] = useState<{ [key: string]: boolean }>({});
  const [alerts, setAlerts] = useState<Array<{
    id: string;
    severity: string;
    title: string;
    user: string;
    time: string;
    status: string;
  }>>([]);
  const [users, setUsers] = useState<Array<{
    id: string;
    name: string;
    riskScore: number;
    anomalies: number;
    lastActive: string;
    department: string;
    peerComparison: number;
  }>>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [profileTab, setProfileTab] = useState('overview');

  const websocketRef = useRef<WebSocket | null>(null);

  // Mock data initialization
  useEffect(() => {
    // Mock alerts data
    setAlerts([
      { id: 'AL-7821', severity: 'critical', title: 'Unusual Data Exfiltration', user: 'U-4582', time: '2 min ago', status: 'open' },
      { id: 'AL-7822', severity: 'high', title: 'Multiple Failed Logins', user: 'U-2391', time: '8 min ago', status: 'acknowledged' },
      { id: 'AL-7823', severity: 'medium', title: 'Privilege Escalation Attempt', user: 'U-8901', time: '23 min ago', status: 'open' },
      { id: 'AL-7824', severity: 'low', title: 'Policy Violation', user: 'U-1245', time: '1 hour ago', status: 'resolved' }
    ]);

    // Mock users data
    setUsers([
      {
        id: 'U-4582',
        name: 'John Doe',
        riskScore: 87,
        anomalies: 3,
        lastActive: '5 min ago',
        department: 'Engineering',
        peerComparison: 85
      },
      {
        id: 'U-2391',
        name: 'Emily Chen',
        riskScore: 65,
        anomalies: 1,
        lastActive: '12 min ago',
        department: 'Finance',
        peerComparison: 62
      },
      {
        id: 'U-8901',
        name: 'Marcus Johnson',
        riskScore: 92,
        anomalies: 5,
        lastActive: '2 min ago',
        department: 'HR',
        peerComparison: 94
      },
      {
        id: 'U-1245',
        name: 'Sophia Williams',
        riskScore: 23,
        anomalies: 0,
        lastActive: '1 hour ago',
        department: 'Marketing',
        peerComparison: 20
      }
    ]);

    // Setup WebSocket for real-time updates
    websocketRef.current = new WebSocket('wss://mock-api.securityops.com/ws');
    websocketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'new_alert') {
        setAlerts(prev => [data.alert, ...prev.slice(0, 3)]);
      }
    };

    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
      }
    };
  }, []);

  const toggleRevealIdentity = (userId: string) => {
    setUserRevealed(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const openUserProfile = (user: any) => {
    setSelectedUser(user);
    setProfileTab('overview');
  };







  const getSeverityColor = (severity: string, darkMode: boolean) => {
    if (darkMode) {
      switch (severity) {
        case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
        case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
        case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
        case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
        default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      }
    } else {
      switch (severity) {
        case 'critical': return 'bg-red-50 text-red-700 border-red-300';
        case 'high': return 'bg-orange-50 text-orange-700 border-orange-300';
        case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-400';
        case 'low': return 'bg-green-50 text-green-700 border-green-300';
        default: return 'bg-gray-100 text-gray-700 border-gray-300';
      }
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard': return <DashboardPage alerts={alerts} getSeverityColor={getSeverityColor} darkMode={darkMode} />;
      case 'alerts': return <AlertsPage alerts={alerts} getSeverityColor={getSeverityColor} darkMode={darkMode} />;
      case 'users': return <UsersPage users={users} userRevealed={userRevealed} toggleRevealIdentity={toggleRevealIdentity} openUserProfile={openUserProfile} darkMode={darkMode} />;
      case 'automation': return <AutomationPage darkMode={darkMode} />;
      case 'settings': return <SettingsPage darkMode={darkMode} />;
      case 'reports': return <ReportsPage darkMode={darkMode} />;
      default: return <DashboardPage alerts={alerts} getSeverityColor={getSeverityColor} darkMode={darkMode} />;
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'alerts', label: 'Alerts & Incidents', icon: Bell },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'automation', label: 'Automated Actions', icon: Zap },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'reports', label: 'Reports & Compliance', icon: FileText }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sidebarOpen={sidebarOpen}
        darkMode={darkMode}
      />

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Top Navigation */}
        <header className={`sticky top-0 z-40 ${darkMode ? 'bg-gray-900/80 backdrop-blur-sm border-b border-gray-800' : 'bg-white/80 backdrop-blur-sm border-b border-gray-200'}`}>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-200/50'}`}
              >
                <ChevronDown className={`w-5 h-5 transform ${sidebarOpen ? 'rotate-90' : '-rotate-90'}`} />
              </button>
              <h2 className="text-xl font-semibold capitalize">
                {menuItems.find(item => item.id === currentPage)?.label}
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-200/50'}`}>
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-200/50'}`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>

      {selectedUser && (
        <UserProfileModal
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          profileTab={profileTab}
          setProfileTab={setProfileTab}
          userRevealed={userRevealed}
          toggleRevealIdentity={toggleRevealIdentity}
          darkMode={darkMode}
          getRiskLevelColor={(score: number) => score >= 80 ? 'text-red-400' : score >= 60 ? 'text-orange-400' : score >= 40 ? 'text-yellow-400' : 'text-green-400'}
          getRiskLevelBg={(score: number) => score >= 80 ? 'bg-red-500/10' : score >= 60 ? 'bg-orange-500/10' : score >= 40 ? 'bg-yellow-500/10' : 'bg-green-500/10'}
        />
      )}
    </div>
  );
};

export default App;
