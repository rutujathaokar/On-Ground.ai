import React from 'react';

export const KpiCard = ({ kpi }) => {
  return (
    <div className="bg-[#242D4D]/90 backdrop-blur-xs rounded-xl p-4 border border-[#323D66] flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-0.5">
      <div className="text-2xl font-black text-white tracking-tight font-mono">
        {kpi.value}
      </div>

      <div className="text-[11px] font-bold uppercase tracking-wider text-gray-300 mt-1">
        {kpi.label}
      </div>

      <div className="mt-1.5 flex items-center justify-center">
        {kpi.badge ? (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            {kpi.badge}
          </span>
        ) : (
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
            {kpi.change}
          </span>
        )}
      </div>
    </div>
  );
};
