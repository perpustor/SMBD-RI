import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Users, Database, Clock, FileText, Shield, Settings, 
  Search, BarChart2, AlertTriangle, Eye
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', icon: <Home size={20} />, label: 'Dashboard' },
    { path: '/records', icon: <Database size={20} />, label: 'Database Individu' },
    { path: '/search', icon: <Search size={20} />, label: 'Pencarian Cerdas' },
    { path: '/analytics', icon: <BarChart2 size={20} />, label: 'Analitik' },
    { path: '/wanted', icon: <AlertTriangle size={20} />, label: 'Daftar DPO' },
    { path: '/audit', icon: <Eye size={20} />, label: 'Audit Trail' },
    { path: '/reports', icon: <FileText size={20} />, label: 'Laporan' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Pengaturan' },
  ];

  // Determine if a menu item is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className={`fixed inset-y-0 left-0 bg-slate-900 text-white w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out z-20 pt-16`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-slate-700">
          <div className="bg-slate-800 rounded-md p-3 flex items-center">
            <Shield className="text-red-500 mr-2" size={20} />
            <div>
              <p className="text-sm font-medium">SMBD-RI</p>
              <p className="text-xs text-slate-400">Sistem Manajemen Basis Data RI</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'bg-red-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-slate-700">
          <div className="text-xs text-slate-400 mb-2">Akses sebagai</div>
          <div className="flex items-center space-x-3 bg-slate-800 rounded-md p-2">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
              <Users size={14} />
            </div>
            <div>
              <p className="text-sm font-medium">Administrator</p>
              <p className="text-xs text-slate-400">Akses Penuh</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;