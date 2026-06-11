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
  const { isListening, transcript, startListening, supported, setTranscript } = useSpeechRecognition();

  // Update text area when speech transcript updates
  React.useEffect(() => {
    if (transcript) {
      setText(prev => {
        // Simple heuristic to append safely
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

  return (
    <div id="complaint-section" className="w-full max-w-3xl mx-auto px-4 py-12 scroll-mt-24">
      <AnimatedContainer variant="fadeUp">
        
        <div className="bg-card border shadow-sm rounded-2xl p-4 md:p-6 transition-all focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 relative overflow-hidden">
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="اپنی شکایت یہاں لکھیں یا بول کر درج کریں..."
              className="w-full min-h-[120px] bg-transparent resize-none outline-none font-urdu text-xl leading-relaxed text-foreground placeholder:text-muted-foreground/60"
              dir="auto"
              disabled={loading}
            />

            <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border/40">
              
              {/* Examples */}
              <div className="flex flex-wrap gap-2">
                {EXAMPLES.map((ex, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleExampleClick(ex)}
                    className="text-xs px-3 py-1.5 rounded-full bg-secondary/50 text-secondary-foreground hover:bg-secondary transition-colors"
                  >
                    {ex}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto justify-end">
                {supported ? (
                  <Button
                    type="button"
                    variant={isListening ? "destructive" : "secondary"}
                    size="icon"
                    className={cn(
                      "rounded-full transition-all",
                      isListening && "animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]"
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
                  className="rounded-full px-6 font-urdu font-bold"
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
            <div className="absolute inset-0 bg-destructive/5 animate-pulse pointer-events-none" />
          )}

        </div>
      </AnimatedContainer>
    </div>
  );
}
