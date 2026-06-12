"use client";

import React, { useState, useEffect } from 'react';
import { Mic, Send, Square, AlertCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedContainer } from '@/components/ui/AnimatedContainer';
import { useSpeechRecognition } from '@/lib/hooks';
import { cn } from '@/lib/utils';

const EXAMPLES = [
  "Police ne bina wajah fine diya",
  "Hospital mein ilaj se inkaar",
  "Bijli ka zyada bill aaya",
  "School mein extra fee maang rahe hain"
];

export function ComplaintInput({ onAnalyze, loading }) {
  const [text, setText] = useState('');
  const { 
    isListening, 
    transcript, 
    startListening, 
    supported, 
    setTranscript, 
    language, 
    setLanguage, 
    speechError 
  } = useSpeechRecognition();

  // Smart language auto-detect when user types
  useEffect(() => {
    const urduRegex = /[\u0600-\u06FF]/;
    if (text.trim()) {
      const isUrdu = urduRegex.test(text);
      if (isUrdu && language !== 'ur-PK') {
        setLanguage('ur-PK');
      } else if (!isUrdu && language !== 'en-US') {
        setLanguage('en-US');
      }
    }
  }, [text, language, setLanguage]);

  // Update text area when speech transcript updates
  useEffect(() => {
    if (transcript) {
      setText(prev => {
        const base = prev.trim();
        return base ? `${base} ${transcript}` : transcript;
      });
      setTranscript(''); // Clear to avoid re-appending
    }
  }, [transcript, setTranscript]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (text.trim() && !loading) {
      onAnalyze(text);
    }
  };

  const handleExampleClick = (example) => {
    setText(example);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ur-PK' ? 'en-US' : 'ur-PK');
  };

  const isUrduMode = language === 'ur-PK';

  return (
    <div id="complaint-section" className="w-full max-w-4xl mx-auto px-4 py-12 scroll-mt-24">
      <AnimatedContainer variant="fadeUp">
        
        {/* Mahogany Wood Console Outer Frame */}
        <div className={cn(
          "wood-console rounded-2xl p-6 md:p-8 transition-all duration-300 relative overflow-hidden",
          isListening ? "ring-2 ring-red-500/50" : ""
        )}>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
            
            {/* Aged Parchment Sheet Textarea Box */}
            <div className="parchment-sheet rounded-xl p-5 md:p-8 pt-14 pb-10 relative">
              
              {/* Language Badge Chip */}
              <div className="absolute top-3 left-4 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-accent/20 bg-accent/5 text-[9px] font-bold text-accent font-inter select-none">
                {isUrduMode ? '🇵🇰 اردو' : '🇬🇧 English'}
              </div>

              {/* Official Document Seal Watermark */}
              <div className="absolute top-3 right-5 text-[9px] uppercase tracking-[0.25em] font-bold text-amber-900/15 dark:text-amber-100/10 font-inter select-none pointer-events-none">
                Official Petition Form
              </div>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, 800))}
                placeholder={isUrduMode ? "اپنی شکایت یہاں لکھیں یا مائیک کا بٹن دبا کر بولیں..." : "Type or click the microphone to speak your complaint..."}
                className={cn(
                  "w-full min-h-[170px] bg-transparent resize-none outline-none leading-relaxed placeholder:text-amber-900/30 dark:placeholder:text-amber-100/25 transition-all border-none focus:ring-0 mt-2",
                  isUrduMode ? "font-urdu text-2xl md:text-3xl leading-[2.2] text-amber-950 dark:text-amber-100" : "font-garamond text-xl md:text-2xl font-bold text-amber-950 dark:text-amber-100"
                )}
                dir={isUrduMode ? "rtl" : "ltr"}
                disabled={loading}
                maxLength={800}
              />
              
              {isListening && (
                <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 font-semibold animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-red-600 dark:bg-red-400" />
                  <span className="font-urdu leading-none">{isUrduMode ? "سن رہا ہوں..." : "Listening..."}</span>
                </div>
              )}

              <div className="absolute bottom-3 right-4 flex items-center gap-3 text-xs text-amber-900/40 dark:text-amber-100/30 font-inter">
                {!text && (
                  <span className="hidden sm:flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Auto-detects Urdu & English
                  </span>
                )}
                <span className="font-semibold">{text.length} / 800</span>
              </div>
            </div>

            {speechError === 'not-allowed' && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 text-sm text-foreground flex items-start gap-3 animate-in fade-in slide-in-from-top-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-destructive" />
                <div className="font-inter space-y-1">
                  <p className="font-bold text-destructive">Microphone Blocked (Insecure Context)</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Mobile browsers strictly block microphone access on insecure connections (HTTP). Please access HaqDar AI via the secure <strong className="text-foreground">HTTPS</strong> localtunnel URL or grant microphone permissions in your mobile browser settings.
                  </p>
                </div>
              </div>
            )}

            {/* Mahogany Console Controls Footer Bar */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 pt-4">
              
              {/* Examples (styled as bezeled wood console pills) */}
              <div className="flex flex-wrap gap-2 flex-1">
                {EXAMPLES.map((ex, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleExampleClick(ex)}
                    className="text-xs font-inter px-3.5 py-1.5 rounded bg-[#3A231A]/60 text-accent hover:bg-[#3A231A] border border-[#523225] hover:border-[#C5A059]/40 transition-all cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.2)] font-semibold"
                  >
                    {ex}
                  </button>
                ))}
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
                
                {/* Language Manual Override (Gold bezeled) */}
                <Button
                  type="button"
                  variant="ghost"
                  onClick={toggleLanguage}
                  className="bezel-btn rounded px-4 h-10 font-bold tracking-widest text-xs font-inter text-accent cursor-pointer"
                  title="Toggle Language"
                >
                  {isUrduMode ? 'اردو' : 'ENGLISH'}
                </Button>

                {supported ? (
                  <Button
                    type="button"
                    variant={isListening ? "destructive" : "secondary"}
                    size="icon"
                    className={cn(
                      "bezel-btn rounded-full w-10 h-10 transition-all duration-300 relative cursor-pointer",
                      isListening && "ring-4 ring-red-500/60 scale-110 shadow-[0_0_15px_rgba(239,68,68,0.5)] bg-red-600 border-red-500 hover:bg-red-700 hover:border-red-600"
                    )}
                    onClick={startListening}
                    disabled={loading}
                    title={isListening ? "Stop voice input" : "Start speaking"}
                  >
                    {isListening ? <Square className="w-4 h-4 text-white" /> : <Mic className="w-4.5 h-4.5 text-accent" />}
                  </Button>
                ) : (
                  <div className="text-xs text-muted-foreground flex items-center justify-center border border-[#523225] rounded-full w-10 h-10 bg-[#3A231A]" title="Voice input not supported in this browser">
                    <AlertCircle className="w-4.5 h-4.5 text-muted-foreground/30" />
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={!text.trim() || loading}
                  className="bezel-btn px-8 h-10 font-urdu font-bold rounded-lg cursor-pointer flex items-center gap-2 border-emerald-600 bg-gradient-to-b from-emerald-800 to-emerald-950 hover:from-emerald-700 hover:to-emerald-900"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      تجزیہ کریں
                      <Send className="w-4 h-4 ms-2 rotate-180 rtl:rotate-0 text-emerald-400" />
                    </>
                  )}
                </Button>
              </div>

            </div>
          </form>


          {/* Glowing record overlay indicator */}
          {isListening && (
            <div className="absolute inset-0 bg-red-500/2 dark:bg-red-500/1 pointer-events-none" />
          )}

        </div>
      </AnimatedContainer>
    </div>
  );
}

