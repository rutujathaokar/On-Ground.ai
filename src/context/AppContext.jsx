import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialDashboardData } from '../data/dashboardData';
import { initialLeadsData } from '../data/leadsData';
import { initialIncomingData } from '../data/incomingData';
import { initialRecentCallsData } from '../data/recentCallsData';
import { initialCalendarData } from '../data/calendarData';
import { initialPulseData } from '../data/pulseData';
import { callService, CALL_STATUS } from '../services/callService';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Navigation / active screen
  const [activeTab, setActiveTab] = useState('dashboard');

  // Core Data States
  const [dashboardData, setDashboardData] = useState(initialDashboardData);
  const [leads, setLeads] = useState(initialLeadsData);
  const [incomingData, setIncomingData] = useState(initialIncomingData);
  const [recentCalls, setRecentCalls] = useState(initialRecentCallsData);
  const [calendarData, setCalendarData] = useState(initialCalendarData);
  const [pulseData, setPulseData] = useState(initialPulseData);

  // Modals & Active Selections
  const [isLeadsModalOpen, setIsLeadsModalOpen] = useState(false);
  const [activeLeadIndex, setActiveLeadIndex] = useState(0);

  const [isCallReviewModalOpen, setIsCallReviewModalOpen] = useState(false);
  const [activeReviewCall, setActiveReviewCall] = useState(null);

  const [isDialpadOpen, setIsDialpadOpen] = useState(false);
  const [isDailyBriefOpen, setIsDailyBriefOpen] = useState(false);

  // Live Call Service State
  const [callState, setCallState] = useState({
    status: CALL_STATUS.IDLE,
    contact: null,
    duration: 0,
    formattedDuration: '00:00',
    isMuted: false,
    isOnHold: false,
    micPermission: 'prompt'
  });
  const [audioLevel, setAudioLevel] = useState(0);
  const [remoteSpeech, setRemoteSpeech] = useState({ isSpeaking: false, text: '' });
  const [callError, setCallError] = useState(null);

  // Subscribe to call service events
  useEffect(() => {
    const unsubState = callService.subscribe('stateChange', (data) => {
      setCallState(prev => ({ ...prev, ...data }));

      // If call finished and produced summary, record it in Recent Calls!
      if (data.status === CALL_STATUS.ENDED && data.summary) {
        handleCallFinished(data.summary);
      }
    });

    const unsubTimer = callService.subscribe('timerTick', ({ seconds, formatted }) => {
      setCallState(prev => ({
        ...prev,
        duration: seconds,
        formattedDuration: formatted
      }));
    });

    const unsubLevel = callService.subscribe('audioLevel', (lvl) => {
      setAudioLevel(lvl);
    });

    const unsubSpeech = callService.subscribe('remoteSpeech', (data) => {
      setRemoteSpeech(data);
    });

    const unsubError = callService.subscribe('error', (err) => {
      setCallError(err);
    });

    return () => {
      unsubState();
      unsubTimer();
      unsubLevel();
      unsubSpeech();
      unsubError();
    };
  }, []);

  // When a call ends, add it to recent calls and increment dashboard metrics
  const handleCallFinished = (completedCall) => {
    setRecentCalls(prev => [completedCall, ...prev]);

    // Increment Leads Called in Dashboard
    setDashboardData(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        leadsCalled: {
          ...prev.progress.leadsCalled,
          count: prev.progress.leadsCalled.count + 1
        }
      }
    }));
  };

  // Launch a call to a lead/contact
  const startCall = (contact) => {
    setCallError(null);
    callService.startCall(contact);
  };

  const endCall = () => {
    callService.endCall();
  };

  const toggleMute = () => {
    callService.toggleMute();
  };

  const toggleHold = () => {
    callService.toggleHold();
  };

  const toggleSpeaker = () => {
    callService.toggleSpeaker();
  };

  const sendDtmf = (digit) => {
    callService.sendDtmf(digit);
  };

  // Leads Modal Controls
  const openLeadsModal = (index = 0) => {
    setActiveLeadIndex(index);
    setIsLeadsModalOpen(true);
  };

  const closeLeadsModal = () => {
    setIsLeadsModalOpen(false);
  };

  const nextLead = () => {
    setActiveLeadIndex(prev => (prev + 1) % leads.length);
  };

  const prevLead = () => {
    setActiveLeadIndex(prev => (prev - 1 + leads.length) % leads.length);
  };

  // Review Modal Controls
  const openCallReview = (call) => {
    setActiveReviewCall(call);
    setIsCallReviewModalOpen(true);
  };

  const closeCallReview = () => {
    setIsCallReviewModalOpen(false);
    setActiveReviewCall(null);
  };

  // Calendar Controls
  const selectCalendarDay = (day) => {
    setCalendarData(prev => ({
      ...prev,
      selectedDay: day
    }));
  };

  // Pulse Controls
  const sendPulseMessage = (text) => {
    if (!text.trim()) return;
    const now = new Date();
    const hours = now.getHours();
    const mins = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12;
    const timeStr = `${formattedHours}:${mins}${ampm}`;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: "You",
      initials: "AR",
      time: timeStr,
      isSelf: true,
      text: text.trim()
    };

    setPulseData(prev => ({
      ...prev,
      channelState: {
        ...prev.channelState,
        messages: [...prev.channelState.messages, newMsg]
      }
    }));

    // Realistic auto-reply from Sunita Rao after a brief pause
    setTimeout(() => {
      const managerReplies = [
        "Noted Arvind! Let's keep momentum going on this.",
        "Great follow-up. Let me know once customer approves the invoice quote.",
        "Awesome focus! Keep an eye on the 10-second opening greeting."
      ];
      const replyText = managerReplies[Math.floor(Math.random() * managerReplies.length)];

      setPulseData(prev => ({
        ...prev,
        channelState: {
          ...prev.channelState,
          messages: [
            ...prev.channelState.messages,
            {
              id: `msg-${Date.now()}-mgr`,
              sender: "Sunita Rao",
              initials: "SR",
              time: "Just now",
              isSelf: false,
              text: replyText
            }
          ]
        }
      }));
    }, 1500);
  };

  const respondToNeedsInput = (action, customAnswer = '') => {
    setPulseData(prev => ({
      ...prev,
      channelState: {
        ...prev.channelState,
        pinnedInput: {
          ...prev.channelState.pinnedInput,
          status: 'resolved',
          response: action === 'confirmed' ? 'Confirmed for 4:30pm' : action === 'reschedule' ? 'Rescheduled to tomorrow' : customAnswer
        }
      }
    }));
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        dashboardData,
        setDashboardData,
        leads,
        setLeads,
        incomingData,
        setIncomingData,
        recentCalls,
        setRecentCalls,
        calendarData,
        selectCalendarDay,
        pulseData,
        sendPulseMessage,
        respondToNeedsInput,
        // Leads modal
        isLeadsModalOpen,
        openLeadsModal,
        closeLeadsModal,
        activeLeadIndex,
        nextLead,
        prevLead,
        currentLead: leads[activeLeadIndex] || leads[0],
        // Call review modal
        isCallReviewModalOpen,
        openCallReview,
        closeCallReview,
        activeReviewCall,
        // Dialpad & Daily Brief
        isDialpadOpen,
        setIsDialpadOpen,
        isDailyBriefOpen,
        setIsDailyBriefOpen,
        // Calling system
        callState,
        audioLevel,
        remoteSpeech,
        callError,
        startCall,
        endCall,
        toggleMute,
        toggleHold,
        toggleSpeaker,
        sendDtmf
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
