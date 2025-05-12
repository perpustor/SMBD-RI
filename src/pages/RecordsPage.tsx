import React from 'react';
import RecordsList from '../components/records/RecordsList';
import { mockRecords } from '../data/mockData';

const RecordsPage: React.FC = () => {
  return (
    <div>
      <RecordsList records={mockRecords} />
    </div>
  );
};

export default RecordsPage;