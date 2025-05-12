import React, { useState } from 'react';
import { Bell, Menu, Search, LogOut, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-slate-800 text-white h-16 fixed w-full z-10 shadow-md">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center">
          <button
            className="p-2 mr-2 text-slate-300 hover:text-white focus:outline-none lg:hidden"
            onClick={toggleSidebar}
          >
            <Menu size={24} />
          </button>
          <Link to="/" className="flex items-center">
            <Shield className="h-8 w-8 text-red-500 mr-2" />
            <span className="text-xl font-bold tracking-tight hidden md:block">SMBD-RI</span>
            <span className="text-xs text-slate-400 ml-2 hidden md:block">by DEPTEL</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center bg-slate-700 rounded-md px-3 w-1/3">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Cari rekam jejak..."
            className="bg-transparent border-none text-white px-3 py-2 w-full focus:outline-none"
          />
        </div>

        <div className="flex items-center">
          <button className="p-2 text-slate-300 hover:text-white relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
          </button>
          
          <div className="relative ml-4">
            <button 
              className="flex items-center"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-sm font-medium">
                A
              </div>
              <span className="ml-2 text-sm font-medium hidden md:block">Admin</span>
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-700 rounded-md shadow-lg py-1 z-20">
                <Link to="/profile" className="block px-4 py-2 text-sm text-white hover:bg-slate-600">
                  Profil
                </Link>
                <Link to="/settings" className="block px-4 py-2 text-sm text-white hover:bg-slate-600">
                  Pengaturan
                </Link>
                <div className="border-t border-slate-600 my-1"></div>
                <Link to="/logout" className="flex items-center px-4 py-2 text-sm text-red-400 hover:bg-slate-600">
                  <LogOut size={16} className="mr-2" />
                  Keluar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;