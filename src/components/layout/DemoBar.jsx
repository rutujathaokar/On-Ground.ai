import React from 'react';
import { Phone, ShieldCheck, PhoneCall } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DemoBar = () => {
  const { startCall, setIsDialpadOpen, leads } = useApp();

  const handleInAppCall = () => {
    // Call top lead by default
    const leadToCall = leads[0] || {
      name: "Mukunda",
      phone: "+91 98860 12345",
      product: "Ortho GRID"
    };
    startCall(leadToCall);
  };

  const handlePhoneCall = () => {
    setIsDialpadOpen(true);
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 print:hidden pointer-events-auto">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-gray-200/80 text-xs font-medium text-gray-800 transition-all hover:shadow-xl hover:bg-white">
        {/* DEMO Tag */}
        <span className="px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 font-bold text-[10px] tracking-wide uppercase">
          DEMO
        </span>

        {/* In-app call trigger */}
        <button
          onClick={handleInAppCall}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 transition-colors focus:outline-none"
          title="Start browser in-app call with active microphone"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-600" />
          <span>In-app call</span>
        </button>

        {/* Phone call trigger */}
        <button
          onClick={handlePhoneCall}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full hover:bg-gray-100 text-gray-700 transition-colors focus:outline-none"
          title="Open dialpad"
        >
          <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
          <span>Phone call</span>
        </button>

        {/* Shield indicator */}
        <div className="p-1 text-emerald-600 bg-emerald-50 rounded-full" title="Enterprise WebRTC & Audio Enforced">
          <ShieldCheck className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
