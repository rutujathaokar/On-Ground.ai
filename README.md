# On-Ground.ai Call Centre Workspace

> A high-performance, browser-native call centre workspace built for **On-Ground.ai** (Engineering Intern Hiring Assignment). Crafted with React, Vite, Tailwind CSS, Web Audio API, and native browser media capabilities.

---

## 1. Project Overview

**On-Ground.ai** solves the offline retail drop-off problem where 86% of walk-ins leave with zero follow-up. This application replicates the shift-long workspace used by enterprise retail telecallers and retail agents (e.g., at *The Sleep Company*, *Furnishka*, *Duroflex*, etc.).

It empowers agents to:
- Recover walk-out leads through systematic SLA-governed callbacks
- Prioritize high-intent missed calls ranked by expected value at stake
- Execute standard operating procedure (SOP) playbooks (e.g. naming the shopper within 10s for a +23.6pp conversion lift)
- Review call quality, transcripts, and AI coaching benchmarks
- Coordinate with store teams, task agents, and AI role models via Pulse channels

---

## 2. Features

### Core Screens (100% Implemented)
1. **Dashboard (`/dashboard`)**:
   - Hero Navy Banner with agent greeting (`Arvind Rajan`), shift status (`• On Queue`), and 4 KPI metrics:
     - `76` OG Score™ (▲ 13)
     - `4m 12s` Avg Handle Time (▼ 8%)
     - `94%` CSAT Today (▲ 2pt)
     - `2` In Queue (`• live`)
   - **My Progress · Today**: Real-time counter of Leads Created (`3`) and Leads Called (`2`, auto-increments upon ending calls).
   - **My Earnings This Month**: Target progress bar from ₹800 to ₹6,000 with coached moves attribution (₹5,200).
   - **Who's Waiting**: Live queue with Priya Iyer (4m 20s) and Suresh Nair (1m 50s) with one-click call triggers.
   - **My Tasks**: 2 callbacks, 2 hot leads (opens Leads Modal directly), and 1 outcome to log.
   - **7-Day Charts**: High-fidelity custom SVG/flex bar charts for *Calls Handled* and *CSAT Trend* with distinct styling for current day.
2. **Calls to Make (`/calls`)**:
   - Ranked by lead attractiveness score.
   - Expandable lead drawers showing contact details, store visit history, and coaching recommendations.
   - Interactive search and filter.
   - Functional 3-page pagination (`< Page 1 of 3 >`).
   - Call button on every row launching the live calling engine.
3. **Incoming Calls (`/incoming`)**:
   - Priority missed call board ranked by expected value.
   - Metrics: `5` Missed Today, `₹81,860` Expected Value at Stake.
   - One-click `Call back` button on every row.
4. **Recent Calls (`/recent`)**:
   - Log of answered, outgoing, incoming, and missed calls.
   - Tapping any call opens the **SOP Adherence Review Modal**:
     - Naming shopper promptness check (+23.6pp lift)
     - Opening 10s greeting QA
     - Pain point discovery & SmartGRID USP pitch
     - Financing / EMI presentation
     - Simulated audio recording waveform scrubber & call transcript
5. **Calendar (`/calendar`)**:
   - Month view for October 2026 matching mock layout.
   - Interactive day picker with today button (`Today`), previous/next navigation.
   - Event indicator dots on key days (23rd, 26th, 28th).
   - Day selection reveals scheduled shift callbacks, store walkthroughs with Mukunda, and QA syncs.
6. **Pulse Home (`/pulse`)**:
   - AvaniBot "Always On" assistant with interactive **Daily Brief** modal.
   - Custom Agent directories:
     - Role Agents (`# callcentre-agent`)
     - Task Agents (`# cross-sell-agent`, `# sop-agent`, `# lead-conversion-agent`, `# capture-agent`)
   - WhatsApp business customer-discussions entry.
   - Kudos recognition card (3 NEW, 12 ALL-TIME).
7. **Pulse Channel (`/pulse/channel`)**:
   - Header with back navigation to Pulse Home.
   - Pinned **"Needs your input"** card with functional `[Confirmed]` and `[Reschedule]` actions or custom text response.
   - Full conversational thread between manager (Sunita Rao) and agent (Arvind R.).
   - Interactive message composer: typing and sending dynamically appends messages to the conversation with realistic manager auto-reply.
