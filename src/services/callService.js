import { soundEffects } from './soundEffects';

/**
 * CallService provides a robust, browser-native calling experience.
 *
 * Architecture:
 * - Real microphone media capture via navigator.mediaDevices.getUserMedia
 * - Web Audio API AnalyserNode for live user voice level & waveform visualization
 * - WebRTC RTCPeerConnection scaffolding ready for signaling servers
 * - Realistic telecommunication audio via soundEffects (ringing tones, connect/disconnect)
 * - Interactive synthetic voice customer responses via window.speechSynthesis
 * - Safe resource cleanup ensuring microphone tracks stop completely when call ends
 */

export const CALL_STATUS = {
  IDLE: 'idle',
  CONNECTING: 'connecting',
  RINGING: 'ringing',
  ACTIVE: 'active',
  ENDED: 'ended',
  ERROR: 'error'
};

class CallService {
  constructor() {
    this.status = CALL_STATUS.IDLE;
    this.currentContact = null;
    this.isMuted = false;
    this.isOnHold = false;
    this.isSpeakerOn = true;
    this.durationSeconds = 0;
    this.micPermission = 'prompt'; // 'granted', 'denied', 'prompt', 'unsupported'

    // Browser audio & media references
    this.localStream = null;
    this.audioContext = null;
    this.analyser = null;
    this.sourceNode = null;
    this.peerConnection = null;

    // Timers
    this.timerInterval = null;
    this.ringTimeout = null;
    this.connectTimeout = null;
    this.levelInterval = null;

    // Listeners
    this.listeners = {
      stateChange: new Set(),
      timerTick: new Set(),
      audioLevel: new Set(),
      remoteSpeech: new Set(),
      error: new Set()
    };
  }

