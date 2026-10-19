import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Mail,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Users,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CalendarPage = () => {
  const { calendarData, selectCalendarDay } = useApp();
  const { currentMonth, currentYear, selectedDay, events } = calendarData;
  const [activeMonthOffset, setActiveMonthOffset] = useState(0);

  // Month navigation
  const displayedMonth = "October";
  const displayedYear = 2026;

  // Calendar matrix calculation for October 2026:
  // Oct 1, 2026 is a Thursday (Index 4: S=0, M=1, T=2, W=3, T=4, F=5, S=6)
  // Total days: 31
  // Empty leading cells: 4
  const daysInMonth = 31;
  const startDayOfWeek = 4; // Thursday

  // Days with red dots from screenshot: 23, 26, 28
  const dotDays = [23, 26, 28];

  // Events for selected day
  const selectedDayEvents = events.filter(e => e.day === selectedDay);

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto animate-fade-in">
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <CalendarIcon className="w-5 h-5 text-amber-600" />
          <span>Calendar</span>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">
          Mirrored from your mailbox — invites created here land there too
        </p>
      </div>

      {/* Info Notice Banner */}
      <div className="p-4 bg-blue-50/80 border border-blue-100 rounded-2xl flex items-center gap-3 text-xs text-blue-900 font-medium">
        <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
        <span>Store visits, coaching sessions, and meeting invites all show up here — and in your mailbox.</span>
      </div>

      {/* Calendar Card Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100">
        {/* Month Navigation Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {}}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              {displayedMonth} {displayedYear}
            </h2>
            <button
              onClick={() => selectCalendarDay(9)}
              className="px-3 py-1 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors"
            >
              Today
            </button>
          </div>

          <button
            onClick={() => {}}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Days of Week Header: S M T W T F S */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3 text-center mb-3">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
            <span key={idx} className="text-xs font-bold text-gray-400">
              {day}
            </span>
          ))}
        </div>

        {/* 7-Column Days Grid */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3 text-center">
          {/* Empty cells before month start */}
          {Array.from({ length: startDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="h-12 sm:h-16" />
          ))}

          {/* Days 1 to 31 */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const isSelected = selectedDay === dayNum;
            const hasDot = dotDays.includes(dayNum);

            return (
              <button
                key={dayNum}
                onClick={() => selectCalendarDay(dayNum)}
                className={`h-12 sm:h-16 rounded-2xl flex flex-col items-center justify-center relative transition-all active:scale-95 ${
                  isSelected
                    ? 'border-2 border-blue-600 bg-blue-50/40 text-blue-900 font-bold shadow-xs'
                    : 'border border-gray-100 hover:border-gray-300 hover:bg-gray-50 text-gray-800 font-medium'
                }`}
              >
                <span className={`text-sm ${isSelected ? 'font-extrabold text-blue-700' : ''}`}>
                  {dayNum}
                </span>

                {/* Event Dot */}
                {hasDot && (
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 absolute bottom-2" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* UPCOMING Events for Selected Day */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
          UPCOMING · OCTOBER {selectedDay}, {displayedYear}
        </h3>

        {selectedDayEvents.length > 0 ? (
          selectedDayEvents.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs space-y-2 hover:border-gray-200 transition-all"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-gray-900">{ev.title}</h4>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
                  {ev.type}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span>{ev.time}</span>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>{ev.location}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-gray-400" />
                  <span>{ev.attendees.join(', ')}</span>
                </span>
              </div>

              <p className="text-xs text-gray-600 pt-1">{ev.description}</p>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center text-gray-500 border border-gray-100 text-xs">
            No specific invites scheduled for October {selectedDay}. Click on days 9, 23, 26, or 28 to view key team events.
          </div>
        )}
      </div>
    </div>
  );
};
