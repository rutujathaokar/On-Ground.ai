import React from 'react';
import { Bell, Star, Menu } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TopBar = ({ setIsMobileOpen }) => {
  const { dashboardData } = useApp();
  const { agent } = dashboardData;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 sm:px-6 bg-[#0B261E] border-b border-[#0F382E] text-white">
      {/* Left Branding */}
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsMobileOpen(prev => !prev)}
          className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-[#12483B] lg:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="bg-emerald-600 text-white font-extrabold text-[11px] tracking-wider px-2 py-0.5 rounded flex items-center justify-center shadow-sm">
            OG
          </div>
          <span className="font-bold text-sm tracking-tight text-white hidden sm:inline-block">
            On-Ground.ai
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Notifications Bell */}
        <button
          className="relative p-1.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white transition-colors shadow-sm focus:outline-none"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 bg-amber-400 text-gray-900 font-extrabold text-[9px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#0B261E]">
            {agent.notificationCount}
          </span>
        </button>

        {/* Score Badge */}
        <div
          className="flex items-center px-2.5 py-1 rounded-full bg-[#10483B] text-emerald-300 border border-emerald-500/30 text-xs font-bold"
          title="OG Score"
        >
          {agent.score}
        </div>

        {/* Star / Rank Badge */}
        <div
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-900/60 text-amber-300 border border-amber-500/30 text-xs font-bold"
          title="Team Rank"
        >
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>#{agent.rank}</span>
        </div>

        {/* User Profile Avatar */}
        <div className="relative group cursor-pointer ml-1">
          <div className="w-8 h-8 rounded-full bg-[#0E704D] border-2 border-emerald-400/40 text-white font-bold text-xs flex items-center justify-center shadow">
            {agent.avatar}
          </div>
          {/* Active online status badge */}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0B261E]"></span>
        </div>
      </div>
    </header>
  );
};