  // Subscribe to state updates
  subscribe(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].add(callback);
      return () => this.listeners[event].delete(callback);
    }
    return () => {};
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => {
        try {
          cb(data);
        } catch (e) {
          console.error(`Error in call listener for ${event}:`, e);
        }
      });
    }
  }

  setStatus(newStatus, extraData = {}) {
    this.status = newStatus;
    this.emit('stateChange', {
      status: this.status,
      contact: this.currentContact,
      duration: this.durationSeconds,
      formattedDuration: this.getFormattedDuration(),
      isMuted: this.isMuted,
      isOnHold: this.isOnHold,
      micPermission: this.micPermission,
      ...extraData
    });
  }

  getFormattedDuration() {
    const mins = Math.floor(this.durationSeconds / 60);
    const secs = this.durationSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // Request actual browser microphone permission
  async requestMicrophone() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      this.micPermission = 'unsupported';
      return false;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        },
        video: false
      });
      this.localStream = stream;
      this.micPermission = 'granted';
      this.setupAudioAnalysis(stream);
      this.setupWebRTCPeer(stream);
      return true;
    } catch (err) {
      console.warn("Microphone access denied or error:", err);
      this.micPermission = 'denied';
      this.emit('error', {
        type: 'MIC_DENIED',
        message: 'Microphone permission was not granted. The call will continue with simulated audio.'
      });
      return false;
    }
  }

  // Set up Web Audio API to analyze user's live speech
  setupAudioAnalysis(stream) {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      this.audioContext = new AudioContextClass();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.6;

      this.sourceNode = this.audioContext.createMediaStreamSource(stream);
      this.sourceNode.connect(this.analyser);

      // Start polling audio level for real visualizer
      if (this.levelInterval) clearInterval(this.levelInterval);
      const dataArray = new Uint8Array(this.analyser.frequencyBinCount);

      this.levelInterval = setInterval(() => {
        if (this.status !== CALL_STATUS.ACTIVE || this.isMuted) {
          this.emit('audioLevel', 0);
          return;
        }

        if (this.analyser) {
          this.analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const avg = sum / dataArray.length;
          // Scale from 0 to 100
          const level = Math.min(100, Math.round((avg / 128) * 100));
          this.emit('audioLevel', level);
        }
      }, 80);
    } catch (e) {
      console.warn("Failed to initialize audio analyzer:", e);
    }
  }

  // Real WebRTC scaffolding (ready for peer signaling)
  setupWebRTCPeer(stream) {
    try {
      if (!window.RTCPeerConnection) return;

      const config = {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' }
        ]
      };
      this.peerConnection = new RTCPeerConnection(config);

      // Attach tracks
      stream.getTracks().forEach(track => {
        this.peerConnection.addTrack(track, stream);
      });

      this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          // In production: send candidate to signaling websocket server
        }
      };

      this.peerConnection.onconnectionstatechange = () => {
        // Log state
      };
    } catch (e) {
      console.warn("WebRTC Peer initialization note:", e);
    }
  }

  // Start outgoing call
  async startCall(contact) {
    if (this.status !== CALL_STATUS.IDLE && this.status !== CALL_STATUS.ENDED) {
      this.endCall();
    }

    this.currentContact = contact || {
      name: "Customer",
      phone: "+91 98860 12345",
      product: "SmartGRID Mattress"
    };
    this.durationSeconds = 0;
    this.isMuted = false;
    this.isOnHold = false;
    this.isSpeakerOn = true;

    // Step 1: Connecting state & mic request
    this.setStatus(CALL_STATUS.CONNECTING);

    // Request actual microphone
    await this.requestMicrophone();

    // Step 2: Ringing state
    this.connectTimeout = setTimeout(() => {
      this.setStatus(CALL_STATUS.RINGING);
      soundEffects.startRinging();

      // Step 3: Answer after realistic ring (approx 3.2s)
      this.ringTimeout = setTimeout(() => {
        soundEffects.stopRinging();
        soundEffects.playConnectedChime();
        this.startActiveCall();
      }, 3200);
    }, 700);
  }

  // Active call lifecycle
  startActiveCall() {
    this.setStatus(CALL_STATUS.ACTIVE);
    this.durationSeconds = 0;

    // Start timer interval
    this.timerInterval = setInterval(() => {
      if (!this.isOnHold) {
        this.durationSeconds += 1;
        this.emit('timerTick', {
          seconds: this.durationSeconds,
          formatted: this.getFormattedDuration()
        });
      }
    }, 1000);

    // Simulate speech response from customer
    this.triggerRemoteContactSpeech();
  }

  // Browser speech synthesis for simulated contact voice
  triggerRemoteContactSpeech() {
    if (!('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();
      const customerName = this.currentContact?.name || "there";
      const productName = this.currentContact?.product || "the mattress";

      const greetings = [
        `Hello? Arvind from The Sleep Company? Yes, I was looking into ${productName}.`,
        `Hi Arvind! Thanks for calling back. I had a quick question regarding EMI and delivery.`,
        `Hello! Yes, I tested the mattress in your store yesterday. Good to hear from you.`
      ];

      const text = greetings[Math.floor(Math.random() * greetings.length)];
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;

      utterance.onstart = () => {
        this.emit('remoteSpeech', { isSpeaking: true, text });
      };
      utterance.onend = () => {
        this.emit('remoteSpeech', { isSpeaking: false, text: '' });
      };

      // Slight delay so the user hears it after connecting chime
      setTimeout(() => {
        if (this.status === CALL_STATUS.ACTIVE && !this.isOnHold) {
          window.speechSynthesis.speak(utterance);
        }
      }, 800);
    } catch (e) {
      console.warn("Speech synthesis notice:", e);
    }
  }

  // Toggle microphone mute (hardware & stream track control)
  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach(track => {
        track.enabled = !this.isMuted;
      });
    }
    this.setStatus(this.status);
    return this.isMuted;
  }

  // Toggle call on hold
  toggleHold() {
    this.isOnHold = !this.isOnHold;
    if (this.isOnHold) {
      if ('speechSynthesis' in window) window.speechSynthesis.pause();
    } else {
      if ('speechSynthesis' in window) window.speechSynthesis.resume();
    }
    this.setStatus(this.status);
    return this.isOnHold;
  }

  // Toggle speakerphone
  toggleSpeaker() {
    this.isSpeakerOn = !this.isSpeakerOn;
    this.setStatus(this.status);
    return this.isSpeakerOn;
  }

  // Dial DTMF tone
  sendDtmf(digit) {
    soundEffects.playDtmfTone(digit);
  }

  // End active call and perform safe cleanup
  endCall() {
    if (this.status === CALL_STATUS.IDLE) return null;

    soundEffects.stopRinging();
    soundEffects.playEndCallTone();

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    if (this.connectTimeout) clearTimeout(this.connectTimeout);
    if (this.ringTimeout) clearTimeout(this.ringTimeout);
    if (this.timerInterval) clearInterval(this.timerInterval);
    if (this.levelInterval) clearInterval(this.levelInterval);

    // CRITICAL: Physically stop microphone tracks to release browser hardware indicator
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        try {
          track.stop();
        } catch (e) {}
      });
      this.localStream = null;
    }

    if (this.audioContext && this.audioContext.state !== 'closed') {
      try {
        this.audioContext.close();
      } catch (e) {}
      this.audioContext = null;
    }

    if (this.peerConnection) {
      try {
        this.peerConnection.close();
      } catch (e) {}
      this.peerConnection = null;
    }

    const completedCallSummary = {
      id: `call-${Date.now()}`,
      contact: this.currentContact,
      name: this.currentContact?.name || "Customer",
      phone: this.currentContact?.phone || "+91 98860 12345",
      product: this.currentContact?.product || "SmartGRID Mattress",
      duration: this.getFormattedDuration(),
      durationSeconds: this.durationSeconds,
      timestamp: "Just now",
      timeText: "Just now",
      direction: "outgoing",
      status: this.durationSeconds > 0 ? "answered" : "missed",
      score: this.durationSeconds > 10 ? 94 : 85,
      sopReview: {
        namedShopper: true,
        namedShopperNote: `Shopper named within first 8s (+23.6pp conversion impact)`,
        greetingWithin10s: true,
        greetingNote: "Polite brand introduction with showroom reference",
        painPointIdentified: true,
        painPointNote: "Clarified requirements and urgency",
        productPitch: true,
        productPitchNote: "Explained patented SmartGRID elasticity vs sinking memory foam",
        financingOffered: true,
        financingNote: "Explained zero-cost 6-month EMI breakdown",
        agreedNextStep: true,
        nextStepNote: "Follow up quotation logged to CRM"
      },
      transcript: [
        { speaker: "Arvind", text: `Good afternoon ${this.currentContact?.name || 'there'}! This is Arvind from The Sleep Company.` },
        { speaker: this.currentContact?.name || 'Customer', text: `Hi Arvind, thanks for getting back to me regarding ${this.currentContact?.product || 'the mattress'}.` },
        { speaker: "Arvind", text: `I wanted to confirm the dimensions and offer our 100-night trial with zero-cost EMI.` },
        { speaker: this.currentContact?.name || 'Customer', text: `That works perfectly. Please send the quotation.` }
      ]
    };

    this.setStatus(CALL_STATUS.ENDED, { summary: completedCallSummary });

    // Reset back to idle after short UI delay
    setTimeout(() => {
      this.status = CALL_STATUS.IDLE;
      this.emit('stateChange', { status: CALL_STATUS.IDLE });
    }, 1200);

    return completedCallSummary;
  }
}

export const callService = new CallService();
