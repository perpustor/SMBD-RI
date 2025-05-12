import React from 'react';
import { Clock, User, Eye, Edit, Plus, Trash, Search, LogIn } from 'lucide-react';
import { AuditLog } from '../../types';

interface RecentActivitiesProps {
  activities: AuditLog[];
}

const RecentActivities: React.FC<RecentActivitiesProps> = ({ activities }) => {
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'view':
        return <Eye size={16} className="text-blue-400" />;
      case 'create':
        return <Plus size={16} className="text-green-400" />;
      case 'update':
        return <Edit size={16} className="text-yellow-400" />;
      case 'delete':
        return <Trash size={16} className="text-red-400" />;
      case 'search':
        return <Search size={16} className="text-purple-400" />;
      case 'login':
        return <LogIn size={16} className="text-teal-400" />;
      default:
        return <Clock size={16} className="text-slate-400" />;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-slate-800 rounded-lg shadow-md p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Aktivitas Terbaru</h3>
        <a href="/audit" className="text-sm text-blue-400 hover:underline">Lihat Semua</a>
      </div>
      
      <div className="space-y-4">
        {activities.map(activity => (
          <div key={activity.id} className="flex items-start p-3 bg-slate-700 rounded-md hover:bg-slate-600 transition-colors">
            <div className="p-2 rounded-full bg-slate-600 mr-3">
              {getActionIcon(activity.action)}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <span className="text-sm font-medium text-white">{activity.userName}</span>
                <span className="ml-auto text-xs text-slate-400">{formatTime(activity.timestamp)}</span>
              </div>
              <p className="text-sm text-slate-300">{activity.details}</p>
              <div className="flex items-center mt-1">
                <User size={12} className="text-slate-400 mr-1" />
                <span className="text-xs text-slate-400">{activity.ipAddress}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivities;