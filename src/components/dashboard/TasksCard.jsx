import React, { useState } from 'react';
import { Phone, Flame, FileText, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const TasksCard = () => {
  const navigate = useNavigate();
  const { openLeadsModal } = useApp();
  const [loggedOutcome, setLoggedOutcome] = useState(false);

  const handleTaskClick = (type) => {
    if (type === 'callbacks') {
      navigate('/incoming');
    } else if (type === 'open_leads_modal') {
      openLeadsModal(0);
    } else if (type === 'log_outcome') {
      setLoggedOutcome(prev => !prev);
    }
  };

  return (
    <div className="bg-[#4E2113] rounded-2xl overflow-hidden shadow-sm border border-[#642917] text-white">
      {/* Brown Header */}
      <div className="px-5 py-3.5 flex items-center gap-2">
        <FileText className="w-4 h-4 text-amber-300" />
        <h3 className="text-sm font-bold tracking-tight">My Tasks</h3>
        <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center ml-1">
          {loggedOutcome ? 2 : 3}
        </span>
      </div>

      {/* Task Rows */}
      <div className="bg-white text-gray-800 p-2 space-y-1">
        {/* Row 1: callbacks */}
        <button
          onClick={() => handleTaskClick('callbacks')}
          className="w-full p-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 flex items-center justify-between text-left transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm text-gray-900">2 callbacks</span>
              <span className="text-xs text-gray-500 ml-2">next 4:30pm</span>
            </div>
          </div>
          <span className="text-xs text-blue-600 font-semibold group-hover:underline">View →</span>
        </button>

        {/* Row 2: hot leads -> opens Leads Modal */}
        <button
          onClick={() => handleTaskClick('open_leads_modal')}
          className="w-full p-3 rounded-xl border border-amber-200/80 bg-amber-50/30 hover:bg-amber-50/70 hover:border-amber-300 flex items-center justify-between text-left transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-700 group-hover:bg-amber-200 transition-colors">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-sm text-gray-900">2 hot leads</span>
              <span className="text-xs text-amber-700 font-medium ml-2">untouched 24h</span>
            </div>
          </div>
          <span className="text-xs text-amber-700 font-semibold group-hover:underline">Open modal →</span>
        </button>

        {/* Row 3: outcome */}
        <button
          onClick={() => handleTaskClick('log_outcome')}
          className="w-full p-3 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 flex items-center justify-between text-left transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${loggedOutcome ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
              {loggedOutcome ? <CheckCircle2 className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
            </div>
            <div>
              <span className="font-bold text-sm text-gray-900">
                {loggedOutcome ? "Outcome logged" : "1 outcome"}
              </span>
              <span className="text-xs text-gray-500 ml-2">
                {loggedOutcome ? "Completed" : "to log"}
              </span>
            </div>
          </div>
          <span className="text-xs text-gray-500 font-medium">
            {loggedOutcome ? "Logged ✓" : "Log now"}
          </span>
        </button>
      </div>
    </div>
  );
};
