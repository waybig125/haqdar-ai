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
        
        {/* Parchment Document Petition Wrapper */}
        <div className={cn(
          "bg-card border-4 border-double border-accent/30 dark:border-accent/15 shadow-[0_25px_60px_-15px_rgba(27,56,42,0.08)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] rounded-2xl p-6 md:p-10 transition-all duration-300 relative overflow-hidden",
          isListening ? "ring-2 ring-red-500/30 dark:ring-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.15)]" : "hover:border-accent/40"
        )}>
          
          {/* Subtle watermark in upper right of document */}
          <div className="absolute top-4 right-6 text-[10px] uppercase tracking-[0.2em] font-semibold text-muted-foreground/15 font-inter select-none pointer-events-none">
            Official Petition Form
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={isUrduMode ? "اپنی شکایت یہاں لکھیں یا مائیک کا بٹن دبا کر بولیں..." : "Type or click the microphone to speak your complaint..."}
                className={cn(
                  "w-full min-h-[180px] bg-transparent resize-none outline-none leading-relaxed text-foreground placeholder:text-muted-foreground/30 focus:placeholder:text-muted-foreground/20 transition-all",
                  isUrduMode ? "font-urdu text-2xl md:text-3xl leading-[1.8]" : "font-garamond text-xl md:text-2xl font-medium"
                )}
                dir={isUrduMode ? "rtl" : "ltr"}
                disabled={loading}
              />
              
              {!text && (
                <div className="absolute bottom-2 right-2 text-muted-foreground/30 text-xs flex items-center gap-1.5 font-inter">
                  <Sparkles className="w-3.5 h-3.5" />
                  Auto-detects Urdu & English
                </div>
              )}
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

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-6 border-t border-accent/20 dark:border-accent/10">
              
              {/* Examples */}
              <div className="flex flex-wrap gap-2 flex-1">
                {EXAMPLES.map((ex, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleExampleClick(ex)}
                    className="text-xs font-inter px-3.5 py-1.5 rounded-md border border-border/80 bg-muted/30 text-muted-foreground hover:bg-accent/10 hover:text-accent hover:border-accent/30 transition-all cursor-pointer"
                  >
                    {ex}
                  </button>
                ))}
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
                
                {/* Language Manual Override */}
                <Button
                  type="button"
                  variant="ghost"
                  onClick={toggleLanguage}
                  className="rounded-lg h-10 px-3 border border-border/60 hover:bg-accent/10 font-bold tracking-widest text-xs font-inter text-muted-foreground hover:text-accent"
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
                      "rounded-lg w-10 h-10 transition-all duration-300 relative border border-border/60 cursor-pointer",
                      isListening && "animate-pulse ring-2 ring-red-500/40 dark:ring-red-500/25 scale-105"
                    )}
                    onClick={startListening}
                    disabled={loading}
                    title={isListening ? "Stop voice input" : "Start speaking"}
                  >
                    {isListening ? <Square className="w-4 h-4" /> : <Mic className="w-4.5 h-4.5" />}
                  </Button>
                ) : (
                  <div className="text-xs text-muted-foreground flex items-center justify-center border rounded-lg w-10 h-10" title="Voice input not supported in this browser">
                    <AlertCircle className="w-4.5 h-4.5 text-muted-foreground/40" />
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={!text.trim() || loading}
                  className="rounded-lg h-10 px-8 font-urdu font-bold shadow-lg shadow-primary/10 hover:shadow-primary/25 hover:border-primary transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      تجزیہ کریں
                      <Send className="w-4 h-4 ms-2 rotate-180 rtl:rotate-0" />
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

