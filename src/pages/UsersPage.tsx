import React from 'react';
import { Search, Eye, EyeOff } from 'lucide-react';

interface UsersPageProps {
  users: Array<{
    id: string;
    name: string;
    riskScore: number;
    anomalies: number;
    lastActive: string;
    department: string;
    peerComparison: number;
  }>;
  userRevealed: { [key: string]: boolean };
  toggleRevealIdentity: (userId: string) => void;
  openUserProfile: (user: any) => void;
}

const UsersPage: React.FC<UsersPageProps & { darkMode: boolean }> = ({
  users,
  userRevealed,
  toggleRevealIdentity,
  openUserProfile,
  darkMode

}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-600'}`}>User Management</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            <input
              type="text"
              placeholder="Search users..."
              className={`${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} border rounded-lg pl-10 pr-4 py-2 w-80`}
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white">
            + Add User
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className={`${darkMode ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {userRevealed[user.id] ? user.name : user.id}
                    </h3>
                    <button
                      onClick={() => toggleRevealIdentity(user.id)}
                      className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} p-1`}
                    >
                      {userRevealed[user.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user.department}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  user.riskScore > 80 ? (darkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-50 text-red-700 border-red-300') :
                  user.riskScore > 60 ? (darkMode ? 'bg-orange-500/20 text-orange-400' : 'bg-orange-50 text-orange-700 border-orange-300') :
                  (darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-50 text-green-700 border-green-300')
                }`}>
                  Risk: {user.riskScore}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Anomalies</span>
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.anomalies}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Last Active</span>
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.lastActive}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Peer Comparison</span>
                  <span className={user.riskScore > user.peerComparison ? (darkMode ? 'text-red-400 font-medium' : 'text-red-600 font-medium') : (darkMode ? 'text-green-400 font-medium' : 'text-green-600 font-medium')}>
                    {user.peerComparison}
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => openUserProfile(user)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm"
                >
                  View Profile
                </button>
                <button className={`flex-1 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} text-white py-2 px-3 rounded-lg text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}>
        <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Behavioral Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'} rounded-lg p-4`}>
            <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Login Patterns</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Normal hours</span>
                <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>68%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>After hours</span>
                <span className={`${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>32%</span>
              </div>
            </div>
          </div>
          <div className={`${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'} rounded-lg p-4`}>
            <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Data Access</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Normal volume</span>
                <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>85%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>High volume</span>
                <span className={`${darkMode ? 'text-red-400' : 'text-red-600'}`}>15%</span>
              </div>
            </div>
          </div>
          <div className={`${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'} rounded-lg p-4`}>
            <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Application Usage</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Standard apps</span>
                <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>92%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Shadow IT</span>
                <span className={`${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;