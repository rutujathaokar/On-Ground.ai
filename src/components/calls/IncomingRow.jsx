import React from 'react';
import { PhoneMissed, PhoneCall } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const IncomingRow = ({ call }) => {
  const { startCall } = useApp();

  const handleCallBack = () => {
    startCall({
      name: call.name,
      phone: call.phone,
      product: call.product || "Enquiry"
    });
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-2xs hover:border-gray-200 transition-all flex items-center justify-between group">
      <div className="flex items-center gap-3.5">
        {/* Missed Call Red Icon */}
        <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100/60 group-hover:bg-rose-100 transition-colors flex-shrink-0">
          <PhoneMissed className="w-4 h-4" />
        </div>

        <div>
          <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors text-sm sm:text-base">
            {call.name}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {call.timeText} · <span className="text-gray-700 font-medium">{call.crmStatus}</span>
          </p>
        </div>
      </div>

      {/* Right Value & Call Back Button */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <span className="text-sm sm:text-base font-bold text-gray-900">
            {call.expectedValue}
          </span>
          {call.expectedValue !== 'New contact' && (
            <span className="block text-[10px] uppercase font-bold text-gray-400">
              expected
            </span>
          )}
        </div>

        <button
          onClick={handleCallBack}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-xs hover:shadow transition-transform active:scale-95"
          title={`Call Back ${call.name}`}
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Call back</span>
        </button>
      </div>
    </div>
  );
};