8. **Leads Modal (`screen8_leads_modal.png`)**:
   - Opened directly from Dashboard Task list or Calls to Make.
   - Full 5-lead carousel with dot indicators, previous (`<`), and next (`>`) navigation.
   - Lead intent score (`91`), ICP score (`87%`), and SLA timer (`2h left`).
   - Collapsible accordions:
     - *ICP Fit Breakdown*
     - *How We Got Here* (multi-touch offline store history)
     - *Where We Picked Up Signals* (Financing, Quotation Demanded, Warranty Concerns)
   - Cumulative missed warning notice (`2 · expired without close, visible to manager`).
   - Direct `[Call Now]` action.
9. **Practise a Call (`/practice`)**:
   - Pitch coach & roleplay simulator.
   - Scenarios for handling competitor price objections, opening greeting compliance, and medical bed elevation.
   - Launches working browser call with simulated AI shopper dialogue.

---

## 3. The Working Calling Feature

The assignment explicitly requires a **genuinely working calling feature** using browser media capabilities, rather than a cosmetic timeout or fake button.

### Architecture (`src/services/callService.js` & `soundEffects.js`)
- **Microphone Capture**: Genuinely requests `navigator.mediaDevices.getUserMedia({ audio: true })`.
- **Live Voice Waveform**: Audio stream is routed through Web Audio API `AudioContext` and `AnalyserNode` (`fftSize = 64`), calculating real-time frequency amplitude that powers the animated visualizer bars in `<AudioWaveform />` as you speak into your microphone.
- **Microphone Hardware Mute**: `toggleMute()` directly toggles `MediaStreamTrack.enabled`, muting the physical microphone audio stream and updating visual UI states.
- **WebRTC Scaffolding**: Initialises `RTCPeerConnection` with public STUN servers (`stun:stun.l.google.com:19302`), sets up audio track senders, and is architected for immediate plug-and-play connection to a WebSocket signaling server.
- **Telecom Audio Synthesis**:
  - Web Audio API dual-oscillator synthesizer generating authentic telecommunication tones:
    - Standard US Ringback Tone (440Hz + 480Hz)
    - Connection Chime (ascending triad)
    - Call Disconnect Tone (descending cadence)
    - DTMF Keypad Tones (0–9, *, #) for interactive in-call dialling
- **Interactive Speech Synthesis Dialogue**:
  - Uses browser `window.speechSynthesis` so the contact genuinely speaks back to the agent with context-relevant dialogue.
  - Interactive "Coached Moves" buttons allow the agent to test pitches (100-night trial, 6-month EMI) with immediate customer responses.
- **Safe Hardware Teardown**:
  - When a call ends, all `MediaStream` audio tracks are explicitly stopped (`track.stop()`), ensuring browser hardware microphone recording indicators turn off cleanly.
- **Automatic History Sync**:
  - Every completed call generates a full session summary with exact duration, timestamp, QA score, and is prepended to **Recent Calls** while incrementing the **Leads Called** counter on the Dashboard.

---

## 4. Tech Stack

- **Framework**: React 18.3
- **Build Tool**: Vite 6.0
- **Routing**: React Router DOM 6.28
- **Styling**: Tailwind CSS 3.4 (with customized On-Ground design tokens)
- **Icons**: Lucide React
- **Audio & Media**: Web Audio API, WebRTC MediaStream, Web Speech API
- **Animations / UX**: CSS Keyframe audio visualizer, Canvas Confetti

---

## 5. Folder Structure

```
ground.ai/
├── dist/                      # Production build output
├── public/                    # Static assets & favicon
├── src/
│   ├── assets/                # Visual assets
│   ├── components/
│   │   ├── calls/             # LeadRow, IncomingRow, RecentCallRow, LeadDetailsModal, CallReviewModal
│   │   ├── dashboard/         # KpiCard, ProgressCard, EarningsCard, WhosWaitingCard, TasksCard, SevenDayChart
│   │   ├── dialer/            # CallModal, DialpadModal, AudioWaveform
│   │   └── layout/            # AppLayout, Sidebar, TopBar, DemoBar
│   ├── context/
│   │   └── AppContext.jsx     # Global application & calling state
│   ├── data/                  # Clean local JSON/mock modules
│   │   ├── dashboardData.js
│   │   ├── leadsData.js
│   │   ├── incomingData.js
│   │   ├── recentCallsData.js
│   │   ├── calendarData.js
│   │   └── pulseData.js
│   ├── layouts/
│   │   └── AppLayout.jsx      # Shell layout with global modal containers
│   ├── pages/                 # Screen components for each route
│   │   ├── DashboardPage.jsx
│   │   ├── CallsToMakePage.jsx
│   │   ├── IncomingPage.jsx
│   │   ├── RecentPage.jsx
│   │   ├── CalendarPage.jsx
│   │   ├── PulseHomePage.jsx
│   │   ├── PulseChannelPage.jsx
│   │   └── PracticeCallPage.jsx
│   ├── services/
│   │   ├── callService.js     # Calling state machine, getUserMedia, WebRTC & audio analysis
│   │   └── soundEffects.js    # Web Audio API telecom tones & DTMF synthesizer
│   ├── App.jsx                # Router declaration
│   ├── index.css              # Tailwind base & custom animations
│   └── main.jsx               # React DOM root
├── index.html                 # HTML shell
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 6. How to Install and Run Locally

### Prerequisites
- Node.js version 18.x or later (tested on Node v24)
- npm version 9.x or later

### Step 1: Clone or navigate to the repository
```bash
cd ground.ai
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Run development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in Google Chrome.

### Step 4: Build for production
```bash
npm run build
```

### Step 5: Preview production build locally
```bash
npm run preview
```
Visit [http://localhost:4173](http://localhost:4173).

---

## 7. Deployment Instructions

This frontend project is completely static and backend-free, making it ready for instant deployment on any modern platform:

### Deploying to Vercel
1. Push this repository to GitHub.
2. In Vercel, import the repository.
3. Framework Preset: **Vite**.
4. Root Directory: `./` (leave default).
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Click **Deploy**.

### Deploying to Netlify
1. Run `npm run build`.
2. Drag and drop the `dist/` folder into Netlify Drop, or connect the Git repository with publish directory set to `dist`.

---

## 8. What Was Implemented vs Bonus Features

| Requirement | Status | Notes |
|---|---|---|
| App shell: Sidebar & Top bar | Completed | Exact match to mock; responsive collapse on mobile. |
| 1. Dashboard | Completed | 4 KPIs, Today's Progress, Earnings, Who's Waiting, My Tasks, 7-day green & blue charts. |
| 2. Calls to Make | Completed | Ranked leads, expandable drawers, search filter, 3-page pagination, working Call buttons. |
| 3. Incoming Calls | Completed | 5 Missed calls, ₹81,860 value at stake, one-click Call Back. |
| 4. Recent Calls | Completed | Full list of call types, durations, times, and interactive SOP Review modal. |
| 5. Calendar | Completed | October 2026 month grid, today switcher, event dots (23, 26, 28), upcoming event details. |
| 6. Pulse Home | Completed | AvaniBot, role/task agents, kudos card (3 new, 12 all-time), Daily Brief modal. |
| 7. Pulse Channel | Completed | Back navigation, pinned "Needs your input" card, interactive chat messaging with auto-reply. |
| 8. Leads Modal | Completed | Opened from Tasks card / Leads page, 5-lead pagination, ICP & Intent scores, collapsible buying signals. |
| Working Calling Feature | Completed | Real getUserMedia mic, Web Audio analyser waveform, ringtones, mute/unmute, end call, and recent call recording. |
| Bonus: Send message in channel | Completed | Added to UI immediately with realistic manager reply. |
| Bonus: Answer "Needs your input" | Completed | Confirmed / Reschedule / custom answer records and updates state with celebration feedback. |
| Bonus: Practise a call | Completed | Scenario-based pitch coaching with speech synthesis. |
| Bonus: Call Back action | Completed | Launches calling interface directly from missed call rows. |
| Bonus: Phone-width responsive layout | Completed | Tested down to 375px mobile widths with accessible drawer navigation. |
| Bonus: Visual charts | Completed | Clean SVG/flex bar charts matching the mock. |

---

## 9. Known Limitations

1. **Two-Way Signaling Backend**:
   - Because this is an assignment with the strict requirement of *no backend and no database*, live two-way WebRTC audio between two physically separate remote users requires a signaling server (e.g. WebSocket / STUN / TURN provider).
   - In accordance with the prompt's instructions:
     - Real microphone capture and live audio frequency analysis are implemented on the browser client.
     - Web Audio synthesis provides genuine telecom audio cues (ringing, disconnect, DTMF).
     - Browser speech synthesis provides simulated customer dialogue.
     - The `callService.js` structure is architected with a dedicated `RTCPeerConnection` instance ready to attach to any remote signaling server.
2. **Persistence**:
   - Application state is managed via React Context and in-memory state. Reloading the browser tab will reset back to the initial mock data set.

---

## 10. AI Tools Used

In compliance with the assignment instructions to transparently list AI tools:

- **Antigravity** — Used as the primary agentic pair-programming assistant for project scaffolding, analyzing the assignment PDF, architecting Web Audio synthesis and `callService.js`, building component structures, and verifying build integrity.
