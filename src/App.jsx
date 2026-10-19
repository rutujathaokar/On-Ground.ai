import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './layouts/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { CallsToMakePage } from './pages/CallsToMakePage';
import { IncomingPage } from './pages/IncomingPage';
import { RecentPage } from './pages/RecentPage';
import { CalendarPage } from './pages/CalendarPage';
import { PulseHomePage } from './pages/PulseHomePage';
import { PulseChannelPage } from './pages/PulseChannelPage';
import { PracticeCallPage } from './pages/PracticeCallPage';

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="calls" element={<CallsToMakePage />} />
            <Route path="incoming" element={<IncomingPage />} />
            <Route path="recent" element={<RecentPage />} />
            <Route path="practice" element={<PracticeCallPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="pulse" element={<PulseHomePage />} />
            <Route path="pulse/channel" element={<PulseChannelPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
