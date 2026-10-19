import React, { useState } from 'react';
import {
  Mic,
  MicOff,
  PhoneOff,
  Volume2,
  VolumeX,
  Pause,
  Play,
  Grid,
  Shield,
  CheckCircle2,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CALL_STATUS } from '../../services/callService';
import { AudioWaveform } from './AudioWaveform';

export const CallModal = () => {
  const {
    callState,
    audioLevel,
    remoteSpeech,
    callError,
    endCall,
    toggleMute,
    toggleHold,
    toggleSpeaker,
    sendDtmf,
    openCallReview
  } = useApp();

  const [showInCallKeypad, setShowInCallKeypad] = useState(false);
  const [agentSpokeScript, setAgentSpokeScript] = useState('');

  if (callState.status === CALL_STATUS.IDLE) return null;

  const isConnecting = callState.status === CALL_STATUS.CONNECTING;
  const isRinging = callState.status === CALL_STATUS.RINGING;
  const isActive = callState.status === CALL_STATUS.ACTIVE;
  const isEnded = callState.status === CALL_STATUS.ENDED;

  const contact = callState.contact || {
    name: "Customer",
    phone: "+91 98860 12345",
    product: "SmartGRID Mattress"
  };

  const agentScripts = [
    { label: "100-Night Trial", text: "We offer a 100-night risk-free trial with full refund guarantee." },
    { label: "6-Mo No Cost EMI", text: "You can purchase on 6-month zero-cost EMI starting at ₹1,415/mo." },
    { label: "48h Delivery", text: "We provide 48-hour free white-glove delivery directly to your room." }
  ];

  const handleScriptClick = (script) => {
    setAgentSpokeScript(script.text);
    if ('speechSynthesis' in window) {
      const utt = new SpeechSynthesisUtterance(`Customer responds: That sounds great! Please send me the breakdown on WhatsApp.`);
      utt.rate = 1.05;
      window.speechSynthesis.speak(utt);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0B1512] text-white rounded-3xl w-full max-w-md shadow-2xl border border-emerald-900/40 overflow-hidden flex flex-col relative">
        {/* Top Status Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400">
              On-Ground Secure Call
            </span>
          </div>

          {/* Status Badge */}
          {isConnecting && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Connecting...
            </span>
          )}
          {isRinging && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              Ringing...
            </span>
          )}
          {isActive && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              {callState.formattedDuration}
            </span>
          )}
          {isEnded && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-700 text-gray-300">
              Call Ended
            </span>
          )}
        </div>

        {/* Contact Info Center */}
        <div className="flex flex-col items-center px-6 py-4 text-center">
          <div className="relative mb-3">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-800 to-teal-600 flex items-center justify-center text-2xl font-bold text-white shadow-xl shadow-emerald-900/40 border-2 border-emerald-400/30">
              {contact.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'OG'}
            </div>
            {isActive && !callState.isMuted && (
              <span className="absolute -inset-1 rounded-full border-2 border-emerald-400 animate-ping opacity-40 pointer-events-none"></span>
            )}
          </div>

          <h3 className="text-xl font-bold text-white tracking-tight">{contact.name}</h3>
          <p className="text-sm text-gray-400 font-mono mt-0.5">{contact.phone}</p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-xs text-emerald-300 font-medium">
            <span>Interest: {contact.product || 'Ortho GRID'}</span>
          </div>

          {/* Microphone Permission Status */}
          <div className="mt-3">
            {callState.micPermission === 'granted' ? (
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Microphone active (speak to test waveform)</span>
              </div>
            ) : callState.micPermission === 'denied' ? (
              <div className="flex items-center gap-1.5 text-[11px] text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-800/40">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>Mic blocked — using browser simulated audio</span>
              </div>
            ) : null}
          </div>
        </div>

        {/* Audio Waveform Visualizer */}
        <div className="px-8 my-1">
          <div className="bg-[#07130F] rounded-2xl p-2.5 border border-emerald-900/30 shadow-inner">
            <AudioWaveform
              level={audioLevel}
              isMuted={callState.isMuted}
              isActive={isActive}
            />
          </div>
        </div>

        {/* Remote Customer Speech & Dialogue Subtitles */}
        {isActive && (
          <div className="px-6 py-2">
            {remoteSpeech.isSpeaking && (
              <div className="p-3 bg-emerald-900/30 border border-emerald-500/40 rounded-xl text-xs text-emerald-200 animate-pulse flex items-start gap-2">
                <span className="font-semibold text-emerald-400">Shopper:</span>
                <span>"{remoteSpeech.text}"</span>
              </div>
            )}

            {agentSpokeScript && (
              <div className="mt-1.5 p-2.5 bg-blue-900/30 border border-blue-500/40 rounded-xl text-xs text-blue-200 flex items-start gap-2">
                <span className="font-semibold text-blue-400">You pitched:</span>
                <span>"{agentSpokeScript}"</span>
              </div>
            )}

            {/* Quick Pitch Pills for Agent */}
            <div className="mt-3">
              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-1.5">
                Suggested Coached Moves (+23.6pp lift):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {agentScripts.map((sc, i) => (
                  <button
                    key={i}
                    onClick={() => handleScriptClick(sc)}
                    className="px-2.5 py-1 rounded-lg bg-[#0F2E23] hover:bg-[#154232] text-[11px] font-medium text-emerald-300 border border-emerald-700/40 transition-colors flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>{sc.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Inline Dialpad for DTMF */}
        {showInCallKeypad && (
          <div className="grid grid-cols-3 gap-2 px-8 py-3 bg-[#081813]">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((d) => (
              <button
                key={d}
                onClick={() => sendDtmf(d)}
                className="h-10 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 text-sm font-bold text-white border border-emerald-800/40 active:scale-95 transition-all"
              >
                {d}
              </button>
            ))}
          </div>
        )}

        {/* In-Call Controls Row */}
        {!isEnded ? (
          <div className="px-6 pt-4 pb-6 bg-[#07130F] border-t border-emerald-950 flex items-center justify-around">
            {/* Mute */}
            <button
              onClick={toggleMute}
              className={`p-3.5 rounded-full transition-all ${
                callState.isMuted
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40'
                  : 'bg-emerald-950 text-gray-300 hover:bg-emerald-900 hover:text-white border border-emerald-800/50'
              }`}
              title={callState.isMuted ? "Unmute Microphone" : "Mute Microphone"}
            >
              {callState.isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Keypad */}
            <button
              onClick={() => setShowInCallKeypad(prev => !prev)}
              className={`p-3.5 rounded-full transition-all ${
                showInCallKeypad
                  ? 'bg-blue-600 text-white'
                  : 'bg-emerald-950 text-gray-300 hover:bg-emerald-900 hover:text-white border border-emerald-800/50'
              }`}
              title="DTMF Keypad"
            >
              <Grid className="w-5 h-5" />
            </button>

            {/* Hold */}
            <button
              onClick={toggleHold}
              className={`p-3.5 rounded-full transition-all ${
                callState.isOnHold
                  ? 'bg-amber-600 text-white'
                  : 'bg-emerald-950 text-gray-300 hover:bg-emerald-900 hover:text-white border border-emerald-800/50'
              }`}
              title={callState.isOnHold ? "Resume Call" : "Hold Call"}
            >
              {callState.isOnHold ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
            </button>

            {/* Speaker */}
            <button
              onClick={toggleSpeaker}
              className="p-3.5 rounded-full bg-emerald-950 text-gray-300 hover:bg-emerald-900 hover:text-white border border-emerald-800/50 transition-all"
              title="Speaker Toggle"
            >
              <Volume2 className="w-5 h-5" />
            </button>

            {/* End Call Button */}
            <button
              onClick={endCall}
              className="p-3.5 rounded-full bg-rose-600 hover:bg-rose-500 active:scale-95 text-white shadow-xl shadow-rose-950 transition-transform"
              title="End Call"
            >
              <PhoneOff className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="p-6 bg-[#07130F] border-t border-emerald-950 text-center">
            <p className="text-sm text-gray-300 font-medium mb-1">
              Call logged with duration <span className="font-bold text-white">{callState.formattedDuration}</span>
            </p>
            <p className="text-xs text-emerald-400 mb-4">
              ✓ Added to Recent Calls & SOP evaluated
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  if (callState.summary) openCallReview(callState.summary);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white shadow"
              >
                View SOP Review
              </button>
              <button
                onClick={() => endCall()}
                className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
