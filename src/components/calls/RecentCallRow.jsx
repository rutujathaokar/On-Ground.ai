import React from 'react';
import { PhoneOutgoing, PhoneIncoming, PhoneMissed, Phone, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RecentCallRow = ({ call }) => {
  const { openCallReview, startCall } = useApp();

  const handleRowClick = () => {
    openCallReview(call);
  };

  const handleQuickCall = (e) => {
    e.stopPropagation();
    startCall({
      name: call.name,
      phone: call.phone,
      product: call.product || "Recent Call"
    });
  };

  // Icon & color logic matching mock:
  // Green icon: outgoing answered call (e.g. Mukunda R.)
  // Blue icon: incoming answered call (e.g. Kavitha R., Faizan A.)
  // Red icon: missed call (e.g. Unknown, Ritu S., etc.)
  let iconComponent = null;
  let iconBg = '';
  let iconColor = '';

  if (call.status === 'answered') {
    if (call.direction === 'outgoing') {
      iconComponent = <PhoneOutgoing className="w-4 h-4" />;
      iconBg = 'bg-emerald-50 border-emerald-100';
      iconColor = 'text-emerald-600';
    } else {
      iconComponent = <PhoneIncoming className="w-4 h-4" />;
      iconBg = 'bg-blue-50 border-blue-100';
      iconColor = 'text-blue-600';
    }
  } else {
    iconComponent = <PhoneMissed className="w-4 h-4" />;
    iconBg = 'bg-rose-50 border-rose-100';
    iconColor = 'text-rose-500';
  }

  return (
    <div
      onClick={handleRowClick}
      className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-2xs hover:border-gray-300 hover:shadow-xs transition-all flex items-center justify-between cursor-pointer group"
    >
      <div className="flex items-center gap-3.5">
        {/* Status Icon */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center border flex-shrink-0 ${iconBg} ${iconColor}`}>
          {iconComponent}
        </div>

        <div>
          <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors text-sm sm:text-base flex items-center gap-2">
            <span>{call.name}</span>
            {call.score && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                QA: {call.score}
              </span>
            )}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5 font-mono">
            {call.timeText} · {call.duration}
          </p>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-400 group-hover:text-emerald-700 font-medium hidden sm:inline-flex items-center gap-1">
          <span>Review SOP</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>

        <button
          onClick={handleQuickCall}
          className="p-2 rounded-xl bg-gray-100 hover:bg-emerald-600 hover:text-white text-gray-600 transition-colors"
          title={`Call ${call.name}`}
        >
          <Phone className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
