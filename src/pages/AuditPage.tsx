import React, { useState } from 'react';
import { mockAuditLogs } from '../data/mockData';
import { AuditLog } from '../types';
import { 
  Clock, User, Eye, Edit, Plus, Trash, Search, 
  LogIn, LogOut, Filter, Download
} from 'lucide-react';

const AuditPage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    action: '',
    user: '',
    startDate: '',
    endDate: ''
  });
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
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
      case 'logout':
        return <LogOut size={16} className="text-orange-400" />;
      default:
        return <Clock size={16} className="text-slate-400" />;
    }
  };
  
  // Format a timestamp string to a readable date and time
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  
  return (
    <div className="bg-slate-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Audit Trail & Logging</h1>
        
        <div className="flex items-center space-x-2">
          <button 
            className="flex items-center px-3 py-1.5 bg-slate-700 text-white rounded-md hover:bg-slate-600"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} className="mr-2" />
            <span>Filter</span>
          </button>
          
          <button className="flex items-center px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700">
            <Download size={16} className="mr-2" />
            <span>Ekspor</span>
          </button>
        </div>
      </div>
      
      {showFilters && (
        <div className="bg-slate-700 rounded-lg p-4 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Aksi</label>
            <select 
              name="action"
              value={filters.action}
              onChange={handleFilterChange}
              className="w-full p-2 bg-slate-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Aksi</option>
              <option value="view">Lihat</option>
              <option value="create">Buat</option>
              <option value="update">Perbarui</option>
              <option value="delete">Hapus</option>
              <option value="search">Cari</option>
              <option value="login">Login</option>
              <option value="logout">Logout</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-slate-400 mb-1">Pengguna</label>
            <select 
              name="user"
              value={filters.user}
              onChange={handleFilterChange}
              className="w-full p-2 bg-slate-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Pengguna</option>
              <option value="Administrator Sistem">Administrator Sistem</option>
              <option value="Petugas Lapangan">Petugas Lapangan</option>
              <option value="Analis Data">Analis Data</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-slate-400 mb-1">Dari Tanggal</label>
            <input 
              type="date" 
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="w-full p-2 bg-slate-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm text-slate-400 mb-1">Sampai Tanggal</label>
            <input 
              type="date" 
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="w-full p-2 bg-slate-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}
      
      <div className="bg-slate-700 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-slate-600">
          <thead className="bg-slate-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Waktu
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Pengguna
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Aksi
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                Detail
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                IP Address
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-600">
            {mockAuditLogs.map((log: AuditLog) => (
              <tr key={log.id} className="hover:bg-slate-600">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                  {formatTimestamp(log.timestamp)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-slate-600 flex items-center justify-center">
                      <User size={14} className="text-slate-300" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-white">{log.userName}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="p-1.5 rounded-full bg-slate-600 mr-2">
                      {getActionIcon(log.action)}
                    </div>
                    <span className="text-sm text-slate-300 capitalize">{log.action}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-300">
                  {log.details}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                  {log.ipAddress}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <p className="text-sm text-slate-400">Menampilkan {mockAuditLogs.length} dari 135 entri</p>
        
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 bg-slate-700 rounded-md text-slate-400 hover:bg-slate-600">
            Sebelumnya
          </button>
          <button className="px-3 py-1 bg-red-600 rounded-md text-white">
            1
          </button>
          <button className="px-3 py-1 bg-slate-700 rounded-md text-slate-400 hover:bg-slate-600">
            2
          </button>
          <button className="px-3 py-1 bg-slate-700 rounded-md text-slate-400 hover:bg-slate-600">
            3
          </button>
          <button className="px-3 py-1 bg-slate-700 rounded-md text-slate-400 hover:bg-slate-600">
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuditPage;