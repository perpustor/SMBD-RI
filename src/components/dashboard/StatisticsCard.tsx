import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatisticsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  bgColor?: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ 
  title, 
  value, 
  icon, 
  change,
  bgColor = 'bg-slate-800'
}) => {
  return (
    <div className={`${bgColor} rounded-lg shadow-md p-5 flex flex-col transition-transform duration-300 hover:scale-105`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-sm font-medium text-slate-400">{title}</h3>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className="p-2 rounded-md bg-slate-700 bg-opacity-50">
          {icon}
        </div>
      </div>
      
      {change && (
        <div className="flex items-center mt-2">
          {change.isPositive ? (
            <TrendingUp size={16} className="text-green-500 mr-1" />
          ) : (
            <TrendingDown size={16} className="text-red-500 mr-1" />
          )}
          <span className={`text-sm ${change.isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {change.value}% dari bulan lalu
          </span>
        </div>
      )}
    </div>
  );
};

export default StatisticsCard;