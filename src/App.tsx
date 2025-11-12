import { useState, useEffect, useRef } from 'react';

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
   }>>([
     { id: 'AL-7821', severity: 'critical', title: 'Unusual Data Exfiltration', user: 'U-4582', time: '2 min ago', status: 'open' },
     { id: 'AL-7822', severity: 'high', title: 'Multiple Failed Logins', user: 'U-2391', time: '8 min ago', status: 'acknowledged' },
     { id: 'AL-7823', severity: 'medium', title: 'Privilege Escalation Attempt', user: 'U-8901', time: '23 min ago', status: 'open' },
     { id: 'AL-7824', severity: 'low', title: 'Policy Violation', user: 'U-1245', time: '1 hour ago', status: 'resolved' }
   ]);
   const [users] = useState<Array<{
     id: string;
     name: string;
     riskScore: number;
     anomalies: number;
     lastActive: string;
     department: string;
     peerComparison: number;
   }>>([
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
   const [selectedUser, setSelectedUser] = useState<{
     id: string;
     riskScore: number;
     anomalies: number;
     lastActive: string;
     department: string;
     name: string;
     email: string;
     title: string;
     location: string;
     manager: string;
     hireDate: string;
     accessLevel: string;
     devices: number;
     applications: number;
     dataAccess: string;
     peerComparison: number;
     behavioralTrends: Array<{
       date: string;
       score: number;
       loginCount: number;
       dataAccess: number;
       anomalies: number;
     }>;
     recentActivities: Array<{
       action: string;
       time: string;
       risk: string;
     }>;
     riskFactors: Array<{
       factor: string;
       score: number;
     }>;
   } | null>(null);
   const [profileTab, setProfileTab] = useState('overview');

   const websocketRef = useRef<WebSocket | null>(null);

  // Setup WebSocket for real-time updates
  useEffect(() => {
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

  const openUserProfile = (user: {
    id: string;
    riskScore: number;
    anomalies: number;
    lastActive: string;
    department: string;
    name: string;
    email: string;
    title: string;
    location: string;
    manager: string;
    hireDate: string;
    accessLevel: string;
    devices: number;
    applications: number;
    dataAccess: string;
    peerComparison: number;
    behavioralTrends: Array<{
      date: string;
      score: number;
      loginCount: number;
      dataAccess: number;
      anomalies: number;
    }>;
    recentActivities: Array<{
      action: string;
      time: string;
      risk: string;
    }>;
    riskFactors: Array<{
      factor: string;
      score: number;
    }>;
  }) => {
    setSelectedUser(user);
    setProfileTab('overview');
  };







  const getSeverityColor = (severity: string, darkMode: boolean) => {
    if (darkMode) {
      switch (severity) {
        case 'critical': return 'severity-critical-dark';
        case 'high': return 'severity-high-dark';
        case 'medium': return 'severity-medium-dark';
        case 'low': return 'severity-low-dark';
        default: return 'severity-medium-dark';
      }
    } else {
      switch (severity) {
        case 'critical': return 'severity-critical-light';
        case 'high': return 'severity-high-light';
        case 'medium': return 'severity-medium-light';
        case 'low': return 'severity-low-light';
        default: return 'severity-medium-light';
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
    <div className={`min-h-screen ${darkMode ? 'dark-mode' : 'light-mode'}`} style={{
      backgroundColor: darkMode ? 'var(--bg-primary)' : 'var(--bg-primary)',
      color: darkMode ? 'var(--text-primary)' : 'var(--text-primary)'
    }}>
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sidebarOpen={sidebarOpen}
        darkMode={darkMode}
      />

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Top Navigation */}
        <header className={`sticky top-0 z-40 backdrop-blur-sm border-b`} style={{
          backgroundColor: darkMode ? 'var(--bg-surface)' : 'var(--bg-surface)',
          borderColor: darkMode ? 'var(--border-color)' : 'var(--border-color)'
        }}>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:opacity-80"
                style={{
                  backgroundColor: darkMode ? 'var(--accent-background)' : 'var(--accent-background)'
                }}
                aria-label="Toggle sidebar"
              >
                <ChevronDown className={`w-5 h-5 transform ${sidebarOpen ? 'rotate-90' : '-rotate-90'}`} />
              </button>
              <h2 className="text-xl font-semibold capitalize">
                {menuItems.find(item => item.id === currentPage)?.label}
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:opacity-80" style={{
                backgroundColor: darkMode ? 'var(--accent-background)' : 'var(--accent-background)'
              }} aria-label="Notifications">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-danger)' }}></span>
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:opacity-80"
                style={{
                  backgroundColor: darkMode ? 'var(--accent-background)' : 'var(--accent-background)'
                }}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <div className="w-8 h-8 rounded-full" style={{
                background: `linear-gradient(to right, var(--color-brand-primary), var(--color-brand-secondary))`
              }}></div>
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
