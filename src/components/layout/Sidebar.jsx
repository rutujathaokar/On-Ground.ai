import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  PhoneCall,
  PhoneIncoming,
  History,
  Calendar as CalendarIcon,
  MessageSquare,
  Sparkles,
  PhoneForwarded
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLeadsModalOpen } = useApp();

  const currentPath = location.pathname;

  const handleNav = (path) => {
    navigate(path);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  const isPathActive = (path) => {
    if (path === '/dashboard' && (currentPath === '/' || currentPath === '/dashboard')) return true;
    return currentPath === path;
  };

  const isPulseActive = currentPath.startsWith('/pulse');
  const isCalendarActive = currentPath === '/calendar';

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-60 bg-[#08201A] text-white flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } border-r border-[#0E352B] shadow-xl lg:shadow-none select-none`}
      >
        <div className="flex flex-col flex-1 py-4 px-3 overflow-y-auto">
          {/* Logo / Brand Header */}
          <div className="flex items-center gap-2.5 px-3 py-2.5 mb-5">
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              On-Ground<span className="text-emerald-400">.ai</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1 text-sm font-medium">
            {/* Dashboard */}
            <button
              onClick={() => handleNav('/dashboard')}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-150 text-left w-full ${
                isPathActive('/dashboard')
                  ? 'bg-[#12483B] text-white font-semibold shadow-inner'
                  : 'text-gray-300 hover:bg-[#0C2F26] hover:text-white'
              }`}
            >
              <LayoutDashboard className={`w-4 h-4 ${isPathActive('/dashboard') ? 'text-emerald-400' : 'text-gray-400'}`} />
              <span>Dashboard</span>
            </button>

            {/* Plan Header & Sub-links */}
            <div className="pt-3 pb-1">
              <div className="flex items-center gap-2.5 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400/80">
                <PhoneForwarded className="w-3.5 h-3.5" />
                <span>Plan</span>
              </div>

              <div className="mt-1 space-y-1 pl-2">
                <button
                  onClick={() => handleNav('/calls')}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-left w-full transition-all duration-150 ${
                    isPathActive('/calls')
                      ? 'bg-[#12483B] text-white font-semibold shadow-inner'
                      : 'text-gray-300 hover:bg-[#0C2F26] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <PhoneCall className={`w-4 h-4 ${isPathActive('/calls') ? 'text-emerald-400' : 'text-gray-400'}`} />
                    <span>Calls to make</span>
                  </div>
                </button>

                <button
                  onClick={() => handleNav('/incoming')}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-left w-full transition-all duration-150 ${
                    isPathActive('/incoming')
                      ? 'bg-[#12483B] text-white font-semibold shadow-inner'
                      : 'text-gray-300 hover:bg-[#0C2F26] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <PhoneIncoming className={`w-4 h-4 ${isPathActive('/incoming') ? 'text-emerald-400' : 'text-gray-400'}`} />
                    <span>Incoming</span>
                  </div>
                </button>

                <button
                  onClick={() => handleNav('/recent')}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-left w-full transition-all duration-150 ${
                    isPathActive('/recent')
                      ? 'bg-[#12483B] text-white font-semibold shadow-inner'
                      : 'text-gray-300 hover:bg-[#0C2F26] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <History className={`w-4 h-4 ${isPathActive('/recent') ? 'text-emerald-400' : 'text-gray-400'}`} />
                    <span>Recent</span>
                  </div>
                </button>

                <button
                  onClick={() => handleNav('/practice')}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-left w-full transition-all duration-150 ${
                    isPathActive('/practice')
                      ? 'bg-[#12483B] text-white font-semibold shadow-inner'
                      : 'text-gray-300 hover:bg-[#0C2F26] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className={`w-4 h-4 ${isPathActive('/practice') ? 'text-emerald-400' : 'text-gray-400'}`} />
                    <span>Practise a call</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Calendar */}
            <div className="pt-2">
              <button
                onClick={() => handleNav('/calendar')}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-150 text-left w-full ${
                  isCalendarActive
                    ? 'bg-[#D97706] text-white font-semibold shadow-lg shadow-amber-900/40'
                    : 'text-gray-300 hover:bg-[#0C2F26] hover:text-white'
                }`}
              >
                <CalendarIcon className={`w-4 h-4 ${isCalendarActive ? 'text-white' : 'text-gray-400'}`} />
                <span>Calendar</span>
              </button>
            </div>

            {/* Pulse */}
            <div className="pt-1">
              <button
                onClick={() => handleNav('/pulse')}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-150 text-left w-full ${
                  isPulseActive
                    ? 'bg-[#7C3AED] text-white font-semibold shadow-lg shadow-purple-900/40'
                    : 'text-gray-300 hover:bg-[#0C2F26] hover:text-white'
                }`}
              >
                <MessageSquare className={`w-4 h-4 ${isPulseActive ? 'text-white' : 'text-gray-400'}`} />
                <span>Pulse</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Bottom Shift Footer */}
        <div className="p-3 border-t border-[#0E352B] bg-[#061814]/70">
          <div className="flex items-center justify-between text-xs text-gray-400 px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Shift
            </span>
            <span className="text-[11px] font-mono text-emerald-400/90 font-medium">v2.4 IST</span>
          </div>
        </div>
      </aside>
    </>
  );
};
