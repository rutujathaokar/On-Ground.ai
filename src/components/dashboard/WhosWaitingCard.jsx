import React from 'react';
import { Headphones, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const WhosWaitingCard = () => {
  const navigate = useNavigate();
  const { dashboardData, startCall } = useApp();
  const { whosWaiting } = dashboardData;

  const handleCallWaiting = (customer) => {
    startCall({
      name: customer.name,
      phone: customer.phone,
      product: customer.product || "Enquiry"
    });
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
          WHO'S WAITING
        </h3>
        <button
          onClick={() => navigate('/calls')}
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
        >
          Open planner →
        </button>
      </div>

      {/* Waiting Rows */}
      <div className="space-y-2.5">
        {whosWaiting.map((customer) => {
          const isHighUrgency = customer.urgency === 'high';
          const badgeClass = isHighUrgency
            ? 'bg-rose-50 text-rose-700 border-rose-200'
            : 'bg-amber-50 text-amber-700 border-amber-200';

          return (
            <div
              key={customer.id}
              className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/70 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                    {customer.name}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {customer.reason}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border font-mono ${badgeClass}`}>
                  {customer.timeWaiting}
                </span>

                <button
                  onClick={() => handleCallWaiting(customer)}
                  className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-transform active:scale-95"
                  title={`Call ${customer.name}`}
                >
                  <Phone className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
