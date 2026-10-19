import React from 'react';

export const AudioWaveform = ({ level = 0, isMuted = false, isActive = true }) => {
  // 9 bars for visualizer
  const bars = [0.35, 0.6, 0.9, 0.75, 1.0, 0.8, 0.95, 0.5, 0.3];

  if (!isActive) {
    return (
      <div className="flex items-center justify-center gap-1.5 h-10 py-2">
        <span className="text-xs text-gray-400">Connecting audio line...</span>
      </div>
    );
  }

  if (isMuted) {
    return (
      <div className="flex items-center justify-center gap-1.5 h-10 py-2">
        <div className="w-48 h-0.5 bg-rose-400/60 rounded-full"></div>
        <span className="text-[11px] font-medium text-rose-500 uppercase tracking-wider ml-1">Muted</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-1.5 h-10 py-1">
      {bars.map((mult, i) => {
        // Base height plus scaled boost from microphone volume level (0-100)
        const dynamicBoost = (level / 100) * mult * 28;
        const height = Math.max(6, Math.min(32, 6 + dynamicBoost));

        return (
          <div
            key={i}
            className="w-1.5 rounded-full transition-all duration-75 bg-gradient-to-t from-emerald-600 to-teal-400 shadow-sm"
            style={{
              height: `${height}px`,
              opacity: level > 5 ? 0.9 + (level / 200) : 0.4
            }}
          />
        );
      })}
    </div>
  );
};
