import React from 'react';
import {
  X,
  Eye,
  EyeOff,
  ShieldAlert,
  BarChart3,
  Activity,
  AlertCircle,
  User,
  CheckCircle,
  Shield
} from 'lucide-react';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

interface User {
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
}

interface UserProfileModalProps {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  profileTab: string;
  setProfileTab: (tab: string) => void;
  userRevealed: { [key: string]: boolean };
  toggleRevealIdentity: (userId: string) => void;
  darkMode: boolean;
  getRiskLevelColor: (score: number) => string;
  getRiskLevelBg: (score: number) => string;
}

const BehavioralTooltip: React.FC<{ active?: boolean; payload?: Array<{ dataKey: string; value: number }>; label?: string }> = ({ active, payload, label }) => {
  if (active && payload && payload.length > 0) {
    const riskScore = payload.find((p) => p.dataKey === 'riskScore')?.value || 0;
    const loginCount = payload.find((p) => p.dataKey === 'loginCount')?.value || 0;
    const dataAccess = payload.find((p) => p.dataKey === 'dataAccess')?.value || 0;
    const anomalies = payload.find((p) => p.dataKey === 'anomalies')?.value || 0;

    return (
      <div className="p-4 rounded-lg shadow-lg border bg-gray-800 border-gray-700">
        <p className="font-bold text-white mb-2">{label}</p>
        <div className="space-y-1">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-gray-300 mr-2">Risk Score:</span>
            <span className="text-white font-medium">{riskScore}</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
            <span className="text-gray-300 mr-2">Logins:</span>
            <span className="text-white font-medium">{loginCount}</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-gray-300 mr-2">Data Access (MB):</span>
            <span className="text-white font-medium">{dataAccess}</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-gray-300 mr-2">Anomalies:</span>
            <span className="text-white font-medium">{anomalies}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  selectedUser,
  setSelectedUser,
  profileTab,
  setProfileTab,
  userRevealed,
  toggleRevealIdentity,
  darkMode,
  getRiskLevelColor,
  getRiskLevelBg
}) => {
  if (!selectedUser) return null;

  const chartData = selectedUser.behavioralTrends.map(point => ({
    date: point.date,
    riskScore: point.score || 0,
    loginCount: point.loginCount || 0,
    dataAccess: point.dataAccess || 0,
    anomalies: point.anomalies || 0
  }));

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`w-full max-w-6xl rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} max-h-[90vh] flex flex-col`}>
        {/* Header */}
        <div className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-100 border-gray-200'} border-b p-6`}>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                {selectedUser.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="flex items-center space-x-3">
                  <h2 className="text-2xl font-bold text-white">
                    {userRevealed[selectedUser.id] ? selectedUser.name : selectedUser.id}
                  </h2>
                  <button
                    onClick={() => toggleRevealIdentity(selectedUser.id)}
                    className="text-gray-400 hover:text-white p-1"
                  >
                    {userRevealed[selectedUser.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskLevelBg(selectedUser.riskScore)}`}>
                    <span className={getRiskLevelColor(selectedUser.riskScore)}>
                      Risk Score: {selectedUser.riskScore}
                    </span>
                  </span>
                </div>
                <div className="flex items-center space-x-4 mt-1 text-gray-400">
                  <span>{selectedUser.title}</span>
                  <span>•</span>
                  <span>{selectedUser.department}</span>
                  <span>•</span>
                  <span>{selectedUser.email}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedUser(null)}
              className="text-gray-400 hover:text-white p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'} border-b`}>
          <div className="flex">
            {['overview', 'behavior', 'activities', 'risk'].map((tab) => (
              <button
                key={tab}
                onClick={() => setProfileTab(tab)}
                className={`px-6 py-3 font-medium capitalize ${
                  profileTab === tab
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab === 'overview' && <ShieldAlert className="w-4 h-4 inline mr-2" />}
                {tab === 'behavior' && <BarChart3 className="w-4 h-4 inline mr-2" />}
                {tab === 'activities' && <Activity className="w-4 h-4 inline mr-2" />}
                {tab === 'risk' && <AlertCircle className="w-4 h-4 inline mr-2" />}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {profileTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Info */}
                <div className="bg-gray-900/50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    User Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Full Name</p>
                      <p className="text-white">{selectedUser.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white">{selectedUser.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Title</p>
                      <p className="text-white">{selectedUser.title}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Department</p>
                      <p className="text-white">{selectedUser.department}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Manager</p>
                      <p className="text-white">{selectedUser.manager}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Hire Date</p>
                      <p className="text-white">{selectedUser.hireDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Access Level</p>
                      <p className="text-white">{selectedUser.accessLevel}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-white">{selectedUser.location}</p>
                    </div>
                  </div>
                </div>

                {/* Activity Summary */}
                <div className="bg-gray-900/50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Activity Summary
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <p className="text-gray-400 text-sm">Devices</p>
                      <p className="text-2xl font-bold text-white">{selectedUser.devices}</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <p className="text-gray-400 text-sm">Applications</p>
                      <p className="text-2xl font-bold text-white">{selectedUser.applications}</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <p className="text-gray-400 text-sm">Data Access</p>
                      <p className="text-2xl font-bold text-white">{selectedUser.dataAccess}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Risk Comparison */}
                <div className="bg-gray-900/50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-4">Risk Comparison</h3>
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 relative">
                      <svg className="w-32 h-32" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#374151" strokeWidth="8" />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke={selectedUser.riskScore >= 80 ? "#EF4444" : selectedUser.riskScore >= 60 ? "#F59E0B" : selectedUser.riskScore >= 40 ? "#EAB308" : "#10B981"}
                          strokeWidth="8"
                          strokeDasharray={`${2 * Math.PI * 45}`}
                          strokeDashoffset={`${2 * Math.PI * 45 * (1 - selectedUser.riskScore / 100)}`}
                          transform="rotate(-90 50 50)"
                        />
                        <text x="50" y="55" textAnchor="middle" className="text-2xl font-bold fill-white">
                          {selectedUser.riskScore}
                        </text>
                      </svg>
                    </div>
                    <p className="mt-4 text-center">
                      <span className="text-gray-400">Peer Group Average:</span>
                      <span className={`ml-2 font-bold ${selectedUser.riskScore > selectedUser.peerComparison ? 'text-red-400' : 'text-green-400'}`}>
                        {selectedUser.peerComparison}
                      </span>
                    </p>
                    <p className={`mt-2 text-sm ${selectedUser.riskScore > selectedUser.peerComparison ? 'text-red-400' : 'text-green-400'}`}>
                      {selectedUser.riskScore > selectedUser.peerComparison ? 'Above' : 'Below'} peer average
                    </p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-900/50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm flex items-center justify-center">
                      <User className="w-4 h-4 mr-2" />
                      Suspend Account
                    </button>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm flex items-center justify-center">
                      <User className="w-4 h-4 mr-2" />
                      Notify Manager
                    </button>
                    <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-sm flex items-center justify-center">
                      <User className="w-4 h-4 mr-2" />
                      Create Incident
                    </button>
                    <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-sm flex items-center justify-center">
                      <Shield className="w-4 h-4 mr-2" />
                      Review Permissions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {profileTab === 'behavior' && (
            <div className="space-y-6">
              <div className="bg-gray-900/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Behavioral Trend Analysis
                  </h3>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm">7 days</button>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">30 days</button>
                    <button className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm">90 days</button>
                  </div>
                </div>

                {/* Enhanced Behavioral Chart with proper data handling */}
                <div className="h-80 -mx-5">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis
                        dataKey="date"
                        stroke={darkMode ? "#9CA3AF" : "#6B7280"}
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis
                        stroke={darkMode ? "#9CA3AF" : "#6B7280"}
                        domain={[0, 100]}
                        tick={{ fontSize: 12 }}
                        label={{
                          value: 'Risk Score',
                          angle: -90,
                          position: 'insideLeft',
                          fill: darkMode ? "#9CA3AF" : "#6B7280",
                          fontSize: 12
                        }}
                      />
                      <Tooltip
                        content={<BehavioralTooltip />}
                        cursor={{ stroke: '#4B5563', strokeWidth: 1, strokeDasharray: '3 3' }}
                      />
                      <Area
                        type="monotone"
                        dataKey="riskScore"
                        name="Risk Score"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        fill="url(#riskScoreGradient)"
                        fillOpacity={0.2}
                        dot={{
                          r: 4,
                          fill: "#3B82F6",
                          stroke: darkMode ? "#1E293B" : "#FFFFFF",
                          strokeWidth: 2
                        }}
                        activeDot={{
                          r: 6,
                          fill: "#3B82F6",
                          stroke: darkMode ? "#1E293B" : "#FFFFFF",
                          strokeWidth: 2
                        }}
                      />

                      {/* Login Activity Line */}
                      <Line
                        type="monotone"
                        dataKey="loginCount"
                        name="Login Count"
                        stroke="#8B5CF6"
                        strokeWidth={2}
                        dot={{
                          r: 3,
                          fill: "#8B5CF6",
                          stroke: darkMode ? "#1E293B" : "#FFFFFF",
                          strokeWidth: 1
                        }}
                        activeDot={{
                          r: 5,
                          fill: "#8B5CF6",
                          stroke: darkMode ? "#1E293B" : "#FFFFFF",
                          strokeWidth: 2
                        }}
                      />

                      {/* Data Volume Line */}
                      <Line
                        type="monotone"
                        dataKey="dataAccess"
                        name="Data Access (MB)"
                        stroke="#10B981"
                        strokeWidth={2}
                        dot={{
                          r: 3,
                          fill: "#10B981",
                          stroke: darkMode ? "#1E293B" : "#FFFFFF",
                          strokeWidth: 1
                        }}
                        activeDot={{
                          r: 5,
                          fill: "#10B981",
                          stroke: darkMode ? "#1E293B" : "#FFFFFF",
                          strokeWidth: 2
                        }}
                      />

                      {/* Define gradients */}
                      <defs>
                        <linearGradient id="riskScoreGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900/50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-4">Behavioral Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-400">Login Frequency</span>
                        <span className="text-white">{chartData[chartData.length-1].loginCount} logins</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{
                            width: `${Math.min(100, (chartData[chartData.length-1].loginCount / 20) * 100)}%`
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-400">Data Access Volume</span>
                        <span className="text-white">{chartData[chartData.length-1].dataAccess} MB</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${Math.min(100, (chartData[chartData.length-1].dataAccess / 500) * 100)}%`
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-400">Anomaly Count</span>
                        <span className="text-white">{chartData[chartData.length-1].anomalies} anomalies</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            chartData[chartData.length-1].anomalies > 3
                              ? 'bg-red-500'
                              : chartData[chartData.length-1].anomalies > 1
                                ? 'bg-orange-500'
                                : 'bg-green-500'
                          }`}
                          style={{
                            width: `${Math.min(100, (chartData[chartData.length-1].anomalies / 5) * 100)}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-4">Pattern Analysis</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mt-1 w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                      <div>
                        <p className="text-white font-medium">Login Pattern</p>
                        <p className="text-gray-400 text-sm mt-1">
                          {selectedUser.id === 'U-8901'
                            ? 'Increasing login frequency (↑25% in 7 days)'
                            : selectedUser.id === 'U-4582'
                              ? 'Weekend activity detected (3 sessions)'
                              : 'Consistent daily pattern'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                      <div>
                        <p className="text-white font-medium">Data Access Pattern</p>
                        <p className="text-gray-400 text-sm mt-1">
                          {selectedUser.id === 'U-8901'
                            ? 'Large data exports during off-hours (↑40%)'
                            : selectedUser.id === 'U-4582'
                              ? 'Sensitive database access (3x normal volume)'
                              : 'Normal access patterns'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0"></div>
                      <div>
                        <p className="text-white font-medium">Anomaly Trend</p>
                        <p className="text-gray-400 text-sm mt-1">
                          {selectedUser.id === 'U-8901'
                            ? 'Critical anomalies increasing (5 new this week)'
                            : selectedUser.id === 'U-4582'
                              ? 'Medium risk anomalies detected (3 new)'
                              : 'No significant anomalies'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {profileTab === 'activities' && (
            <div className="bg-gray-900/50 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Recent Activities
              </h3>
              <div className="space-y-4">
                {selectedUser.recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-800/50 rounded-lg">
                    <div className={`mt-1 w-2 h-2 rounded-full ${
                      activity.risk === 'critical' ? 'bg-red-500' :
                      activity.risk === 'high' ? 'bg-orange-500' :
                      activity.risk === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-white">{activity.action}</p>
                      <p className="text-gray-400 text-sm">{activity.time}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.risk === 'critical' ? 'bg-red-500/20 text-red-400' :
                      activity.risk === 'high' ? 'bg-orange-500/20 text-orange-400' :
                      activity.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                    }`}>
                      {activity.risk}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {profileTab === 'risk' && (
            <div className="space-y-6">
              <div className="bg-gray-900/50 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Risk Factor Analysis
                </h3>
                <div className="space-y-4">
                  {selectedUser.riskFactors.map((factor, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{factor.factor}</p>
                        <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                          <div
                            className={`h-2 rounded-full ${
                              factor.score >= 30 ? 'bg-red-500' :
                              factor.score >= 20 ? 'bg-orange-500' : 'bg-yellow-500'
                            }`}
                            style={{ width: `${(factor.score / 35) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className={`text-sm font-bold ${
                        factor.score >= 30 ? 'text-red-400' :
                        factor.score >= 20 ? 'text-orange-400' : 'text-yellow-400'
                      }`}>
                        +{factor.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900/50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-4">Anomaly Detection</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Unusual Login Times</span>
                      <span className="text-orange-400">Detected</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Excessive Data Access</span>
                      <span className="text-red-400">Detected</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Privilege Escalation</span>
                      <span className="text-red-400">Detected</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">New Device Login</span>
                      <span className="text-yellow-400">Detected</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-white mb-4">Recommendations</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white">Review access permissions for sensitive systems</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white">Enable additional MFA for high-risk operations</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white">Conduct security awareness training</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;