import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LeadRow } from '../components/calls/LeadRow';

export const CallsToMakePage = () => {
  const { leads } = useApp();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const leadsPerPage = 2; // Matches screenshot showing 2 leads on page 1 of 3

  // Filter leads if search is active
  const filteredLeads = leads.filter(l =>
    l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.phone.includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage) || 1;
  const startIndex = (currentPage - 1) * leadsPerPage;
  const currentLeads = filteredLeads.slice(startIndex, startIndex + leadsPerPage);

  const handlePrevPage = () => {
    setCurrentPage(p => Math.max(1, p - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(p => Math.min(totalPages, p + 1));
  };

  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto animate-fade-in">
      {/* Header Banner */}
      <div className="bg-[#1C2340] text-white rounded-3xl p-6 shadow-md border border-[#2B355F] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider block">
            Today's calling plan
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
            Planner
          </h1>
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads by name or product..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 bg-[#283259] text-white placeholder-gray-400 rounded-xl text-xs border border-[#3A477A] focus:outline-none focus:border-indigo-400 transition-colors"
          />
        </div>
      </div>

      {/* Subheader */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
        <div>
          <h2 className="text-base font-bold text-gray-900">Planned outgoing calls</h2>
          <p className="text-xs text-gray-500">
            Ranked by lead attractiveness score — tap a lead for the full picture
          </p>
        </div>
      </div>

      {/* Leads List */}
      <div className="space-y-3">
        {currentLeads.map((lead, idx) => (
          <LeadRow
            key={lead.id}
            lead={lead}
            index={startIndex + idx}
          />
        ))}

        {currentLeads.length === 0 && (
          <div className="bg-white rounded-2xl p-10 text-center text-gray-500 border border-gray-100">
            No leads found matching "{searchQuery}"
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-3 pt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`p-2 rounded-full border border-gray-200 bg-white transition-colors ${
            currentPage === 1
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-50 active:scale-95'
          }`}
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="text-xs font-semibold text-gray-700 font-mono">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-full border border-gray-200 bg-white transition-colors ${
            currentPage === totalPages
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-700 hover:bg-gray-50 active:scale-95'
          }`}
          title="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
