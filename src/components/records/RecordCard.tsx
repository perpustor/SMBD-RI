import React from 'react';
import { Calendar, Clock, AlertTriangle, Shield } from 'lucide-react';
import { Record } from '../../types';
import { Link } from 'react-router-dom';

interface RecordCardProps {
  record: Record;
}

const RecordCard: React.FC<RecordCardProps> = ({ record }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Wanted':
        return (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <AlertTriangle size={12} className="mr-1" />
            DPO
          </span>
        );
      case 'Detained':
        return (
          <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <Shield size={12} className="mr-1" />
            Ditahan
          </span>
        );
      case 'Released':
        return (
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <Clock size={12} className="mr-1" />
            Bebas
          </span>
        );
      case 'Under Investigation':
        return (
          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <Clock size={12} className="mr-1" />
            Penyelidikan
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <Link 
      to={`/records/${record.id}`}
      className="bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative">
        <img 
          src={record.photoUrl} 
          alt={record.fullName} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          {getStatusBadge(record.status)}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-1">{record.fullName}</h3>
        <p className="text-sm text-red-400 font-medium mb-3">{record.caseType}: {record.criminalAct}</p>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center text-slate-400">
            <Calendar size={12} className="mr-1" />
            <span>Kasus: {new Date(record.caseDate).toLocaleDateString('id-ID')}</span>
          </div>
          <div className="flex items-center text-slate-400">
            <Clock size={12} className="mr-1" />
            <span>Masuk: {new Date(record.entryDate).toLocaleDateString('id-ID')}</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xs text-slate-500">ID: {record.id}</span>
          <span className="text-xs text-blue-400 hover:underline">Detail Lengkap</span>
        </div>
      </div>
    </Link>
  );
};

export default RecordCard;