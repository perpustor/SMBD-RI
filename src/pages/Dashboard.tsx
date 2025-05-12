import React from 'react';
import { Database, Users, AlertTriangle, BarChart2 } from 'lucide-react';
import StatisticsCard from '../components/dashboard/StatisticsCard';
import CaseChart from '../components/dashboard/CaseChart';
import RecentActivities from '../components/dashboard/RecentActivities';
import { mockDashboardStats, mockAuditLogs, mockRecords } from '../data/mockData';
import RecordCard from '../components/records/RecordCard';

const Dashboard: React.FC = () => {
  // Get the most recent 3 records
  const recentRecords = mockRecords.slice(0, 3);
  // Get the most recent 5 audit logs
  const recentActivities = mockAuditLogs.slice(0, 5);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
            Laporan Terbaru
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatisticsCard 
          title="Total Individu Tercatat" 
          value={mockDashboardStats.totalRecords}
          icon={<Database size={24} className="text-blue-400" />}
          change={{ value: 12, isPositive: true }}
          bgColor="bg-slate-800"
        />
        
        <StatisticsCard 
          title="Kasus Baru (30 Hari)" 
          value={mockDashboardStats.recentCases}
          icon={<BarChart2 size={24} className="text-green-400" />}
          change={{ value: 8, isPositive: true }}
          bgColor="bg-slate-800"
        />
        
        <StatisticsCard 
          title="DPO Aktif" 
          value={mockDashboardStats.casesByStatus.Wanted}
          icon={<AlertTriangle size={24} className="text-red-400" />}
          change={{ value: 5, isPositive: false }}
          bgColor="bg-slate-800"
        />
        
        <StatisticsCard 
          title="Pembebasan Bersyarat" 
          value={mockDashboardStats.casesByStatus.Released}
          icon={<Users size={24} className="text-yellow-400" />}
          change={{ value: 3, isPositive: true }}
          bgColor="bg-slate-800"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CaseChart 
            data={mockDashboardStats.casesTrend} 
            title="Tren Kasus Korupsi (2023)"
          />
        </div>
        
        <div>
          <RecentActivities activities={recentActivities} />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Data Terbaru</h2>
          <a href="/records" className="text-sm text-blue-400 hover:underline">Lihat Semua</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentRecords.map(record => (
            <RecordCard key={record.id} record={record} />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg shadow-md p-5">
          <h3 className="text-lg font-semibold text-white mb-4">Distribusi Kasus Berdasarkan Jenis</h3>
          
          <div className="space-y-4">
            {Object.entries(mockDashboardStats.casesByType).map(([type, count]) => {
              const total = Object.values(mockDashboardStats.casesByType).reduce((a, b) => a + b, 0);
              const percentage = (count / total) * 100;
              
              let barColor;
              switch (type) {
                case 'Korupsi':
                  barColor = 'bg-red-500';
                  break;
                case 'Pencucian Uang':
                  barColor = 'bg-blue-500';
                  break;
                case 'Suap':
                  barColor = 'bg-yellow-500';
                  break;
                default:
                  barColor = 'bg-gray-500';
              }
              
              return (
                <div key={type}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-white">{type}</span>
                    <span className="text-sm text-slate-400">{count} kasus ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2.5">
                    <div 
                      className={`${barColor} h-2.5 rounded-full`} 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg shadow-md p-5">
          <h3 className="text-lg font-semibold text-white mb-4">Distribusi Status Kasus</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(mockDashboardStats.casesByStatus).map(([status, count]) => {
              const total = Object.values(mockDashboardStats.casesByStatus).reduce((a, b) => a + b, 0);
              const percentage = (count / total) * 100;
              
              let statusColor, statusName;
              switch (status) {
                case 'Detained':
                  statusColor = 'bg-yellow-500';
                  statusName = 'Ditahan';
                  break;
                case 'Released':
                  statusColor = 'bg-green-500';
                  statusName = 'Bebas';
                  break;
                case 'Wanted':
                  statusColor = 'bg-red-500';
                  statusName = 'DPO';
                  break;
                case 'Under Investigation':
                  statusColor = 'bg-blue-500';
                  statusName = 'Penyelidikan';
                  break;
                default:
                  statusColor = 'bg-gray-500';
                  statusName = status;
              }
              
              return (
                <div key={status} className="bg-slate-700 p-4 rounded-lg text-center">
                  <div className={`w-12 h-12 ${statusColor} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                    <span className="text-lg font-bold text-white">{percentage.toFixed(0)}%</span>
                  </div>
                  <p className="text-white font-medium">{statusName}</p>
                  <p className="text-sm text-slate-400">{count} kasus</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;