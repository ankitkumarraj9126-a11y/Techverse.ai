"use client";

import React, { useState, useEffect, useRef } from "react";
import * as motion from "framer-motion/client";
import { Mic, MicOff, Keyboard, X, Captions, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AgentState = "idle" | "connecting" | "listening" | "thinking" | "speaking";

interface AIVoiceAgentProps {
  onClose?: () => void;
}

export function AIVoiceAgent({ onClose }: AIVoiceAgentProps) {
  const [state, setState] = useState<AgentState>("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [captionText, setCaptionText] = useState("");
  const [volume, setVolume] = useState(1);

  // Audio simulation refs
  const requestRef = useRef<number>(null);

  // Simulate audio volume for visual pulsing
  useEffect(() => {
    if (state === "listening" || state === "speaking") {
      const updateVolume = () => {
        // Random volume between 0.8 and 1.5 for visual pulse effect
        setVolume(0.8 + Math.random() * 0.7);
        requestRef.current = requestAnimationFrame(updateVolume);
      };
      requestRef.current = requestAnimationFrame(updateVolume);
    } else {
      setVolume(1);
    }

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [state]);

  const recognitionRef = useRef<any>(null);

  // Use refs to avoid recreating the speech recognition instance on every state change
  const stateRef = useRef(state);
  const captionRef = useRef(captionText);
  useEffect(() => { stateRef.current = state; }, [state]);
  useEffect(() => { captionRef.current = captionText; }, [captionText]);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        
        recognition.onresult = (event: any) => {
          let interimTranscript = "";
          let finalTranscript = "";

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }
          
          setCaptionText(finalTranscript || interimTranscript || "Listening...");
          
          if (finalTranscript && stateRef.current === "listening") {
            // Prevent multiple parallel API calls
            setState("thinking");
            sendToAI(finalTranscript);
          }
        };

        recognition.onend = () => {
          if (stateRef.current === "listening") {
            const currentCaption = captionRef.current;
            if (currentCaption === "I'm listening. How can I help?" || currentCaption === "Listening...") {
              // They didn't say anything, close the mic
              setState("idle");
              setCaptionText("");
            } else {
              // The mic stopped but they DID say something (interim result became final implicitly)
              setState("thinking");
              sendToAI(currentCaption);
            }
          }
        };
        
        recognitionRef.current = recognition;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartInteraction = () => {
    setState("connecting");
    setCaptionText("Connecting to TechVerse AI...");
    
    // Request mic access and start listening
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error("Speech recognition already started");
      }
    }
    
    setTimeout(() => {
      setState("listening");
      setCaptionText("I'm listening. How can I help?");
    }, 1000);
  };

  const sendToAI = async (text: string) => {
    setState("thinking");
    setCaptionText(`Thinking about: "${text}"...`);
    
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        speakReply(data.reply || "I've processed your request.");
      } else {
        // If it's a 500 error due to invalid API key, the backend still returns a conversational reply
        speakReply(data.reply || "I'm having trouble authenticating my neural connection.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      speakReply("I'm having trouble connecting to the server.");
    }
  };

  const speakReply = (text: string) => {
    setState("speaking");
    setCaptionText(text);
    
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      // Try to find a good English voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.name.includes("Google US English") || v.lang === "en-US");
      if (preferredVoice) utterance.voice = preferredVoice;
      
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      utterance.onend = () => {
        // Go back to listening for a continuous conversation!
        setState("listening");
        setCaptionText("I'm listening...");
        try {
          if (recognitionRef.current) recognitionRef.current.start();
        } catch (e) {}
      };
      
      utterance.onerror = (e) => {
        console.error("Speech Synthesis Error:", e);
        setState("idle");
        setCaptionText("");
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => {
        setState("listening");
        setCaptionText("I'm listening...");
        try {
          if (recognitionRef.current) recognitionRef.current.start();
        } catch (e) {}
      }, 4000);
    }
  };

  const simulateChat = (presetText?: string) => {
    if (state === "listening" || state === "idle") {
      sendToAI(presetText || "Audit techverse.ai");
    }
  };

  const suggestions = [
    "Find leads in SaaS",
    "Audit techverse.ai",
    "Draft outreach to OpenAI"
  ];

  if (state === "idle") {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleStartInteraction}
          className="relative group flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 shadow-2xl overflow-hidden hover:scale-105 transition-transform"
        >
          {/* Mini Orb gradient */}
          <div className="absolute inset-0 bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-blue-500 via-purple-500 to-orange-500 opacity-80 blur-md animate-spin-slow"></div>
          <div className="absolute inset-1 rounded-full bg-slate-900/90 backdrop-blur-sm z-10 flex items-center justify-center border border-white/10 shadow-[inset_0_0_15px_rgba(255,255,255,0.1)]">
            <Mic className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-end pb-24 overflow-hidden pointer-events-none">
      {/* Background Aura (Heavy blur, semi-transparent) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute bottom-0 w-full h-[60vh] bg-gradient-to-t from-blue-900/40 via-purple-900/30 to-transparent blur-3xl pointer-events-none -z-10"
      />

      <div className="relative z-10 flex flex-col items-center pointer-events-auto w-full max-w-md px-4">
        
        {/* Suggestion Chips */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {suggestions.map((s, i) => (
            <button key={i} onClick={() => simulateChat(s)} className="px-4 py-2 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/10 text-white/90 text-sm hover:bg-slate-800/80 transition-colors shadow-lg">
              {s}
            </button>
          ))}
        </motion.div>

        {/* The Core Orb */}
        <div className="relative flex items-center justify-center w-full mb-8">
          <motion.div
            animate={{ 
              scale: state === "listening" || state === "speaking" ? volume : 1 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative w-24 h-24 flex items-center justify-center cursor-pointer"
            onClick={simulateChat}
          >
            {/* Outer Glow based on volume */}
            <motion.div 
              className={cn(
                "absolute inset-[-50%] rounded-full opacity-60 blur-2xl transition-colors duration-1000",
                state === "speaking" ? "bg-orange-500/40" : state === "listening" ? "bg-blue-500/40" : "bg-purple-500/20"
              )}
              animate={{ 
                scale: state === "listening" || state === "speaking" ? volume * 1.2 : 1 
              }}
            />
            
            {/* Glossy Sphere */}
            <div className="w-full h-full rounded-full shadow-[inset_0_0_20px_rgba(255,255,255,0.3),0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden relative border border-white/10 bg-slate-950">
              {/* Swirling Color Bands */}
              <div 
                className={cn(
                  "absolute inset-[-50%] opacity-80 blur-md",
                  state === "thinking" ? "animate-spin-slow" : "animate-spin-normal"
                )}
                style={{
                  background: "conic-gradient(from 0deg at 50% 50%, #3b82f6, #f97316, #ef4444, #ec4899, #eab308, #3b82f6)",
                }}
              />
              {/* 3D Highlight Overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-white/30" />
            </div>
          </motion.div>
        </div>

        {/* Status Text */}
        <div className="text-center mb-8 h-6">
          <motion.p 
            key={state}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/80 font-medium tracking-wide uppercase text-xs"
          >
            {state === "listening" ? "Listening..." : state === "speaking" ? "Speaking" : state === "thinking" ? "Thinking..." : "Connecting..."}
          </motion.p>
        </div>

        {/* Captions */}
        {showCaptions && captionText && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 px-6 py-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/5 shadow-2xl text-center text-white/90 font-medium max-w-[80%]"
          >
            {captionText}
          </motion.div>
        )}

        {/* Control Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between w-full max-w-[280px] px-6 py-3 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl"
        >
          <button onClick={() => setShowCaptions(!showCaptions)} className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white">
            <Captions className="w-5 h-5" />
          </button>
          
          <button onClick={() => setIsMuted(!isMuted)} className={cn("p-4 rounded-full transition-colors shadow-lg", isMuted ? "bg-red-500/20 text-red-400" : "bg-white/10 text-white hover:bg-white/20")}>
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>

          <button onClick={() => {}} className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white">
            <Keyboard className="w-5 h-5" />
          </button>

          <button onClick={() => {
            setState("idle");
            if (onClose) onClose();
          }} className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white absolute right-[-60px]">
            <div className="w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/10 flex items-center justify-center">
              <X className="w-5 h-5" />
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
