import React from 'react';
import { Plus, Eye, Download } from 'lucide-react';

const ReportsPage: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className={`text-3xl font-bold  ${darkMode ? 'text-white' : 'text-gray-600'}`}>Reports & Compliance</h1>
        <div className="flex items-center space-x-4">
            
          <select className={` border rounded-lg px-4 py-2  ${darkMode ? 'bg-gray-800 border-gray-700  text-white' : 'bg-gray-200 text-gray-800'}`}>
            <option>Q4 2025</option>
            <option>Q3 2025</option>
            <option>Q2 2025</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center space-x-2">
            <Plus />
            <span>New Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}>
            <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Report Library</h3>
            </div>
            <div className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {[
                {
                  title: 'SOC 2 Type II Evidence Pack',
                  description: 'Comprehensive evidence for SOC 2 compliance audit',
                  date: 'Generated Nov 10, 2025',
                  status: 'ready'
                },
                {
                  title: 'Monthly Risk Posture',
                  description: 'Executive summary of security posture and trends',
                  date: 'Generated Nov 5, 2025',
                  status: 'ready'
                },
                {
                  title: 'GDPR DSAR Bundle',
                  description: 'Data Subject Access Request response package',
                  date: 'Generated Oct 28, 2025',
                  status: 'ready'
                },
                {
                  title: 'UEBA False Positive Analysis',
                  description: 'Detailed analysis of detection accuracy',
                  date: 'Generated Oct 22, 2025',
                  status: 'processing'
                }
              ].map((report, index) => (
                <div key={index} className={`${darkMode ? 'hover:bg-gray-700/30' : 'hover:bg-gray-50'} p-6`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{report.title}</h4>
                      <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{report.description}</p>
                      <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{report.date}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      {report.status === 'ready' ? (
                        <>
                          <button aria-label="View report" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} p-2`}>
                            <Eye className="w-4 h-4" />
                          </button>
                          <button aria-label="Download report" className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg">
                            <Download className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-xs ${darkMode ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-800 border-yellow-400'}`}>
                          Processing...
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}>
            <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Compliance Status</h3>
            <div className="space-y-4">
              {[
                { framework: 'NIST CSF', progress: 85, color: 'bg-blue-500' },
                { framework: 'ISO 27001', progress: 92, color: 'bg-green-500' },
                { framework: 'SOC 2', progress: 78, color: 'bg-purple-500' },
                { framework: 'GDPR', progress: 88, color: 'bg-orange-500' }
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.framework}</span>
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.progress}%</span>
                  </div>
                  <div className={`w-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                    <div
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-sm rounded-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}>
            <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Scheduled Reports</h3>
            <div className="space-y-3">
              {[
                { name: 'Daily Alert Summary', schedule: 'Every day at 8 AM', next: 'Tomorrow' },
                { name: 'Weekly Risk Report', schedule: 'Every Monday at 9 AM', next: 'Nov 18, 2025' },
                { name: 'Monthly Compliance', schedule: '1st of month at 10 AM', next: 'Dec 1, 2025' }
              ].map((schedule, index) => (
                <div key={index} className={`${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'} rounded-lg p-3`}>
                  <h4 className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{schedule.name}</h4>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{schedule.schedule}</p>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Next: {schedule.next}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;