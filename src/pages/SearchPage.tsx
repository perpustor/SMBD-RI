import React, { useState } from 'react';
import { Search, AlertTriangle } from 'lucide-react';
import { mockRecords } from '../data/mockData';
import { Record } from '../types';
import { Link } from 'react-router-dom';

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Record[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim()) {
      // Simple search implementation - in a real app this would be more sophisticated
      const results = mockRecords.filter(record => 
        record.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(results);
      setHasSearched(true);
    }
  };
  
  return (
    <div className="bg-slate-800 rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Pencarian Cerdas</h1>
      
      {/* Search Form */}
      <div className="bg-slate-700 rounded-lg p-6 mb-8">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Masukkan nama lengkap individu..."
              className="w-full pl-12 pr-4 py-3 bg-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Search size={20} className="text-slate-400" />
            </div>
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 transition-colors"
            >
              Cari
            </button>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-slate-400">Pencarian populer:</span>
            <button 
              type="button"
              onClick={() => setSearchQuery('Budi')}
              className="text-sm bg-slate-600 text-slate-300 px-2 py-1 rounded-md hover:bg-slate-500"
            >
              Budi
            </button>
            <button 
              type="button"
              onClick={() => setSearchQuery('Siti')}
              className="text-sm bg-slate-600 text-slate-300 px-2 py-1 rounded-md hover:bg-slate-500"
            >
              Siti
            </button>
            <button 
              type="button"
              onClick={() => setSearchQuery('Agus')}
              className="text-sm bg-slate-600 text-slate-300 px-2 py-1 rounded-md hover:bg-slate-500"
            >
              Agus
            </button>
          </div>
        </form>
      </div>
      
      {/* Search Results */}
      {hasSearched && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              Hasil Pencarian untuk "{searchQuery}"
            </h2>
            <span className="text-sm text-slate-400">
              {searchResults.length} hasil ditemukan
            </span>
          </div>
          
          {searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map(record => (
                <Link
                  key={record.id}
                  to={`/records/${record.id}`}
                  className="block bg-slate-700 rounded-lg overflow-hidden shadow-md hover:bg-slate-600 transition-colors"
                >
                  <div className="flex items-start p-4">
                    <img 
                      src={record.photoUrl} 
                      alt={record.fullName} 
                      className="w-20 h-20 object-cover rounded-md mr-4"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{record.fullName}</h3>
                          <p className="text-sm text-red-400 mt-1">{record.caseType}: {record.criminalAct}</p>
                        </div>
                        
                        <div>
                          {record.status === 'Wanted' && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                              <AlertTriangle size={12} className="mr-1" />
                              DPO
                            </span>
                          )}
                          {record.status === 'Detained' && (
                            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">Ditahan</span>
                          )}
                          {record.status === 'Released' && (
                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Bebas</span>
                          )}
                          {record.status === 'Under Investigation' && (
                            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Penyelidikan</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-slate-400">
                        <div>
                          <span className="block">Tanggal Kejadian:</span>
                          <span className="text-white">{new Date(record.caseDate).toLocaleDateString('id-ID')}</span>
                        </div>
                        <div>
                          <span className="block">Tanggal Dicatat:</span>
                          <span className="text-white">{new Date(record.entryDate).toLocaleDateString('id-ID')}</span>
                        </div>
                      </div>
                      
                      {record.history.length > 0 && (
                        <div className="mt-3">
                          <span className="text-xs text-slate-400">Riwayat Terakhir:</span>
                          <p className="text-sm text-slate-300 mt-1">{record.history[0]}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-slate-700 rounded-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <Search size={48} className="text-slate-500" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Tidak Ada Hasil</h3>
              <p className="text-slate-400">
                Tidak ditemukan data untuk pencarian "{searchQuery}".
                Coba kata kunci yang berbeda atau periksa ejaan.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;