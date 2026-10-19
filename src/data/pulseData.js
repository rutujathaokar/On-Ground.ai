export const initialPulseData = {
  header: {
    title: "Pulse",
    subtitle: "The Sleep Company · Koramangala"
  },
  avaniBot: {
    name: "AvaniBot",
    status: "ALWAYS ON",
    description: "Ask me about anything happening in Pulse — daily briefs, action items, quick answers",
    coins: 2,
    dailyBrief: "Today's Focus: 5 missed high-intent calls need urgent callback. Naming the shopper within 10s lifts conversion by +23.6pp. Priya Iyer callback scheduled at 4:30 PM."
  },
  roleAgents: [
    {
      id: "callcentre-agent",
      name: "callcentre-agent",
      displayName: "# callcentre-agent",
      subtitle: "Call Centre Agent",
      route: "/pulse/channel",
      borderColor: "border-blue-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    }
  ],
  taskAgents: [
    {
      id: "cross-sell-agent",
      name: "cross-sell-agent",
      displayName: "# cross-sell-agent",
      subtitle: "Your Attach rate · 5 members",
      metric: "24%",
      route: "/pulse/channel",
      borderColor: "border-purple-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      id: "sop-agent",
      name: "sop-agent",
      displayName: "# sop-agent",
      subtitle: "Your SOP adherence · 5 members",
      metric: "81%",
      route: "/pulse/channel",
      borderColor: "border-teal-500",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600"
    },
    {
      id: "lead-conversion-agent",
      name: "lead-conversion-agent",
      displayName: "# lead-conversion-agent",
      subtitle: "Lead Conversion Agent",
      metric: null,
      route: "/pulse/channel",
      borderColor: "border-rose-500",
      bgColor: "bg-rose-50",
      iconColor: "text-rose-600"
    },
    {
      id: "capture-agent",
      name: "capture-agent",
      displayName: "# capture-agent",
      subtitle: "Your Capture coverage · 5 members",
      metric: "78%",
      route: "/pulse/channel",
      borderColor: "border-emerald-500",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600"
    }
  ],
  generalChannels: [
    {
      id: "customer-discussions",
      name: "customer-discussions",
      displayName: "customer-discussions",
      subtitle: "Relayed via WhatsApp Business",
      icon: "whatsapp",
      route: "/pulse/channel"
    }
  ],
  kudos: {
    count: 3,
    badgeText: "3 NEW",
    highlight: "Great work with Mukunda — closed that objection beautifully!",
    author: "Sunita Rao (Manager)",
    allTimeCount: 12
  },
  channelState: {
    name: "callcentre-team",
    channelId: "callcentre-team",
    pinnedInput: {
      id: "pinned-1",
      title: "Confirm the 4:30pm callback",
      subtitle: "Priya Iyer · likely billing dispute",
      status: "pending",
      response: null
    },
    messages: [
      {
        id: "m-1",
        sender: "Sunita Rao",
        initials: "SR",
        time: "2:05pm",
        isSelf: false,
        text: "👥 STAKEHOLDERS: @You (Arvind R.), whole call centre shift"
      },
      {
        id: "m-2",
        sender: "Sunita Rao",
        initials: "SR",
        time: "2:05pm",
        isSelf: false,
        text: "📋 ISSUE DEFINITION: Greeting-in-first-10s QA score is at 71% this week, below our 85% target."
      },
      {
        id: "m-3",
        sender: "Sunita Rao",
        initials: "SR",
        time: "2:05pm",
        isSelf: false,
        text: "➡️ SUGGESTED RESOLUTION: Let's push that up 💪 — open every call with the greeting script. I'll check back Friday."
      },
      {
        id: "m-4",
        sender: "You",
        initials: "AR",
        time: "2:10pm",
        isSelf: true,
        text: "On it! Will make sure I open every call with the greeting script 🙌"
      },
      {
        id: "m-5",
        sender: "Sunita Rao",
        initials: "SR",
        time: "2:14pm",
        isSelf: false,
        text: "Great attitude Arvind 🌟"
      }
    ]
  }
};
