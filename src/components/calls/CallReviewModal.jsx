import React, { useState } from 'react';
import {
  X,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  MessageSquare,
  Sparkles,
  Phone,
  Clock,
  ShieldCheck,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CallReviewModal = () => {
  const { isCallReviewModalOpen, closeCallReview, activeReviewCall } = useApp();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(35);

  if (!isCallReviewModalOpen || !activeReviewCall) return null;

  const sop = activeReviewCall.sopReview || {
    namedShopper: true,
    namedShopperNote: "Shopper named within first 8s (+23.6pp conversion impact)",
    greetingWithin10s: true,
    greetingNote: "Polite brand introduction with showroom reference",
    painPointIdentified: true,
    painPointNote: "Clarified requirements and urgency",
    productPitch: true,
    productPitchNote: "Explained patented SmartGRID elasticity vs sinking memory foam",
    financingOffered: true,
    financingNote: "Explained zero-cost 6-month EMI breakdown",
    agreedNextStep: true,
    nextStepNote: "Follow up quotation logged to CRM"
  };

  const transcript = activeReviewCall.transcript || [];

  const togglePlayAudio = () => {
    setIsPlayingAudio(prev => !prev);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#0A2820] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#12483B] rounded-xl text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold leading-tight flex items-center gap-2">
                <span>Call Review & SOP Evaluation</span>
                {activeReviewCall.score && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
                    Score: {activeReviewCall.score}/100
                  </span>
                )}
              </h2>
              <p className="text-xs text-gray-300">
                {activeReviewCall.name} · {activeReviewCall.duration} · {activeReviewCall.timeText}
              </p>
            </div>
          </div>
          <button
            onClick={closeCallReview}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audio Recording Player Simulation */}
        <div className="bg-gray-900 text-white px-6 py-3 border-b border-gray-800 flex items-center gap-4">
          <button
            onClick={togglePlayAudio}
            className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center text-white transition-colors flex-shrink-0"
          >
            {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          <div className="flex-1">
            <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono mb-1">
              <span>{isPlayingAudio ? "01:14" : "00:00"}</span>
              <span>Audio Recording ({activeReviewCall.duration})</span>
            </div>
            {/* Waveform Scrubber */}
            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden cursor-pointer">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${isPlayingAudio ? 65 : audioProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {/* SOP Adherence Checklist */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Standard Operating Procedure (SOP) Checklist</span>
            </h4>

            <div className="grid grid-cols-1 gap-2.5">
              {/* Named Shopper - High priority from PDF */}
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-emerald-950 flex items-center gap-2">
                    <span>Named Shopper Promptly</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800 text-[10px] font-extrabold">
                      +23.6pp lift
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800 mt-0.5">{sop.namedShopperNote}</p>
                </div>
              </div>

              {/* Greeting in 10s */}
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-emerald-950">Greeting in first 10s</div>
                  <p className="text-xs text-emerald-800 mt-0.5">{sop.greetingNote}</p>
                </div>
              </div>

              {/* Pain Point */}
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-emerald-950">Uncovered Pain Point</div>
                  <p className="text-xs text-emerald-800 mt-0.5">{sop.painPointNote}</p>
                </div>
              </div>

              {/* Product Pitch */}
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold text-emerald-950">Patented SmartGRID Pitch</div>
                  <p className="text-xs text-emerald-800 mt-0.5">{sop.productPitchNote}</p>
                </div>
              </div>

              {/* Financing */}
              <div className={`p-3 rounded-xl flex items-start gap-3 border ${
                sop.financingOffered ? 'bg-emerald-50/70 border-emerald-200/80' : 'bg-amber-50/70 border-amber-200/80'
              }`}>
                {sop.financingOffered ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <div className={`text-xs font-bold ${sop.financingOffered ? 'text-emerald-950' : 'text-amber-950'}`}>
                    Financing / EMI Mentioned
                  </div>
                  <p className={`text-xs mt-0.5 ${sop.financingOffered ? 'text-emerald-800' : 'text-amber-800'}`}>
                    {sop.financingNote}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Call Transcript */}
          {transcript.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-gray-600" />
                <span>Call Transcript Snippet</span>
              </h4>

              <div className="space-y-2 bg-gray-50 p-4 rounded-2xl border border-gray-100 max-h-56 overflow-y-auto">
                {transcript.map((line, idx) => (
                  <div key={idx} className="text-xs">
                    <span className={`font-bold ${line.speaker === 'Arvind' ? 'text-emerald-700' : 'text-blue-700'}`}>
                      {line.speaker}:{' '}
                    </span>
                    <span className="text-gray-700">{line.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end">
          <button
            onClick={closeCallReview}
            className="px-5 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            Done Reviewing
          </button>
        </div>
      </div>
    </div>
  );
};
