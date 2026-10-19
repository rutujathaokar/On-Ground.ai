import React from 'react';
import { Sparkles, Phone, Award, ShieldCheck, Target, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PracticeCallPage = () => {
  const { startCall } = useApp();

  const scenarios = [
    {
      id: "sc-1",
      title: "Walk-Out Recovery: Competitor Comparison",
      shopper: "Mukunda (Indiranagar Walk-In)",
      product: "Ortho GRID Mattress 8-Inch",
      objection: "Customer tested in showroom but comparing prices with Sleepyhead and Duroflex.",
      goal: "Name the shopper in first 10s (+23.6pp lift), pitch 2,500 air channels, offer 6-mo zero-cost EMI.",
      contact: {
        name: "Mukunda (Practice AI)",
        phone: "+91 98860 12345",
        product: "Ortho GRID (Practice)"
      }
    },
    {
      id: "sc-2",
      title: "Opening Greeting & First 10s Compliance",
      shopper: "Ritu S. (Koramangala Lead)",
      product: "Smart Luxe Mattress",
      objection: "Shopper called earlier and disconnected. Needs rapid high-energy qualification.",
      goal: "Maintain QA score above 85% by executing complete greeting script before 10-second mark.",
      contact: {
        name: "Ritu S. (Practice AI)",
        phone: "+91 98450 67890",
        product: "Smart Luxe (Practice)"
      }
    },
    {
      id: "sc-3",
      title: "Recliner Bed Elevator & Medical Pitch",
      shopper: "Kavitha R. (Whitefield Enquiry)",
      product: "Elev8 Smart Adjustable Bed",
      objection: "Worried about room space, weight capacity, and motor durability for elderly parents.",
      goal: "Explain dual German motor technology, zero-gravity elevation, and free white-glove setup.",
      contact: {
        name: "Kavitha R. (Practice AI)",
        phone: "+91 97401 55667",
        product: "Elev8 Bed (Practice)"
      }
    }
  ];

  return (
    <div className="space-y-6 pb-20 max-w-5xl mx-auto animate-fade-in">
      {/* Header Banner */}
      <div className="bg-[#1C2340] text-white rounded-3xl p-6 shadow-md border border-[#2B355F]">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Pitch Coach & Roleplay Simulator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Practise a Call
        </h1>
        <p className="text-xs text-indigo-200 mt-1 max-w-xl">
          Simulate live floor walk-outs with AI shoppers. Practise your opening greeting, objection handling, and pricing pitches with real microphone audio.
        </p>
      </div>

      {/* KPI highlight card */}
      <div className="p-4 bg-emerald-950/60 border border-emerald-800/60 rounded-2xl flex items-center justify-between text-xs text-emerald-200">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>
            <strong className="text-white">+23.6pp conversion lift</strong> when the agent explicitly names the shopper within the first 10 seconds.
          </span>
        </div>
        <span className="font-mono text-emerald-400 font-bold hidden sm:inline">
          Bain & Co / On-Ground.ai Benchmarks
        </span>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {scenarios.map((sc) => (
          <div
            key={sc.id}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs hover:border-emerald-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                {sc.product}
              </span>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                {sc.title}
              </h3>
              <p className="text-xs text-gray-500">
                <strong>Shopper:</strong> {sc.shopper}
              </p>
              <div className="p-2.5 bg-gray-50 rounded-xl text-xs text-gray-600 border border-gray-100">
                <span className="font-semibold text-gray-800 block text-[11px] mb-0.5">Live Objection:</span>
                "{sc.objection}"
              </div>
              <div className="p-2.5 bg-emerald-50/70 rounded-xl text-xs text-emerald-900 border border-emerald-100">
                <span className="font-semibold text-emerald-950 block text-[11px] mb-0.5">SOP Target:</span>
                {sc.goal}
              </div>
            </div>

            <button
              onClick={() => startCall(sc.contact)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-xs hover:shadow transition-transform active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>Launch Practice Call</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
