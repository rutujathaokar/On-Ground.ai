import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Pin,
  Send,
  Smile,
  CheckCircle2,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const PulseChannelPage = () => {
  const navigate = useNavigate();
  const { pulseData, sendPulseMessage, respondToNeedsInput } = useApp();
  const { channelState } = pulseData;
  const { pinnedInput, messages } = channelState;

  const [inputMessage, setInputMessage] = useState('');
  const [customAnswer, setCustomAnswer] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    sendPulseMessage(inputMessage);
    setInputMessage('');
  };

  const handleCustomAnswerSubmit = (e) => {
    e.preventDefault();
    if (!customAnswer.trim()) return;
    respondToNeedsInput('custom', customAnswer);
    setCustomAnswer('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] pb-16 max-w-4xl mx-auto animate-fade-in">
      {/* Channel Header */}
      <div className="bg-[#6B21A8] text-white px-5 py-3.5 rounded-2xl flex items-center gap-3 shadow-sm border border-purple-700 flex-shrink-0">
        <button
          onClick={() => navigate('/pulse')}
          className="p-1.5 rounded-xl hover:bg-white/20 text-purple-200 hover:text-white transition-colors"
          title="Back to Pulse"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="text-base sm:text-lg font-bold tracking-tight">
          #{channelState.name}
        </h1>
      </div>

      {/* Pinned "Needs your input" Card */}
      <div className="my-4 bg-white rounded-2xl p-4 sm:p-5 border border-amber-200/80 shadow-xs flex-shrink-0">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-1.5">
          <Pin className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
          <span>Needs your input</span>
          <span className="w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] flex items-center justify-center font-bold">
            1
          </span>
          <span className="text-[11px] font-normal text-amber-700">pinned</span>
        </div>

        <div className="my-2">
          <h3 className="font-bold text-sm sm:text-base text-gray-900">
            {pinnedInput.title}
          </h3>
          <p className="text-xs text-gray-500">
            {pinnedInput.subtitle}
          </p>
        </div>

        {/* Action Controls or Resolved State */}
        {pinnedInput.status === 'resolved' ? (
          <div className="mt-3 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Response recorded: {pinnedInput.response}</span>
          </div>
        ) : (
          <div className="space-y-3 mt-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => respondToNeedsInput('confirmed')}
                className="px-4 py-1.5 rounded-xl bg-white border border-gray-300 hover:border-gray-400 text-xs font-bold text-gray-800 shadow-2xs hover:bg-gray-50 active:scale-95 transition-all"
              >
                Confirmed
              </button>
              <button
                onClick={() => respondToNeedsInput('reschedule')}
                className="px-4 py-1.5 rounded-xl bg-white border border-gray-300 hover:border-gray-400 text-xs font-bold text-gray-800 shadow-2xs hover:bg-gray-50 active:scale-95 transition-all"
              >
                Reschedule
              </button>
            </div>

            {/* Custom Answer Input */}
            <form onSubmit={handleCustomAnswerSubmit} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Or type your answer"
                value={customAnswer}
                onChange={(e) => setCustomAnswer(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-[#5C2614] hover:bg-[#4A1E10] text-white text-xs font-bold transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Date Divider */}
      <div className="flex items-center justify-center my-3 text-[11px] font-semibold text-gray-400">
        <span>Today · Call Centre Team</span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-2 space-y-4 pb-4">
        {messages.map((msg) => {
          if (msg.isSelf) {
            // Current User Bubble (Green on Right)
            return (
              <div key={msg.id} className="flex flex-col items-end">
                <span className="text-[10px] text-gray-400 mr-2 mb-1">
                  You {msg.time}
                </span>
                <div className="max-w-md p-3.5 rounded-2xl rounded-tr-none bg-[#0D6247] text-white text-xs sm:text-sm shadow-2xs leading-relaxed">
                  {msg.text}
                </div>
              </div>
            );
          }

          // Other Member Bubble (Left)
          return (
            <div key={msg.id} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center flex-shrink-0 border border-amber-200/60 mt-1">
                {msg.initials}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-xs text-gray-900">{msg.sender}</span>
                  <span className="text-[10px] text-gray-400">{msg.time}</span>
                </div>
                <div className="max-w-lg p-3.5 rounded-2xl rounded-tl-none bg-white border border-gray-200/80 text-gray-800 text-xs sm:text-sm shadow-2xs leading-relaxed">
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Message Input Field */}
      <form
        onSubmit={handleSendMessage}
        className="p-2 bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center gap-2 flex-shrink-0"
      >
        <input
          type="text"
          placeholder="Message #callcentre-team..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1 px-4 py-2 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
        />

        <button
          type="button"
          onClick={() => setInputMessage(prev => prev + " 👍")}
          className="p-2 text-gray-400 hover:text-amber-500 transition-colors"
          title="Add emoji"
        >
          <Smile className="w-5 h-5" />
        </button>

        <button
          type="submit"
          disabled={!inputMessage.trim()}
          className={`p-2.5 rounded-xl transition-all ${
            inputMessage.trim()
              ? 'bg-purple-700 hover:bg-purple-600 text-white shadow-xs active:scale-95'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          title="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
