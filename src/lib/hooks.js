"use client";

import { useState, useCallback, useEffect, useRef } from 'react';
import { analyzeComplaint, getStats } from './api';
import { toast } from 'sonner';

export function useAnalyzeComplaint() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyze = async (text) => {
    setLoading(true);
    setError(null);
    try {
      const result = await analyzeComplaint(text);
      setData(result);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, analyze, reset: () => setData(null) };
}

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [supported, setSupported] = useState(true);
  const [language, setLanguage] = useState('ur-PK');
  const [speechError, setSpeechError] = useState(null);
  
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    setSupported(true);
    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.continuous = false;
    recognition.interimResults = false; // Disable interim results to avoid duplicate appends

    recognition.onstart = () => {
      setIsListening(true);
      setSpeechError(null);
      setTranscript('');
    };

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setTranscript(finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      // Ignore normal timeouts ('no-speech') and user cancellations ('aborted')
      if (event.error === 'no-speech' || event.error === 'aborted') {
        setIsListening(false);
        return;
      }

      console.warn('Speech recognition warning/error:', event.error);
      setIsListening(false);

      if (event.error === 'not-allowed') {
        setSpeechError('not-allowed');
        toast.error('مائیکروفون بلاک ہے! براہ کرم براؤزر کی سیٹنگز میں مائیکروفون کی اجازت دیں۔', {
          description: 'Microphone permission denied. Please allow microphone access in browser settings.',
          duration: 5000,
        });
      } else if (event.error === 'network') {
        setSpeechError('network');
        toast.error('انٹرنیٹ کا مسئلہ! براہ کرم اپنا انٹرنیٹ کنکشن چیک کریں۔', {
          description: 'Speech recognition network error. Check your connection.',
          duration: 4000,
        });
      } else {
        setSpeechError(event.error);
        toast.error('صوتی شناخت میں خرابی! دوبارہ کوشش کریں۔', {
          description: `Speech recognition error: ${event.error}`,
          duration: 4000,
        });
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [language]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;

    try {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        setTranscript('');
        setSpeechError(null);
        recognitionRef.current.start();
      }
    } catch (err) {
      console.error("Failed to start/stop SpeechRecognition", err);
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  return { 
    isListening, 
    transcript, 
    startListening, 
    stopListening,
    supported, 
    setTranscript, 
    language, 
    setLanguage, 
    speechError 
  };
}

