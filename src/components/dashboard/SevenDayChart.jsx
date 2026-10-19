import React from 'react';

export const SevenDayChart = ({ title, data, type = 'bar', color = 'emerald' }) => {
  // Find maximum value to normalize bar heights
  const maxValue = Math.max(...data.map(d => d.value), 1);

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-6">
        {title}
      </h3>

      <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-32 pt-2">
        {data.map((item, idx) => {
          // Calculate percentage height
          const heightPercent = Math.max(18, Math.round((item.value / maxValue) * 100));

          const isEmerald = color === 'emerald';
          // Color schemes matching mock:
          // For emerald: regular bars are soft mint `#5EEAD4` or `#34D399`, Today is deep forest teal `#0F766E`
          // For blue: regular bars are soft periwinkle `#93C5FD`, Today is deep navy `#1D4ED8`
          let barBg = '';
          if (isEmerald) {
            barBg = item.isToday ? 'bg-[#0F766E]' : 'bg-[#5EEAD4]/80 hover:bg-[#5EEAD4]';
          } else {
            barBg = item.isToday ? 'bg-[#1E40AF]' : 'bg-[#93C5FD]/85 hover:bg-[#93C5FD]';
          }

          return (
            <div key={idx} className="flex flex-col items-center h-full justify-end group">
              {/* Value Label on top of bar */}
              <span className={`text-[11px] mb-1.5 font-bold transition-transform group-hover:scale-110 ${
                item.isToday ? 'text-gray-900 font-extrabold' : 'text-gray-600'
              }`}>
                {item.label || item.value}
              </span>

              {/* Bar */}
              <div className="w-full flex justify-center">
                <div
                  className={`w-full max-w-[48px] rounded-t-md transition-all duration-300 shadow-2xs ${barBg}`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>

              {/* Day Label at bottom */}
              <span className={`text-[11px] mt-2 font-medium ${
                item.isToday ? 'text-gray-900 font-bold' : 'text-gray-500'
              }`}>
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
