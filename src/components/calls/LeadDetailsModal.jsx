import React, { useState } from 'react';
import {
  Users,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Target,
  FileText,
  Phone,
  AlertCircle,
  IndianRupee,
  ShieldCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LeadDetailsModal = () => {
  const {
    isLeadsModalOpen,
    closeLeadsModal,
    activeLeadIndex,
    nextLead,
    prevLead,
    leads,
    startCall
  } = useApp();

  const [expandedSection, setExpandedSection] = useState('signals'); // 'icp', 'journey', 'signals'

  if (!isLeadsModalOpen) return null;

  const lead = leads[activeLeadIndex] || leads[0];
  const totalLeads = leads.length;

  const toggleSection = (section) => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  const handleCallFromModal = () => {
    closeLeadsModal();
    startCall(lead);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[92vh]">
        {/* Purple Header Banner */}
        <div className="bg-[#6B21A8] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-purple-700/60 rounded-xl">
              <Users className="w-5 h-5 text-purple-200" />
            </div>
            <div>
              <h2 className="text-base font-bold leading-tight">Leads</h2>
              <p className="text-xs text-purple-200">
                Lead {activeLeadIndex + 1} of {totalLeads} · SLA to close
              </p>
            </div>
          </div>
          <button
            onClick={closeLeadsModal}
            className="p-1.5 rounded-full hover:bg-purple-700/60 text-purple-200 hover:text-white transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Paging Indicators Header */}
        <div className="px-5 py-2.5 bg-gray-50/70 border-b border-gray-100 flex items-center justify-between">
          <button
            onClick={prevLead}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors"
            title="Previous Lead"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {leads.map((_, i) => (
              <button
                key={i}
                onClick={() => {}}
                className={`transition-all duration-200 rounded-full ${
                  i === activeLeadIndex
                    ? 'w-6 h-2 bg-[#6B21A8]'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextLead}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors"
            title="Next Lead"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-3.5 flex-1 text-sm">
          {/* Status & Contact Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{lead.status || 'OPEN'}</span>
            </div>

            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-800 font-bold text-sm flex items-center justify-center border border-emerald-200/60">
                  {lead.initials || 'MK'}
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">{lead.name}</h3>
                  <p className="text-xs text-gray-500">
                    Interested: <span className="font-medium text-gray-700">{lead.product}</span> · {lead.price}
                  </p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                {lead.sla || '2h left'}
              </span>
            </div>
          </div>

          {/* Banner: Quote to be given to customer */}
          <div className="p-3 bg-amber-50/90 border border-amber-200/80 rounded-xl text-xs text-amber-900 font-medium flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span>{lead.actionBanner || 'Quote to be given to customer'}</span>
          </div>

          {/* ICP and Intent Score Bars */}
          <div className="space-y-2 pt-1">
            {/* ICP Bar */}
            <div className="flex items-center justify-between text-xs font-semibold text-gray-700">
              <span className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-rose-500" />
                <span>ICP</span>
              </span>
              <div className="flex items-center gap-3 flex-1 mx-3">
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${lead.icpScore || 87}%` }}
                  />
                </div>
              </div>
              <span className="font-bold text-gray-800">{lead.icpScore || 87}%</span>
            </div>

            {/* Lead Intent Score */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/60 text-xs font-semibold text-emerald-900">
              <span className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-emerald-600" />
                <span>Lead Intent Score</span>
              </span>
              <span className="text-sm font-bold text-emerald-700">{lead.intentScore || 91}</span>
            </div>
          </div>

          {/* Collapsible Accordion 1: ICP FIT BREAKDOWN */}
          <div className="border border-gray-200/80 rounded-xl overflow-hidden shadow-xs">
            <button
              onClick={() => toggleSection('icp')}
              className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-700 bg-gray-50/60 hover:bg-gray-100/80 transition-colors"
            >
              <span>ICP FIT BREAKDOWN</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSection === 'icp' ? 'rotate-180' : ''}`} />
            </button>
            {expandedSection === 'icp' && (
              <div className="p-3.5 bg-white text-xs space-y-2 border-t border-gray-100">
                {lead.icpBreakdown ? (
                  lead.icpBreakdown.map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
                      <div>
                        <span className="font-semibold text-gray-800">{item.factor}: </span>
                        <span className="text-gray-600">{item.note}</span>
                      </div>
                      <span className="font-bold text-emerald-600 ml-2">{item.score}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Target customer fit confirmed across budget, room size and timeline.</p>
                )}
              </div>
            )}
          </div>

          {/* Collapsible Accordion 2: HOW WE GOT HERE */}
          <div className="border border-gray-200/80 rounded-xl overflow-hidden shadow-xs">
            <button
              onClick={() => toggleSection('journey')}
              className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-purple-900 bg-purple-50/40 hover:bg-purple-50 transition-colors"
            >
              <span>HOW WE GOT HERE</span>
              <ChevronDown className={`w-4 h-4 text-purple-700 transition-transform ${expandedSection === 'journey' ? 'rotate-180' : ''}`} />
            </button>
            {expandedSection === 'journey' && (
              <div className="p-3.5 bg-white text-xs space-y-2 border-t border-gray-100">
                {lead.journey ? (
                  lead.journey.map((step, i) => (
                    <div key={i} className="flex items-start gap-2 py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5 flex-shrink-0"></span>
                      <div>
                        <span className="font-semibold text-gray-700">{step.time}: </span>
                        <span className="text-gray-600">{step.event}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Walked in store after online campaign search.</p>
                )}
              </div>
            )}
          </div>

          {/* Collapsible Accordion 3: WHERE WE PICKED UP SIGNALS (Expanded by default) */}
          <div className="border border-amber-200 rounded-xl overflow-hidden bg-amber-50/30">
            <button
              onClick={() => toggleSection('signals')}
              className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100/40 hover:bg-amber-100/60 transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-700" />
                <span>WHERE WE PICKED UP SIGNALS</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-amber-800 transition-transform ${expandedSection === 'signals' ? 'rotate-180' : ''}`} />
            </button>
            {expandedSection === 'signals' && (
              <div className="p-3 space-y-2.5 bg-white/70 border-t border-amber-100 text-xs">
                {lead.buyingSignals ? (
                  lead.buyingSignals.map((signal, idx) => (
                    <div key={idx} className="p-2.5 bg-white rounded-lg border border-amber-200/60 shadow-2xs space-y-1">
                      <div className="flex items-center gap-1 font-bold text-gray-800">
                        {signal.icon === 'currency' && <IndianRupee className="w-3.5 h-3.5 text-amber-600" />}
                        {signal.icon === 'file' && <FileText className="w-3.5 h-3.5 text-blue-600" />}
                        {signal.icon === 'shield' && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
                        <span>{signal.type}</span>
                      </div>
                      <p className="text-gray-600 italic">
                        "{signal.content}"
                      </p>
                    </div>
                  ))
                ) : null}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-gray-50 border-t border-gray-100 space-y-3">
          {/* Cumulative Missed Alert */}
          <div className="flex items-start gap-1.5 text-[11px] text-rose-700 font-medium">
            <span className="w-2 h-2 rounded-full bg-rose-500 mt-1 flex-shrink-0"></span>
            <div>
              <span className="font-bold uppercase tracking-wide">CUMULATIVE MISSED: 2</span> · expired without close, visible to manager
            </div>
          </div>

          {/* Quick Call Action */}
          <button
            onClick={handleCallFromModal}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-700/20 active:scale-[0.99] transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Call {lead.name} Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
