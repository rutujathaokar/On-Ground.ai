import React, { useState } from 'react';
import { Phone, ChevronDown, ChevronUp, Sparkles, Target, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LeadRow = ({ lead, index }) => {
  const { startCall, openLeadsModal } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleRowClick = () => {
    setIsExpanded(prev => !prev);
  };

  const handleCall = (e) => {
    e.stopPropagation();
    startCall(lead);
  };

  const handleOpenModal = (e) => {
    e.stopPropagation();
    openLeadsModal(index);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-2xs hover:border-gray-200 transition-all overflow-hidden">
      {/* Main Row */}
      <div
        onClick={handleRowClick}
        className="p-4 sm:p-5 flex items-center justify-between cursor-pointer group"
      >
        <div className="flex items-center gap-3.5">
          {/* Avatar Initials */}
          <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-800 font-bold text-sm flex items-center justify-center border border-emerald-200/60 group-hover:bg-emerald-100 transition-colors flex-shrink-0">
            {lead.initials}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                {lead.name}
              </h3>
              {lead.slaUrgent && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                  {lead.sla}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Interested: <span className="font-semibold text-gray-700">{lead.product}</span> · {lead.price}
            </p>
          </div>
        </div>

        {/* Right Score & Actions */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight font-mono">
              {lead.score}
            </span>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
              SCORE
            </span>
          </div>

          <button
            onClick={handleCall}
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm hover:shadow transition-transform active:scale-95 flex items-center gap-1.5 text-xs font-semibold"
            title={`Call ${lead.name}`}
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">Call</span>
          </button>

          <div className="text-gray-400 group-hover:text-gray-600 hidden sm:block">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </div>

      {/* Expanded Row Detail Drawer */}
      {isExpanded && (
        <div className="px-5 pb-5 pt-2 bg-gray-50/70 border-t border-gray-100 text-xs space-y-3 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-white rounded-xl border border-gray-100">
              <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Contact Info</span>
              <p className="font-mono text-gray-800">{lead.phone}</p>
              <p className="text-gray-500">{lead.email}</p>
              <p className="text-gray-500 mt-1">{lead.location}</p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-gray-100">
              <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Last Interaction</span>
              <p className="font-medium text-gray-800">{lead.lastTouch}</p>
              <p className="text-gray-600 italic mt-1 line-clamp-2">"{lead.notes}"</p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-gray-100 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Recommended Move</span>
                <p className="font-semibold text-emerald-800">{lead.actionBanner}</p>
              </div>
              <button
                onClick={handleOpenModal}
                className="mt-2 text-xs font-bold text-purple-700 hover:text-purple-800 flex items-center gap-1"
              >
                <span>View Full Lead Analysis & Buying Signals</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
