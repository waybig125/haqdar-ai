"use client";

import { useState, useCallback } from 'react';
import { analyzeComplaint, getStats } from './api';

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

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setSupported(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = language;
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
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
      // 'no-speech' fires when the user didn't speak in time — not a real error
      if (event.error !== 'no-speech') {
        console.error('Speech recognition error', event.error);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [language]);

  return { isListening, transcript, startListening, supported, setTranscript, language, setLanguage };
}
