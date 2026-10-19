export const initialLeadsData = [
  {
    id: "lead-1",
    name: "Mukunda",
    initials: "MK",
    phone: "+91 98860 12345",
    email: "mukunda@example.com",
    score: 90,
    status: "OPEN",
    sla: "2h left",
    slaUrgent: true,
    product: "Ortho GRID",
    price: "₹8,490",
    actionBanner: "Quote to be given to customer",
    icpScore: 87,
    intentScore: 91,
    location: "Indiranagar, Bengaluru",
    lastTouch: "Store visit 2 days ago",
    notes: "Spoke to retail rep Arun. Interested in Queen size. Price sensitive on delivery fee.",
    icpBreakdown: [
      { factor: "Budget & Pricing Fit", score: "92%", note: "Looking at ₹8,000–₹12,000 range" },
      { factor: "Decision Authority", score: "95%", note: "Buying for primary bedroom" },
      { factor: "Need Urgency", score: "88%", note: "Experiencing lumbar disc stiffness" },
      { factor: "Brand Affinity", score: "78%", note: "Follows Sleep Company on Instagram" }
    ],
    journey: [
      { time: "Oct 16, 4:15 PM", event: "Visited Indiranagar Flagship Experience Centre" },
      { time: "Oct 16, 4:35 PM", event: "Tested Ortho GRID for 15 minutes with pressure mapping" },
      { time: "Oct 17, 11:20 AM", event: "Requested digital brochure & EMI breakdown on WhatsApp" },
      { time: "Oct 18, 9:40 PM", event: "Added Queen size Ortho GRID to cart online — abandoned at payment" }
    ],
    buyingSignals: [
      {
        type: "Financing Related",
        icon: "currency",
        content: "Asked specifically about EMI options on the Ortho GRID — budget is a live concern, not a blocker"
      },
      {
        type: "Quotation Demanded",
        icon: "file",
        content: "Compared pricing with a competitor before reaching out — price-anchored, expects a competitive number"
      },
      {
        type: "Warranty Related",
        icon: "shield",
        content: "Hasn't raised this yet — worth proactively mentioning the 100-night trial to reduce perceived risk"
      }
    ]
  },
  {
    id: "lead-2",
    name: "Ritu S.",
    initials: "RS",
    phone: "+91 98450 67890",
    email: "ritu.sharma@example.com",
    score: 96,
    status: "OPEN",
    sla: "4h left",
    slaUrgent: false,
    product: "Smart Luxe Mattress",
    price: "₹13,390",
    actionBanner: "Offer bundle discount with Smart Ortho Pillows",
    icpScore: 94,
    intentScore: 96,
    location: "Koramangala, Bengaluru",
    lastTouch: "Missed call today at 11:20 AM",
    notes: "High intent shopper. Wants King size. Asked about Sunday white-glove installation.",
    icpBreakdown: [
      { factor: "Budget & Pricing Fit", score: "98%", note: "Premium tier buyer" },
      { factor: "Decision Authority", score: "100%", note: "Ready to swipe card on phone call" },
      { factor: "Need Urgency", score: "92%", note: "Moving into new flat this weekend" }
    ],
    journey: [
      { time: "Today, 11:20 AM", event: "Called helpline — disconnected after 2 rings (logged in Incoming)" },
      { time: "Yesterday, 8:00 PM", event: "Configured custom King size dimensions on website" },
      { time: "Oct 17, 2:00 PM", event: "Showroom walkthrough with partner" }
    ],
    buyingSignals: [
      {
        type: "Timeline Urgency",
        icon: "clock",
        content: "Housewarming on Sunday — needs guaranteed 48-hour delivery"
      },
      {
        type: "Cross-Sell Propensity",
        icon: "sparkles",
        content: "High probability (84%) of adding 2 adjustable latex contour pillows"
      }
    ]
  },
  {
    id: "lead-3",
    name: "Faizan A.",
    initials: "FA",
    phone: "+91 99123 45678",
    email: "faizan.ahmed@example.com",
    score: 85,
    status: "OPEN",
    sla: "6h left",
    slaUrgent: false,
    product: "SmartGRID Luxe 8-Inch",
    price: "₹24,990",
    actionBanner: "Resolve delivery timeline concern",
    icpScore: 88,
    intentScore: 82,
    location: "HSR Layout, Bengaluru",
    lastTouch: "Missed call today at 10:05 AM",
    notes: "Previous customer of Sleepyhead. Comparing mattress firmness scores.",
    icpBreakdown: [
      { factor: "Budget & Pricing Fit", score: "90%", note: "Pre-approved credit card EMI" },
      { factor: "Decision Authority", score: "85%", note: "Consulting spouse on firmness level" }
    ],
    journey: [
      { time: "Today, 10:05 AM", event: "Incoming call missed" },
      { time: "Oct 18, 3:30 PM", event: "Read 14 verified customer reviews on durability" }
    ],
    buyingSignals: [
      {
        type: "Competitor Comparison",
        icon: "scale",
        content: "Explicitly compared SmartGRID patented tech vs standard memory foam sagging resistance"
      }
    ]
  },
  {
    id: "lead-4",
    name: "Kavitha R.",
    initials: "KR",
    phone: "+91 97401 55667",
    email: "kavitha.r@example.com",
    score: 82,
    status: "OPEN",
    sla: "1h left",
    slaUrgent: true,
    product: "Elev8 Smart Adjustable Bed",
    price: "₹24,990",
    actionBanner: "Offer zero-cost 6-month EMI plan",
    icpScore: 85,
    intentScore: 80,
    location: "Whitefield, Bengaluru",
    lastTouch: "Missed call yesterday at 4:40 PM",
    notes: "Looking for dual motor incline bed for elderly parents.",
    icpBreakdown: [
      { factor: "Budget & Pricing Fit", score: "84%", note: "Looking for financing options" },
      { factor: "Product Fit", score: "96%", note: "Needs medical elevation support" }
    ],
    journey: [
      { time: "Yesterday, 4:40 PM", event: "Inbound call missed" },
      { time: "Oct 17, 6:00 PM", event: "Downloaded Elev8 instruction manual PDF" }
    ],
    buyingSignals: [
      {
        type: "Health Requirement",
        icon: "activity",
        content: "Orthopedic doctor recommended 30-degree head elevation for acid reflux and back ease"
      }
    ]
  },
  {
    id: "lead-5",
    name: "Divya P.",
    initials: "DP",
    phone: "+91 98200 99881",
    email: "divya.p@example.com",
    score: 78,
    status: "OPEN",
    sla: "30m left",
    slaUrgent: true,
    product: "Ortho GRID Mattress 6-Inch",
    price: "₹18,490",
    actionBanner: "Address competitor price match",
    icpScore: 79,
    intentScore: 76,
    location: "Jayanagar, Bengaluru",
    lastTouch: "Missed call yesterday at 2:15 PM",
    notes: "Visited store last week. Hesitant between Ortho Pro and Ortho GRID.",
    icpBreakdown: [
      { factor: "Budget & Pricing Fit", score: "80%", note: "Awaiting festival promo code" },
      { factor: "Product Fit", score: "88%", note: "Prefers medium firm feel" }
    ],
    journey: [
      { time: "Yesterday, 2:15 PM", event: "Inbound call missed" },
      { time: "Oct 15, 5:00 PM", event: "Store demo completed with store rep" }
    ],
    buyingSignals: [
      {
        type: "Discount Sensitive",
        icon: "tag",
        content: "Checking if weekend store promotional voucher of ₹1,500 can be honored online"
      }
    ]
  },
  {
    id: "lead-6",
    name: "Suresh Nair",
    initials: "SN",
    phone: "+91 97110 33490",
    email: "suresh.nair@example.com",
    score: 74,
    status: "OPEN",
    sla: "8h left",
    slaUrgent: false,
    product: "SmartGRID Luxe Mattress",
    price: "₹16,990",
    actionBanner: "Walk through trial warranty details",
    icpScore: 76,
    intentScore: 72,
    location: "Malleshwaram, Bengaluru",
    lastTouch: "Currently waiting in queue (1m 50s)",
    notes: "Existing Sleep Company pillow owner looking to upgrade old cotton mattress.",
    icpBreakdown: [
      { factor: "Brand Loyalty", score: "90%", note: "Already owns 2 SmartGRID pillows" },
      { factor: "Need Urgency", score: "70%", note: "Planning bedroom renovation" }
    ],
    journey: [
      { time: "Today, 1:20 PM", event: "Joined live assistance queue" }
    ],
    buyingSignals: [
      {
        type: "Repeat Customer",
        icon: "repeat",
        content: "Very satisfied with pillow purchase 6 months ago; high trust in grid technology"
      }
    ]
  }
];
