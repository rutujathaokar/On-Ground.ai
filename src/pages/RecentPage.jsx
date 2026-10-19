import React, { useState } from 'react';
import { History, Search, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RecentCallRow } from '../components/calls/RecentCallRow';

export const RecentPage = () => {
  const { recentCalls } = useApp();
  const [filterType, setFilterType] = useState('all'); // 'all', 'answered', 'missed'

  const filteredCalls = recentCalls.filter(call => {
    if (filterType === 'answered') return call.status === 'answered';
    if (filterType === 'missed') return call.status === 'missed';
    return true;
  });

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

      {/* Subheader & Quick Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <div>
          <h2 className="text-base font-bold text-gray-900">Recent calls</h2>
          <p className="text-xs text-gray-500">
            Tap a call to review it against SOP
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-xl">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              filterType === 'all' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            All ({recentCalls.length})
          </button>
          <button
            onClick={() => setFilterType('answered')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              filterType === 'answered' ? 'bg-white text-emerald-800 shadow-xs' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Answered
          </button>
          <button
            onClick={() => setFilterType('missed')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              filterType === 'missed' ? 'bg-white text-rose-800 shadow-xs' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Missed
          </button>
        </div>
      </div>

      {/* Calls List */}
      <div className="space-y-3">
        {filteredCalls.map((call) => (
          <RecentCallRow key={call.id} call={call} />
        ))}
      </div>
    </div>
  );
};
