import React from 'react';
import { useApp } from '../../context/AppContext';

export const ProgressCard = () => {
  const { dashboardData } = useApp();
  const { progress } = dashboardData;

  return (
    <div className="bg-[#12483B] text-white rounded-2xl p-5 shadow-sm border border-emerald-800/40 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-emerald-300">
        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        <span>MY PROGRESS · TODAY</span>
      </div>

      {/* 2 Subcards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Subcard 1: Leads Created */}
        <div className="bg-[#0C342A] rounded-xl p-3.5 border border-emerald-700/30 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-white">{progress.leadsCreated.count}</span>
            <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-amber-400 text-gray-900">
              {progress.leadsCreated.change}
            </span>
          </div>
          <span className="text-xs text-emerald-200 mt-1 font-medium">
            {progress.leadsCreated.label}
          </span>
        </div>

        {/* Subcard 2: Leads Called */}
        <div className="bg-[#0C342A] rounded-xl p-3.5 border border-emerald-700/30 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-white">{progress.leadsCalled.count}</span>
            <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-emerald-400 text-gray-900">
              {progress.leadsCalled.change}
            </span>
          </div>
          <span className="text-xs text-emerald-200 mt-1 font-medium">
            {progress.leadsCalled.label}
          </span>
        </div>
      </div>
    </div>
  );
};
