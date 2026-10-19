export const initialDashboardData = {
  agent: {
    name: "Arvind Rajan",
    company: "The Sleep Company",
    department: "Call Centre",
    avatar: "AR",
    score: 76,
    rank: 3,
    status: "On Queue",
    notificationCount: 4,
    greeting: "Good afternoon 👋"
  },
  kpis: [
    {
      id: "og-score",
      label: "OG SCORE™",
      value: "76",
      change: "▲ 13",
      trend: "up",
      note: "Top 5% in team"
    },
    {
      id: "avg-handle-time",
      label: "AVG HANDLE TIME",
      value: "4m 12s",
      change: "▼ 8%",
      trend: "good",
      note: "Target is < 4m 30s"
    },
    {
      id: "csat-today",
      label: "CSAT TODAY",
      value: "94%",
      change: "▲ 2pt",
      trend: "up",
      note: "14 ratings collected"
    },
    {
      id: "in-queue",
      label: "IN QUEUE",
      value: "2",
      badge: "• live",
      isLive: true,
      note: "Priya & Suresh waiting"
    }
  ],
  progress: {
    leadsCreated: {
      count: 3,
      change: "▲ +1",
      label: "Leads Created"
    },
    leadsCalled: {
      count: 2,
      change: "▲ +2",
      label: "Leads Called"
    }
  },
  earnings: {
    current: 5200,
    formatted: "₹5,200",
    fromCoachedMoves: "₹1,700 from coached moves",
    targetRange: "₹800 to ₹6,000",
    progressPercent: 86.6
  },
  whosWaiting: [
    {
      id: "waiting-1",
      name: "Priya Iyer",
      reason: "Likely billing dispute — flagged before",
      timeWaiting: "4m 20s",
      urgency: "high",
      phone: "+91 98451 22891",
      product: "Elev8 Smart Recliner Bed"
    },
    {
      id: "waiting-2",
      name: "Suresh Nair",
      reason: "Plan upgrade enquiry",
      timeWaiting: "1m 50s",
      urgency: "medium",
      phone: "+91 97110 33490",
      product: "SmartGRID Luxe Mattress"
    }
  ],
  tasks: [
    {
      id: "task-1",
      icon: "phone",
      count: 2,
      title: "callbacks",
      subtext: "next 4:30pm",
      actionType: "callbacks",
      highlight: true
    },
    {
      id: "task-2",
      icon: "flame",
      count: 2,
      title: "hot leads",
      subtext: "untouched 24h",
      actionType: "open_leads_modal",
      highlight: true
    },
    {
      id: "task-3",
      icon: "file-text",
      count: 1,
      title: "outcome",
      subtext: "to log",
      actionType: "log_outcome",
      highlight: false
    }
  ],
  charts: {
    callsHandled: [
      { day: "Mon", value: 18, isToday: false },
      { day: "Tue", value: 22, isToday: false },
      { day: "Wed", value: 15, isToday: false },
      { day: "Thu", value: 26, isToday: false },
      { day: "Fri", value: 20, isToday: false },
      { day: "Sat", value: 12, isToday: false },
      { day: "Today", value: 14, isToday: true }
    ],
    csatTrend: [
      { day: "Mon", value: 88, label: "88%", isToday: false },
      { day: "Tue", value: 90, label: "90%", isToday: false },
      { day: "Wed", value: 85, label: "85%", isToday: false },
      { day: "Thu", value: 92, label: "92%", isToday: false },
      { day: "Fri", value: 89, label: "89%", isToday: false },
      { day: "Sat", value: 91, label: "91%", isToday: false },
      { day: "Today", value: 94, label: "94%", isToday: true }
    ]
  }
};
