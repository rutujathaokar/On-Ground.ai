import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  MessageSquare,
  Star,
  Trophy,
  ArrowRight,
  Headphones,
  CheckCircle2,
  X,
  Share2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const PulseHomePage = () => {
  const navigate = useNavigate();
  const { pulseData, isDailyBriefOpen, setIsDailyBriefOpen } = useApp();
  const { header, avaniBot, roleAgents, taskAgents, generalChannels, kudos } = pulseData;
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto animate-fade-in">
      {/* Pulse Purple Header */}
      <div className="bg-[#6B21A8] text-white rounded-3xl p-5 sm:p-6 shadow-md border border-purple-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-700 rounded-2xl">
            <MessageSquare className="w-6 h-6 text-purple-200" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight">{header.title}</h1>
            <p className="text-xs text-purple-200">{header.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Sparkles className="w-4 h-4 text-purple-500 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Ask AvaniBot or search Pulse..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-11 py-3 bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm text-gray-800 placeholder-gray-400 shadow-2xs focus:outline-none focus:border-purple-500 transition-colors"
        />
        <Search className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
      </div>

      {/* AvaniBot Hero Banner */}
      <div className="bg-gradient-to-r from-[#6B21A8] via-[#7C3AED] to-[#8B5CF6] text-white rounded-3xl p-6 shadow-lg border border-purple-500/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/20 rounded-xl">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <h2 className="text-lg font-extrabold">{avaniBot.name}</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white tracking-wider">
                {avaniBot.status}
              </span>
            </div>
            <p className="text-xs text-purple-100 max-w-xl">
              {avaniBot.description}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-amber-950 font-bold text-xs flex items-center gap-1 shadow-xs">
              <Star className="w-3.5 h-3.5 fill-amber-950 text-amber-950" />
              <span>{avaniBot.coins}</span>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 mt-5 pt-4 border-t border-white/20">
          <button
            onClick={() => setIsDailyBriefOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-xs font-bold text-white transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Daily Brief</span>
          </button>
          <button
            onClick={() => navigate('/pulse/channel')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-purple-100 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Ask a question</span>
          </button>
        </div>
      </div>

      {/* Daily Brief Modal */}
      {isDailyBriefOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-gray-100 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-purple-800 font-bold">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <span>AvaniBot Daily Brief</span>
              </div>
              <button
                onClick={() => setIsDailyBriefOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed bg-purple-50 p-4 rounded-2xl border border-purple-100">
              {avaniBot.dailyBrief}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setIsDailyBriefOpen(false)}
                className="px-4 py-2 rounded-xl bg-purple-700 text-white text-xs font-bold hover:bg-purple-600 transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Agents Section Header */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Custom Agents</span>
        </h3>
        <p className="text-xs text-gray-500">
          Set up by your manager — already live, tap to open
        </p>
      </div>

      {/* ROLE AGENTS run a team */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
          ROLE AGENTS <span className="text-gray-500 font-normal">run a team</span>
        </span>

        {roleAgents.map((agent) => (
          <div
            key={agent.id}
            onClick={() => navigate(agent.route)}
            className={`bg-white rounded-2xl p-4 sm:p-5 border border-l-4 ${agent.borderColor} shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-sm sm:text-base">
                  {agent.displayName}
                </h4>
                <p className="text-xs text-gray-500">{agent.subtitle}</p>
              </div>
            </div>

            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          </div>
        ))}
      </div>

      {/* TASK AGENTS move one metric */}
      <div className="space-y-2.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
          TASK AGENTS <span className="text-gray-500 font-normal">move one metric</span>
        </span>

        <div className="space-y-2">
          {taskAgents.map((agent) => (
            <div
              key={agent.id}
              onClick={() => navigate(agent.route)}
              className={`bg-white rounded-2xl p-4 sm:p-5 border border-l-4 ${agent.borderColor} shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group`}
            >
              <div>
                <h4 className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors text-sm sm:text-base">
                  {agent.displayName}
                </h4>
                <p className="text-xs text-gray-500">{agent.subtitle}</p>
              </div>

              <div className="flex items-center gap-3">
                {agent.metric && (
                  <span className="text-base sm:text-lg font-black text-gray-900 font-mono">
                    {agent.metric}
                  </span>
                )}
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GENERAL Section */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
          GENERAL
        </span>

        {generalChannels.map((gen) => (
          <div
            key={gen.id}
            onClick={() => navigate(gen.route)}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-2xs hover:border-gray-200 transition-all cursor-pointer flex items-center justify-between group"
          >
            <div>
              <h4 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors text-sm sm:text-base">
                {gen.displayName}
              </h4>
              <p className="text-xs text-gray-500">{gen.subtitle}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700 transition-colors" />
          </div>
        ))}
      </div>

      {/* Kudos 3 NEW Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-amber-400 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-white/20 rounded-2xl">
            <Trophy className="w-6 h-6 text-amber-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base">Kudos</h3>
              <span className="px-2 py-0.5 rounded-full bg-white text-amber-900 font-black text-[10px]">
                {kudos.badgeText}
              </span>
            </div>
            <p className="text-xs text-amber-50 font-medium mt-1">
              "{kudos.highlight}" — <span className="opacity-80">{kudos.author}</span>
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xl font-black font-mono block">{kudos.allTimeCount}</span>
          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-200">
            ALL-TIME
          </span>
        </div>
      </div>
    </div>
  );
};
