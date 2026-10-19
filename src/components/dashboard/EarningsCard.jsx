import React from 'react';
import { IndianRupee } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EarningsCard = () => {
  const { dashboardData } = useApp();
  const { earnings } = dashboardData;

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex flex-col justify-between">
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs text-gray-500 font-semibold mb-2">
        <span className="flex items-center gap-1.5 text-gray-700">
          <span>💰</span>
          <span className="font-bold">My earnings this month</span>
        </span>
        <span className="font-mono text-gray-400">{earnings.targetRange}</span>
      </div>

      {/* Main Figures */}
      <div className="my-2">
        <div className="text-2xl font-black text-gray-900 tracking-tight flex items-baseline gap-1">
          <span>{earnings.formatted}</span>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">
          {earnings.fromCoachedMoves}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mt-3">
        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-700 shadow-xs"
            style={{ width: `${earnings.progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
