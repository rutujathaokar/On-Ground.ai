import React, { useState } from 'react';
import { Calendar, ChevronDown, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { KpiCard } from '../components/dashboard/KpiCard';
import { ProgressCard } from '../components/dashboard/ProgressCard';
import { EarningsCard } from '../components/dashboard/EarningsCard';
import { WhosWaitingCard } from '../components/dashboard/WhosWaitingCard';
import { TasksCard } from '../components/dashboard/TasksCard';
import { SevenDayChart } from '../components/dashboard/SevenDayChart';

export const DashboardPage = () => {
  const { dashboardData } = useApp();
  const { agent, kpis, charts } = dashboardData;
  const [timeFilter, setTimeFilter] = useState('This Week');

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto animate-fade-in">
      {/* Top Hero Navy Card */}
      <div className="bg-[#1C2340] text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-[#2B355F]">
        {/* Header Bar within Hero */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
          <div>
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
              {agent.greeting}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
              {agent.name}
            </h1>
            <p className="text-xs text-indigo-200/80 font-medium mt-1">
              {agent.company} · {agent.department}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* On Queue Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{agent.status}</span>
            </div>

            {/* This Week Selector */}
            <div className="relative">
              <button
                onClick={() => setTimeFilter(prev => prev === 'This Week' ? 'Today' : 'This Week')}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#283259] hover:bg-[#323D69] text-xs font-semibold text-white border border-[#3A477A] transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-indigo-300" />
                <span>{timeFilter}</span>
                <ChevronDown className="w-3 h-3 text-indigo-300 ml-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 KPI Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-1">
          {kpis.map((kpi) => (
            <KpiCard key={kpi.id} kpi={kpi} />
          ))}
        </div>
      </div>

      {/* Middle Row: 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6 flex flex-col justify-between">
          <ProgressCard />
          <WhosWaitingCard />
        </div>

        {/* Right Column */}
        <div className="space-y-6 flex flex-col justify-between">
          <EarningsCard />
          <TasksCard />
        </div>
      </div>

      {/* Bottom Row: 7-Day Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SevenDayChart
          title="CALLS HANDLED · LAST 7 DAYS"
          data={charts.callsHandled}
          color="emerald"
        />
        <SevenDayChart
          title="CSAT TREND · LAST 7 DAYS"
          data={charts.csatTrend}
          color="blue"
        />
      </div>
    </div>
  );
};
