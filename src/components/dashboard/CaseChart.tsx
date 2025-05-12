import React from 'react';

interface CaseChartProps {
  data: {
    month: string;
    count: number;
  }[];
  title: string;
}

const CaseChart: React.FC<CaseChartProps> = ({ data, title }) => {
  const maxValue = Math.max(...data.map(d => d.count));
  
  return (
    <div className="bg-slate-800 rounded-lg shadow-md p-5">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      
      <div className="flex items-end h-60 space-x-2">
        {data.map((item, index) => {
          const height = (item.count / maxValue) * 100;
          
          return (
            <div 
              key={index} 
              className="flex flex-col items-center flex-1"
            >
              <div className="w-full flex justify-center">
                <div 
                  className="w-full bg-red-500 hover:bg-red-400 rounded-t-sm cursor-pointer transition-all duration-300 group relative"
                  style={{ height: `${height}%` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-700 text-white text-xs py-1 px-2 rounded transition-opacity duration-300">
                    {item.count} kasus
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-400 mt-2">{item.month}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CaseChart;