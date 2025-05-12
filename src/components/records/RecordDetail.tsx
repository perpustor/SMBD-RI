import React, { useState } from 'react';
import { 
  Calendar, Clock, AlertTriangle, ChevronLeft, 
  Edit, Printer, Download, Share2
} from 'lucide-react';
import { Record } from '../../types';
import { Link, useNavigate } from 'react-router-dom';

interface RecordDetailProps {
  record: Record;
}

const RecordDetail: React.FC<RecordDetailProps> = ({ record }) => {
  const [activeTab, setActiveTab] = useState('info');
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Wanted':
        return (
          <span className="bg-red-500 text-white px-3 py-1 rounded-full flex items-center">
            <AlertTriangle size={16} className="mr-2" />
            DPO
          </span>
        );
      case 'Detained':
        return (
          <span className="bg-yellow-500 text-white px-3 py-1 rounded-full flex items-center">
            <AlertTriangle size={16} className="mr-2" />
            Ditahan
          </span>
        );
      case 'Released':
        return (
          <span className="bg-green-500 text-white px-3 py-1 rounded-full flex items-center">
            <Clock size={16} className="mr-2" />
            Bebas
          </span>
        );
      case 'Under Investigation':
        return (
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center">
            <Clock size={16} className="mr-2" />
            Penyelidikan
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
      {/* Header with back button and actions */}
      <div className="bg-slate-700 p-4 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-300 hover:text-white"
        >
          <ChevronLeft size={20} className="mr-1" />
          <span>Kembali</span>
        </button>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 bg-slate-600 rounded-md text-slate-300 hover:text-white hover:bg-slate-500">
            <Printer size={18} />
          </button>
          <button className="p-2 bg-slate-600 rounded-md text-slate-300 hover:text-white hover:bg-slate-500">
            <Download size={18} />
          </button>
          <button className="p-2 bg-slate-600 rounded-md text-slate-300 hover:text-white hover:bg-slate-500">
            <Share2 size={18} />
          </button>
          <button className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">
            <Edit size={16} className="mr-1" />
            <span>Edit</span>
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="lg:flex">
          {/* Left column with photo and basic info */}
          <div className="lg:w-1/4 mb-6 lg:mb-0 lg:pr-6">
            <div className="relative mb-4">
              <img 
                src={record.photoUrl}
                alt={record.fullName}
                className="w-full rounded-lg shadow-md"
              />
              <div className="absolute bottom-3 right-3">
                {getStatusBadge(record.status)}
              </div>
            </div>
            
            <div className="bg-slate-700 rounded-lg p-4">
              <h3 className="text-lg font-bold text-white mb-4">Informasi Dasar</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-400">Nama Lengkap</p>
                  <p className="text-sm font-medium text-white">{record.fullName}</p>
                </div>
                
                <div>
                  <p className="text-xs text-slate-400">Jenis Kasus</p>
                  <p className="text-sm font-medium text-red-400">{record.caseType}</p>
                </div>
                
                <div>
                  <p className="text-xs text-slate-400">Tindak Pidana</p>
                  <p className="text-sm font-medium text-white">{record.criminalAct}</p>
                </div>
                
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Tanggal Kejadian</p>
                    <p className="text-sm font-medium text-white flex items-center">
                      <Calendar size={12} className="mr-1" />
                      {new Date(record.caseDate).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-slate-400">Tanggal Masuk</p>
                    <p className="text-sm font-medium text-white flex items-center">
                      <Clock size={12} className="mr-1" />
                      {new Date(record.entryDate).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column with tabs and detailed info */}
          <div className="lg:w-3/4">
            <div className="border-b border-slate-700 mb-6">
              <nav className="flex space-x-4">
                <button
                  className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'info'
                      ? 'border-red-500 text-white'
                      : 'border-transparent text-slate-400 hover:text-slate-300'
                  }`}
                  onClick={() => setActiveTab('info')}
                >
                  Riwayat Kasus
                </button>
                <button
                  className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'timeline'
                      ? 'border-red-500 text-white'
                      : 'border-transparent text-slate-400 hover:text-slate-300'
                  }`}
                  onClick={() => setActiveTab('timeline')}
                >
                  Timeline
                </button>
                <button
                  className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'documents'
                      ? 'border-red-500 text-white'
                      : 'border-transparent text-slate-400 hover:text-slate-300'
                  }`}
                  onClick={() => setActiveTab('documents')}
                >
                  Dokumen
                </button>
                <button
                  className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'activity'
                      ? 'border-red-500 text-white'
                      : 'border-transparent text-slate-400 hover:text-slate-300'
                  }`}
                  onClick={() => setActiveTab('activity')}
                >
                  Aktivitas
                </button>
              </nav>
            </div>
            
            {activeTab === 'info' && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Riwayat Keterlibatan Dalam Kejahatan</h2>
                
                <div className="space-y-4">
                  {record.history.map((item, index) => (
                    <div key={index} className="bg-slate-700 p-4 rounded-lg">
                      <p className="text-white">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'timeline' && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Timeline Kasus</h2>
                
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute h-full w-0.5 bg-slate-600 left-2.5 top-0"></div>
                  
                  <div className="space-y-6 ml-10 relative">
                    {/* Example timeline events */}
                    <div className="relative">
                      <div className="absolute -left-10 mt-1.5">
                        <div className="w-5 h-5 rounded-full bg-red-500 border-2 border-slate-800"></div>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">{new Date(record.caseDate).toLocaleDateString('id-ID')}</p>
                        <h3 className="text-white font-medium">Kejadian Kasus</h3>
                        <p className="text-slate-300 text-sm mt-1">{record.criminalAct}</p>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-10 mt-1.5">
                        <div className="w-5 h-5 rounded-full bg-yellow-500 border-2 border-slate-800"></div>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">{new Date(record.entryDate).toLocaleDateString('id-ID')}</p>
                        <h3 className="text-white font-medium">Kasus Tercatat dalam Sistem</h3>
                        <p className="text-slate-300 text-sm mt-1">Data kasus dimasukkan ke dalam SMBD-RI</p>
                      </div>
                    </div>
                    
                    {/* Additional example timeline events based on status */}
                    {record.status === 'Detained' && (
                      <div className="relative">
                        <div className="absolute -left-10 mt-1.5">
                          <div className="w-5 h-5 rounded-full bg-blue-500 border-2 border-slate-800"></div>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">2 bulan setelah kejadian</p>
                          <h3 className="text-white font-medium">Ditahan</h3>
                          <p className="text-slate-300 text-sm mt-1">Tersangka ditahan untuk proses hukum lebih lanjut</p>
                        </div>
                      </div>
                    )}
                    
                    {record.status === 'Released' && (
                      <div className="relative">
                        <div className="absolute -left-10 mt-1.5">
                          <div className="w-5 h-5 rounded-full bg-green-500 border-2 border-slate-800"></div>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Setelah masa tahanan</p>
                          <h3 className="text-white font-medium">Dibebaskan</h3>
                          <p className="text-slate-300 text-sm mt-1">Tersangka dibebaskan setelah menjalani hukuman</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'documents' && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Dokumen Terkait</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-700 p-4 rounded-lg flex items-center">
                    <div className="bg-slate-600 p-3 rounded-md mr-3">
                      <Download size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Surat Perintah Penangkapan</p>
                      <p className="text-sm text-slate-400">PDF • 245 KB</p>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700 p-4 rounded-lg flex items-center">
                    <div className="bg-slate-600 p-3 rounded-md mr-3">
                      <Download size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Berita Acara Pemeriksaan</p>
                      <p className="text-sm text-slate-400">PDF • 1.2 MB</p>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700 p-4 rounded-lg flex items-center">
                    <div className="bg-slate-600 p-3 rounded-md mr-3">
                      <Download size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Putusan Pengadilan</p>
                      <p className="text-sm text-slate-400">PDF • 3.7 MB</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'activity' && (
              <div>
                <h2 className="text-xl font-bold text-white mb-4">Aktivitas Sistem</h2>
                
                <div className="space-y-3">
                  <div className="bg-slate-700 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-white font-medium flex items-center">
                        <Eye size={16} className="text-blue-400 mr-2" />
                        Data dilihat oleh Administrator Sistem
                      </p>
                      <p className="text-xs text-slate-400">10:30, 15 Aug 2023</p>
                    </div>
                    <p className="text-xs text-slate-400">IP: 192.168.1.1</p>
                  </div>
                  
                  <div className="bg-slate-700 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-white font-medium flex items-center">
                        <Edit size={16} className="text-yellow-400 mr-2" />
                        Data diperbarui oleh Petugas Lapangan
                      </p>
                      <p className="text-xs text-slate-400">14:45, 10 Aug 2023</p>
                    </div>
                    <p className="text-xs text-slate-400">IP: 192.168.1.2</p>
                  </div>
                  
                  <div className="bg-slate-700 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-white font-medium flex items-center">
                        <Share2 size={16} className="text-purple-400 mr-2" />
                        Data diakses oleh API Eksternal
                      </p>
                      <p className="text-xs text-slate-400">09:15, 05 Aug 2023</p>
                    </div>
                    <p className="text-xs text-slate-400">API Key: ****5678</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordDetail;