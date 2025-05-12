import React, { useState } from 'react';
import { Search, Filter, List, Grid, ChevronDown } from 'lucide-react';
import RecordCard from './RecordCard';
import { Record, SearchFilters } from '../../types';

interface RecordsListProps {
  records: Record[];
}

const RecordsList: React.FC<RecordsListProps> = ({ records }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <div className="bg-slate-800 rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white mb-4 sm:mb-0">Database Individu</h2>
        
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama..."
              className="w-full pl-10 pr-4 py-2 bg-slate-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button 
            className="p-2 bg-slate-700 rounded-md text-white hover:bg-slate-600 flex items-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} className="mr-2" />
            <span className="hidden md:inline">Filter</span>
            <ChevronDown size={16} className={`ml-1 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          
          <div className="flex border border-slate-600 rounded-md overflow-hidden">
            <button 
              className={`p-2 ${viewMode === 'grid' ? 'bg-slate-600 text-white' : 'bg-slate-700 text-slate-400'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={20} />
            </button>
            <button 
              className={`p-2 ${viewMode === 'list' ? 'bg-slate-600 text-white' : 'bg-slate-700 text-slate-400'}`}
              onClick={() => setViewMode('list')}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>
      
      {showFilters && (
        <div className="bg-slate-700 rounded-lg p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Jenis Kasus</label>
            <select 
              name="caseType"
              value={filters.caseType || ''}
              onChange={handleFilterChange}
              className="w-full p-2 bg-slate-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Jenis</option>
              <option value="Korupsi">Korupsi</option>
              <option value="Pencucian Uang">Pencucian Uang</option>
              <option value="Suap">Suap</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm text-slate-400 mb-1">Status</label>
            <select 
              name="status"
              value={filters.status || ''}
              onChange={handleFilterChange}
              className="w-full p-2 bg-slate-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Status</option>
              <option value="Wanted">DPO</option>
              <option value="Detained">Ditahan</option>
              <option value="Released">Bebas</option>
              <option value="Under Investigation">Penyelidikan</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Dari Tanggal</label>
              <input 
                type="date" 
                name="startDate"
                value={filters.startDate || ''}
                onChange={handleFilterChange}
                className="w-full p-2 bg-slate-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm text-slate-400 mb-1">Sampai Tanggal</label>
              <input 
                type="date" 
                name="endDate"
                value={filters.endDate || ''}
                onChange={handleFilterChange}
                className="w-full p-2 bg-slate-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      )}
      
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {records.map(record => (
            <RecordCard key={record.id} record={record} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {records.map(record => (
            <div 
              key={record.id} 
              className="bg-slate-700 rounded-lg p-4 flex items-center hover:bg-slate-600 transition-colors"
            >
              <img 
                src={record.photoUrl} 
                alt={record.fullName} 
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              
              <div className="flex-1">
                <h3 className="text-white font-medium">{record.fullName}</h3>
                <p className="text-sm text-red-400">{record.caseType}: {record.criminalAct}</p>
                <div className="text-xs text-slate-400 mt-1">
                  Kasus: {new Date(record.caseDate).toLocaleDateString('id-ID')}
                </div>
              </div>
              
              <div>
                {record.status === 'Wanted' && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">DPO</span>
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
          ))}
        </div>
      )}
      
      <div className="mt-6 flex justify-between items-center">
        <p className="text-sm text-slate-400">Menampilkan {records.length} dari {records.length} data</p>
        
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
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordsList;