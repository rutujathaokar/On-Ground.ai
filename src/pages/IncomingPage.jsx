import React from 'react';
import { PhoneMissed, DollarSign, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { IncomingRow } from '../components/calls/IncomingRow';

export const IncomingPage = () => {
  const { incomingData } = useApp();
  const { missedTodayCount, expectedValueAtStake, calls } = incomingData;

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto animate-fade-in">
      {/* Header Banner */}
      <div className="bg-[#1C2340] text-white rounded-3xl p-6 shadow-md border border-[#2B355F]">
        <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider block">
          Today's calling plan
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
          Planner
        </h1>
      </div>

      {/* Subheader */}
      <div className="px-1">
        <h2 className="text-base font-bold text-gray-900">Missed calls</h2>
        <p className="text-xs text-gray-500">
          Ranked by expected value — call the highest-value leads back first
        </p>
      </div>

      {/* Top 2 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Missed Today */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs">
          <div className="text-3xl font-black text-gray-900 font-mono">
            {missedTodayCount}
          </div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mt-1">
            MISSED TODAY
          </div>
        </div>

        {/* Expected Value At Stake */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs">
          <div className="text-3xl font-black text-emerald-700 font-mono tracking-tight">
            {expectedValueAtStake}
          </div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mt-1">
            EXPECTED VALUE AT STAKE
          </div>
        </div>
      </div>

      {/* Missed Calls Rows List */}
      <div className="space-y-3">
        {calls.map((call) => (
          <IncomingRow key={call.id} call={call} />
        ))}
      </div>
    </div>
  );
};
