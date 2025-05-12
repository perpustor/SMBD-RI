import React from 'react';
import { useParams } from 'react-router-dom';
import RecordDetail from '../components/records/RecordDetail';
import { mockRecords } from '../data/mockData';
import { Record } from '../types';

const RecordDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find the record with the matching ID
  const record = mockRecords.find(r => r.id === id) as Record;
  
  if (!record) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-white text-lg">Record not found</p>
      </div>
    );
  }
  
  return (
    <div>
      <RecordDetail record={record} />
    </div>
  );
};

export default RecordDetailPage;