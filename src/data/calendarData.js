export const initialCalendarData = {
  currentMonth: "October",
  currentYear: 2026,
  selectedDay: 9,
  events: [
    {
      id: "ev-1",
      date: "2026-10-09",
      day: 9,
      title: "Afternoon Callback Shift: High Intent Walk-Ins",
      time: "2:00 PM – 4:30 PM",
      location: "Virtual / Dialler Shift",
      type: "shift",
      attendees: ["Arvind Rajan", "Sunita Rao (Manager)"],
      description: "Priority follow-ups for shoppers who visited Indiranagar & Koramangala experience centres."
    },
    {
      id: "ev-2",
      date: "2026-10-09",
      day: 9,
      title: "Scheduled Callback: Priya Iyer",
      time: "4:30 PM – 4:45 PM",
      location: "Direct Phone Callback",
      type: "callback",
      attendees: ["Arvind Rajan", "Priya Iyer"],
      description: "Discuss billing dispute resolution and discount adjustment on Elev8 Recliner Bed."
    },
    {
      id: "ev-3",
      date: "2026-10-23",
      day: 23,
      title: "Store Visit & Pitch Coaching: Indiranagar Hub",
      time: "10:30 AM – 1:00 PM",
      location: "Indiranagar Experience Store",
      type: "coaching",
      hasDot: true,
      attendees: ["Arvind Rajan", "Mukunda Dwarkanath (Co-founder)", "Store Staff"],
      description: "On-ground walkthrough observing walk-out objections and live pitch calibration."
    },
    {
      id: "ev-4",
      date: "2026-10-26",
      day: 26,
      title: "Weekly QA & SOP Adherence Review",
      time: "3:00 PM – 4:00 PM",
      location: "Meeting Room B & Google Meet",
      type: "meeting",
      hasDot: true,
      attendees: ["Call Centre Shift Team", "Sunita Rao"],
      description: "Review of opening 10-second greeting scores, naming shopper conversion impact."
    },
    {
      id: "ev-5",
      date: "2026-10-28",
      day: 28,
      title: "Festival Campaign Prep & Product Demo",
      time: "11:00 AM – 12:30 PM",
      location: "Training Deck",
      type: "training",
      hasDot: true,
      attendees: ["All Agents", "Product Head"],
      description: "Briefing on Diwali EMI promotional bundles, mattress protector attach targets."
    }
  ]
};
