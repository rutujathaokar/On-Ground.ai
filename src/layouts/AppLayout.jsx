import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { TopBar } from '../components/layout/TopBar';
import { DemoBar } from '../components/layout/DemoBar';
import { LeadDetailsModal } from '../components/calls/LeadDetailsModal';
import { CallReviewModal } from '../components/calls/CallReviewModal';
import { CallModal } from '../components/dialer/CallModal';
import { DialpadModal } from '../components/dialer/DialpadModal';

export const AppLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans antialiased text-gray-900 flex">
      {/* Sidebar */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-60">
        {/* Sticky TopBar */}
        <TopBar setIsMobileOpen={setIsMobileOpen} />

        {/* Dynamic Route Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Floating Demo Control Strip */}
      <DemoBar />

      {/* Global Modals */}
      <LeadDetailsModal />
      <CallReviewModal />
      <CallModal />
      <DialpadModal />
    </div>
  );
};
