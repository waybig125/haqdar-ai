"use client";

import React, { useState } from 'react';
import { Mic, Send, Square, AlertCircle } from 'lucide-react';
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
  const { isListening, transcript, startListening, supported, setTranscript, language, setLanguage, speechError } = useSpeechRecognition();

  // Update text area when speech transcript updates
  React.useEffect(() => {
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

  return (
    <div id="complaint-section" className="w-full max-w-4xl mx-auto px-4 py-12 scroll-mt-24">
      <AnimatedContainer variant="fadeUp">
        
        <div className={cn(
          "bg-card/40 backdrop-blur-xl border border-white/10 dark:border-white/5 shadow-2xl rounded-2xl p-5 md:p-8 transition-all duration-300 relative overflow-hidden",
          isListening ? "ring-1 ring-primary/50 shadow-[0_0_40px_rgba(34,197,94,0.15)]" : "focus-within:ring-1 focus-within:ring-white/20 hover:border-white/20"
        )}>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={language === 'ur-PK' ? "اپنی شکایت یہاں لکھیں یا بول کر درج کریں..." : "Type or speak your complaint here..."}
              className={cn(
                "w-full min-h-[160px] bg-transparent resize-none outline-none leading-relaxed text-foreground placeholder:text-muted-foreground/50",
                language === 'ur-PK' ? "font-urdu text-2xl" : "font-inter text-xl"
              )}
              dir={language === 'ur-PK' ? "rtl" : "ltr"}
              disabled={loading}
            />

            {speechError === 'not-allowed' && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-sm text-destructive-foreground flex items-start gap-2 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-destructive" />
                <p className="font-inter">
                  <strong>Microphone Access Blocked:</strong> To use voice input on mobile, your browser requires a secure <strong>HTTPS</strong> connection. Please use a secure URL or grant microphone permissions in your browser settings.
                </p>
              </div>
            )}

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-6 border-t border-border/30">
              
              {/* Examples */}
              <div className="flex flex-wrap gap-2 flex-1">
                {EXAMPLES.map((ex, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleExampleClick(ex)}
                    className="text-xs font-inter px-4 py-2 rounded-full bg-secondary/60 text-secondary-foreground hover:bg-secondary transition-colors backdrop-blur-sm"
                  >
                    {ex}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
                
                {/* Language Toggle */}
                <Button
                  type="button"
                  variant="ghost"
                  onClick={toggleLanguage}
                  className="rounded-full px-4 border border-border/40 hover:bg-background/50 font-medium tracking-wider"
                  title="Toggle Language"
                >
                  <span className="font-inter font-bold text-xs">{language === 'ur-PK' ? 'UR' : 'EN'}</span>
                </Button>

                {supported ? (
                  <Button
                    type="button"
                    variant={isListening ? "destructive" : "secondary"}
                    size="icon"
                    className={cn(
                      "rounded-full transition-all duration-300 relative",
                      isListening && "animate-pulse shadow-[0_0_25px_rgba(239,68,68,0.6)] scale-110"
                    )}
                    onClick={startListening}
                    disabled={loading}
                    title={isListening ? "Stop listening" : "Start speaking"}
                  >
                    {isListening ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </Button>
                ) : (
                  <div className="text-xs text-muted-foreground flex items-center gap-1" title="Voice input not supported in this browser">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={!text.trim() || loading}
                  className="rounded-full px-8 font-urdu font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-0.5"
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

          {/* Listening Indicator Background */}
          {isListening && (
            <div className="absolute inset-0 bg-gradient-to-r from-destructive/0 via-destructive/5 to-destructive/0 animate-pulse pointer-events-none" />
          )}

        </div>
      </AnimatedContainer>
    </div>
  );
}
