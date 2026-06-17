"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, Square, AlertCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedContainer } from '@/components/ui/AnimatedContainer';
import { useSpeechRecognition } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const ALL_DISTRICTS = [
  "Abbottabad", "Attock", "Awaran", "Badin", "Bagh", "Bahawalnagar", "Bahawalpur", "Bajaur", "Bannu", "Barkhan", "Battagram", "Bhimber", "Bhakkar", "Buner", "Chagai", "Chakwal", "Chaman", "Charsadda", "Chiniot", "Dadu", "Dera Bugti", "Dera Ghazi Khan", "Dera Ismail Khan", "Diamer", "Dukki", "Faisalabad", "Ghanche", "Ghizer", "Ghotki", "Gilgit", "Gujranwala", "Gujrat", "Gwadar", "Hafizabad", "Hangu", "Haripur", "Harnai", "Hattian Bala", "Haveli", "Hub", "Hunza", "Hyderabad", "Islamabad", "Jacobabad", "Jafarabad", "Jamshoro", "Jhang", "Jhelum", "Jhal Magsi", "Kalat", "Karachi Central", "Karachi East", "Karachi South", "Karachi West", "Karak", "Kashmore", "Kasur", "Keamari", "Kech", "Khairpur", "Khanewal", "Kharan", "Kharmang", "Khushab", "Khyber", "Khuzdar", "Killa Abdullah", "Killa Saifullah", "Kohat", "Kohlu", "Kolai Pallas", "Korangi", "Kotli", "Kurram", "Lahore", "Lakki Marwat", "Lasbela", "Layyah", "Lodhran", "Loralai", "Lower Dir", "Lower Kohistan", "Malakand", "Malir", "Mandi Bahauddin", "Mansehra", "Mardan", "Mastung", "Matiari", "Mianwali", "Mirpur", "Mirpurkhas", "Mohmand", "Multan", "Musakhel", "Muzaffarabad", "Muzaffargarh", "Nagar", "Nankana Sahib", "Narowal", "Naushahro Feroze", "Neelum", "North Waziristan", "Nushki", "Okara", "Orakzai", "Pakpattan", "Panjgur", "Peshawar", "Pishin", "Poonch", "Punjgur", "Qambar Shahdadkot", "Quetta", "Rahim Yar Khan", "Rajanpur", "Rawalpindi", "Roundu", "Sahiwal", "Sanghar", "Sargodha", "Shangla", "Shigar", "Shikarpur", "Sheikhupura", "Sherani", "Sialkot", "Sibi", "Skardu", "Sohbatpur", "South Waziristan", "Sudhanoti", "Sujawal", "Sukkur", "Surab", "Swabi", "Swat", "Tando Allahyar", "Tando Muhammad Khan", "Tank", "Tharparkar", "Thatta", "Toba Tek Singh", "Torghar", "Umerkot", "Upper Dir", "Upper Kohistan", "Vehari", "Washuk", "Zhob", "Ziarat"
];

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
    stopListening,
    supported,
    setTranscript,
    language,
    setLanguage,
    speechError
  } = useSpeechRecognition();

  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startAudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      
      let options = {};
      if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported('audio/webm')) {
        options = { mimeType: 'audio/webm' };
      } else if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported('audio/mp4')) {
        options = { mimeType: 'audio/mp4' };
      }
      
      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(track => track.stop());
        const audioBlob = new Blob(audioChunksRef.current, { type: options.mimeType || 'audio/webm' });
        if (audioBlob.size === 0) return;
        
        toast.promise(
          (async () => {
            const { transcribeAudio } = await import('@/lib/api');
            const result = await transcribeAudio(audioBlob);
            if (result && result.text) {
              setText(prev => {
                const base = prev.trim();
                return base ? `${base} ${result.text}` : result.text;
              });
            }
          })(),
          {
            loading: 'صوتی شناخت ہو رہی ہے... / Transcribing audio...',
            success: 'صوتی شناخت مکمل! / Transcription complete!',
            error: 'ترجمہ کرنے میں ناکامی / Transcription failed.'
          }
        );
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      toast.success('ریکارڈنگ شروع ہو گئی بولیں... / Recording started, speak now...');
    } catch (err) {
      console.error("Error accessing microphone:", err);
      toast.error('مائیکروفون تک رسائی میں ناکامی / Could not access microphone', {
        description: 'Please ensure microphone permissions are granted.',
      });
    }
  };

  const stopAudioRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleMicClick = () => {
    if (isWebSpeechLang) {
      startListening();
    } else {
      if (isRecording) {
        stopAudioRecording();
      } else {
        startAudioRecording();
      }
    }
  };

  const [selectedLanguage, setSelectedLanguage] = useState('Urdu');
  const [letterLanguage, setLetterLanguage] = useState('Urdu');
  const [isManual, setIsManual] = useState(false);

  const [name, setName] = useState('');
  const [district, setDistrict] = useState('');
  const [detectingLocation, setDetectingLocation] = useState(false);

  const [activeStepIndex, setActiveStepIndex] = useState(-1);

  const steps = [
    { ur: "شکایت پڑھی جا رہی ہے...", en: "Analyzing complaint description" },
    { ur: "متعلقہ قوانین تلاش ہو رہے ہیں...", en: "Querying Pakistan law registry" },
    { ur: "قانونی تجزیہ ہو رہا ہے...", en: "Running legal rights check" },
    { ur: "شکایتی خط تیار ہو رہا ہے...", en: "Generating petition document" }
  ];

  useEffect(() => {
    let interval;
    if (loading) {
      setActiveStepIndex(0);
      let currentStep = 1;
      interval = setInterval(() => {
        if (currentStep < steps.length) {
          setActiveStepIndex(currentStep);
          currentStep++;
        }
      }, 1800);
    } else {
      setActiveStepIndex(-1);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loading]);

  const handleLanguageChange = (lang, manual = false) => {
    if (manual) {
      setIsManual(true);
    }
    setSelectedLanguage(lang);
    
    // Stop any active recordings or speech recognition on language switch
    if (isListening) {
      stopListening();
    }
    if (isRecording) {
      stopAudioRecording();
    }
    
    if (lang === 'English') {
      setLanguage('en-US');
      setLetterLanguage('English');
    } else if (lang === 'Sindhi') {
      setLanguage('sd-PK');
      setLetterLanguage('Urdu');
    } else if (lang === 'Pashto') {
      setLanguage('ps-PK');
      setLetterLanguage('Urdu');
    } else {
      setLanguage('ur-PK');
      setLetterLanguage('Urdu');
    }
  };

  // Reset manual lock if text is cleared
  useEffect(() => {
    if (!text.trim()) {
      setIsManual(false);
    }
  }, [text]);

  // Smart language auto-detect when user types
  useEffect(() => {
    if (isManual) return;
    const urduRegex = /[\u0600-\u06FF]/;
    if (text.trim()) {
      const containsUrduScript = urduRegex.test(text);
      
      // If typing Urdu script while in LTR modes -> switch to Urdu
      if (containsUrduScript && ['English', 'Roman (Urdu/Regional)'].includes(selectedLanguage)) {
        handleLanguageChange('Urdu');
      }
    }
  }, [text, selectedLanguage, isManual]);

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

  const detectDistrict = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`);
          const data = await res.json();
          if (data && data.address) {
            const rawDistrict = data.address.county || data.address.state_district || data.address.city || data.address.town || "";
            let cleanDistrict = rawDistrict.replace(/\s+District/gi, "").trim();
            
            const matched = ALL_DISTRICTS.find(
              (d) => d.toLowerCase() === cleanDistrict.toLowerCase()
            );
            
            if (matched) {
              setDistrict(matched);
              toast.success(`Location detected: ${matched} District`);
            } else {
              const partialMatched = ALL_DISTRICTS.find(
                (d) => cleanDistrict.toLowerCase().includes(d.toLowerCase()) || d.toLowerCase().includes(cleanDistrict.toLowerCase())
              );
              if (partialMatched) {
                setDistrict(partialMatched);
                toast.success(`Location matched: ${partialMatched} District`);
              } else {
                toast.error(`Could not match location (${cleanDistrict}) to a Pakistani district.`);
              }
            }
          } else {
            toast.error("Could not fetch location address.");
          }
        } catch (err) {
          console.error(err);
          toast.error("Failed to reverse geocode location.");
        } finally {
          setDetectingLocation(false);
        }
      },
      (error) => {
        console.error(error);
        toast.error("Permission denied or failed to retrieve GPS coordinates.");
        setDetectingLocation(false);
      },
      { enableHighAccuracy: false, timeout: 15000 }
    );
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (text.trim() && !loading) {
      onAnalyze(text, { 
        language: selectedLanguage, 
        letter_language: letterLanguage,
        name: name.trim() || undefined,
        district: district || undefined
      });
    }
  };

  const handleExampleClick = (example) => {
    setText(example);
  };

  const isRtl = ['Urdu', 'Sindhi', 'Punjabi', 'Pashto'].includes(selectedLanguage);
  const isWebSpeechLang = ['Urdu', 'English', 'Roman (Urdu/Regional)'].includes(selectedLanguage);
  
  const isRecordingSupported = typeof window !== 'undefined' && !!window.MediaRecorder;
  const isMicDisabled = !isWebSpeechLang && !isRecordingSupported;
  const activeListening = isWebSpeechLang ? isListening : isRecording;
  const micSupported = isWebSpeechLang ? supported : isRecordingSupported;
  
  // Dynamic direction and font based on text (or selectedLanguage if empty)
  const isTextAreaRtl = text.trim() 
    ? /[\u0600-\u06FF]/.test(text)
    : ['Urdu', 'Sindhi', 'Punjabi', 'Pashto'].includes(selectedLanguage);

  return (
    <div id="complaint-section" className="w-full max-w-6xl mx-auto px-4 py-12 scroll-mt-24">
      <AnimatedContainer variant="fadeUp">

        {/* Mahogany Wood Console Outer Frame */}
        <div className={cn(
          "wood-console rounded-2xl p-6 md:p-8 transition-all duration-300 relative overflow-hidden",
          activeListening ? "ring-2 ring-red-500/50" : ""
        )}>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">

            {/* Aged Parchment Sheet Textarea Box */}
            <div className="parchment-sheet rounded-xl p-5 md:p-8 pt-14 pb-10 relative">

              {/* Language Badge Chip */}
              <div className="absolute top-3 left-4 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-accent/20 bg-accent/5 text-[9px] font-bold text-accent font-inter select-none">
                {selectedLanguage === 'Urdu' ? '🇵🇰 اردو' :
                 selectedLanguage === 'English' ? '🇬🇧 English' :
                 selectedLanguage === 'Roman (Urdu/Regional)' ? '✍️ Roman (Urdu/Regional)' :
                 selectedLanguage === 'Sindhi' ? '🇵🇰 سنڌي' :
                 selectedLanguage === 'Punjabi' ? '🇵🇰 پنجابی' : '🇵🇰 پښتو'}
              </div>

              {/* Official Document Seal Watermark */}
              <div className="absolute top-3 right-5 text-[9px] uppercase tracking-[0.25em] font-bold text-amber-900/15 dark:text-amber-100/10 font-inter select-none pointer-events-none">
                Official Petition Form
              </div>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, 800))}
                placeholder={isTextAreaRtl ? "اپنی شکایت یہاں لکھیں یا مائیک کا بٹن دبا کر بولیں..." : "Type or click the microphone to speak your complaint..."}
                className={cn(
                  "w-full min-h-[170px] bg-transparent resize-none outline-none leading-relaxed placeholder:text-amber-900/30 dark:placeholder:text-amber-100/25 transition-all border-none focus:ring-0 mt-2 px-4",
                  isTextAreaRtl 
                    ? "font-urdu text-base sm:text-xl md:text-3xl leading-[2.0] sm:leading-[2.5] md:leading-[2.8] py-2 text-amber-950 dark:text-amber-100" 
                    : "font-garamond text-base sm:text-xl md:text-3xl font-bold leading-[1.5] sm:leading-[1.9] md:leading-[2.2] py-2 text-amber-950 dark:text-amber-100"
                )}
                dir={isTextAreaRtl ? "rtl" : "ltr"}
                style={{ unicodeBidi: 'plaintext' }}
                disabled={loading}
                maxLength={800}
              />

              {activeListening && (
                <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 font-semibold animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-red-600 dark:bg-red-400" />
                  <span className="font-urdu leading-none">{isRtl ? "سن رہا ہوں..." : "Listening..."}</span>
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

            {/* Optional Applicant Details Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#FAF6EE]/30 dark:bg-[#20120B]/30 p-4 rounded-xl border border-accent/20">
              
              {/* Optional Name Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-accent/80 font-inter">
                  Your Name (Optional / اختیاری نام)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Muhammad Ali"
                  className="rounded px-3 h-10 font-bold text-xs font-inter text-accent bg-[#FAF6EE]/90 dark:bg-[#20120B]/90 border border-accent/30 focus:border-accent outline-none w-full shadow-inner"
                  disabled={loading}
                />
              </div>

              {/* District Dropdown with Location Finder */}
              <div className="flex flex-col gap-1.5 relative">
                <div className="flex justify-between items-center w-full">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-accent/80 font-inter">
                    District (Optional / اختیاری ضلع)
                  </label>
                  <button
                    type="button"
                    onClick={detectDistrict}
                    disabled={detectingLocation || loading}
                    className="text-[9px] font-bold text-emerald-600 dark:text-emerald-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors uppercase cursor-pointer flex items-center gap-1 bg-emerald-500/5 hover:bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-inter font-bold"
                  >
                    {detectingLocation ? "Detecting..." : "🎯 Auto-Detect"}
                  </button>
                </div>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="rounded px-3 h-10 font-bold text-xs font-inter text-accent cursor-pointer bg-[#FAF6EE]/90 dark:bg-[#20120B]/90 border border-accent/30 outline-none pr-8 appearance-none relative w-full"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23C5A059'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                    backgroundPosition: 'right 10px center',
                    backgroundSize: '12px',
                    backgroundRepeat: 'no-repeat'
                  }}
                  disabled={loading}
                >
                  <option value="" className="bg-[#FAF3E0] dark:bg-[#1C120D] text-amber-950 dark:text-[#E6DBC6]">Select District...</option>
                  {ALL_DISTRICTS.map((d) => (
                    <option key={d} value={d} className="bg-[#FAF3E0] dark:bg-[#1C120D] text-amber-950 dark:text-[#E6DBC6]">{d}</option>
                  ))}
                </select>
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

            {loading && activeStepIndex >= 0 && (
              <div className="w-full bg-[#FAF3E0]/40 dark:bg-[#1C120D]/40 border border-accent/20 rounded-xl p-6 flex flex-col items-center justify-center text-center gap-4 animate-in fade-in duration-300 shadow-lg">
                
                {/* Custom Elegant Medallion Spinner */}
                <div className="relative w-14 h-14 flex items-center justify-center">
                  {/* Outer rotating decorative ring */}
                  <div className="absolute inset-0 border-2 border-dashed border-accent/40 rounded-full animate-[spin_12s_linear_infinite]" />
                  {/* Inner fast spinning loader */}
                  <div className="absolute w-11 h-11 border-4 border-emerald-600 dark:border-emerald-500 border-t-transparent rounded-full animate-spin shadow-md" />
                  {/* Center core pulsing glow */}
                  <div className="absolute w-6 h-6 rounded-full bg-accent/10 animate-ping" />
                  <Sparkles className="w-4 h-4 text-accent relative z-10" />
                </div>

                {/* Step Content */}
                <div className="flex flex-col items-center gap-1.5 max-w-md">
                  <p className="font-urdu text-xl md:text-2xl font-bold text-amber-950 dark:text-[#E6DBC6] leading-relaxed animate-pulse">
                    {steps[activeStepIndex]?.ur}
                  </p>
                  <p className="font-inter text-xs text-accent/80 tracking-wider uppercase font-bold">
                    {steps[activeStepIndex]?.en}
                  </p>
                </div>

                {/* Progress Indicators (Pills) */}
                <div className="flex justify-center gap-2 mt-1">
                  {steps.map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-2 w-10 rounded-full transition-all duration-500 shadow-sm",
                        i <= activeStepIndex
                          ? "bg-gradient-to-r from-accent to-emerald-600 dark:from-accent dark:to-emerald-500 shadow-[0_0_8px_rgba(197,160,89,0.4)] animate-pulse"
                          : "bg-amber-900/15 dark:bg-amber-100/10 border border-amber-900/5 dark:border-amber-100/5"
                      )}
                    />
                  ))}
                </div>

                <p className="text-[10px] text-amber-900/50 dark:text-[#E6DBC6]/40 max-w-sm mt-1 leading-normal font-inter">
                  Our legal AI is verifying laws in real-time. Please keep this window active.
                </p>
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
                    className="text-xs font-inter px-3.5 py-1.5 rounded bg-accent/10 dark:bg-[#3A231A]/60 text-amber-950 dark:text-accent hover:bg-accent/20 dark:hover:bg-[#3A231A] border border-accent/30 dark:border-[#523225] hover:border-accent/60 dark:hover:border-[#C5A059]/40 transition-all cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.15)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.3)] font-semibold"
                  >
                    {ex}
                  </button>
                ))}
              </div>

              {/* Action Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4 w-full md:w-auto shrink-0">

                {/* Dropdowns Wrapper: Grid on mobile, Flex on desktop */}
                <div className="grid grid-cols-2 sm:flex sm:flex-row gap-3 w-full sm:w-auto">

                  {/* Input/Response Language Dropdown */}
                  <div className="flex flex-col gap-1 w-full sm:w-auto shrink-0 align-bottom">
                    <span className="text-[8px] font-bold uppercase tracking-wider text-accent/80 font-inter leading-none">Response Language</span>
                    <select
                      value={selectedLanguage}
                      onChange={(e) => handleLanguageChange(e.target.value, true)}
                      className="bezel-btn rounded px-3 h-10 font-bold text-[11px] font-inter text-accent cursor-pointer bg-[#FAF6EE] dark:bg-[#20120B] border border-accent/30 outline-none pr-8 appearance-none relative shadow-[0_2px_4px_rgba(0,0,0,0.15)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.3)] w-full sm:w-[130px]"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23C5A059'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                        backgroundPosition: 'right 8px center',
                        backgroundSize: '12px',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                      <option value="Urdu" className="bg-[#FAF3E0] dark:bg-[#1C120D] text-amber-950 dark:text-[#E6DBC6] font-urdu text-sm">اردو (Urdu)</option>
                      <option value="English" className="bg-[#FAF3E0] dark:bg-[#1C120D] text-amber-950 dark:text-[#E6DBC6] font-inter">English</option>
                      <option value="Roman (Urdu/Regional)" className="bg-[#FAF3E0] dark:bg-[#1C120D] text-amber-950 dark:text-[#E6DBC6] font-inter">Roman (Urdu/Punjabi/etc.)</option>
                      <option value="Sindhi" className="bg-[#FAF3E0] dark:bg-[#1C120D] text-amber-950 dark:text-[#E6DBC6] font-urdu text-sm">سنڌي (Sindhi)</option>
                      <option value="Punjabi" className="bg-[#FAF3E0] dark:bg-[#1C120D] text-amber-950 dark:text-[#E6DBC6] font-urdu text-sm">پنجابی (Punjabi)</option>
                      <option value="Pashto" className="bg-[#FAF3E0] dark:bg-[#1C120D] text-amber-950 dark:text-[#E6DBC6] font-urdu text-sm">پښتو (Pashto)</option>
                    </select>
                  </div>

                  {/* Complaint Letter Language Dropdown */}
                  <div className="flex flex-col gap-1 w-full sm:w-auto shrink-0 align-bottom">
                    <span className="text-[8px] font-bold uppercase tracking-wider text-accent/80 font-inter leading-none">Letter Language</span>
                    <select
                      value={letterLanguage}
                      onChange={(e) => {
                        setLetterLanguage(e.target.value);
                        setIsManual(true);
                      }}
                      className="bezel-btn rounded px-3 h-10 font-bold text-[11px] font-inter text-accent cursor-pointer bg-[#FAF6EE] dark:bg-[#20120B] border border-accent/30 outline-none pr-8 appearance-none relative shadow-[0_2px_4px_rgba(0,0,0,0.15)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.3)] w-full sm:w-[120px]"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23C5A059'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                        backgroundPosition: 'right 8px center',
                        backgroundSize: '12px',
                        backgroundRepeat: 'no-repeat'
                      }}
                    >
                      <option value="Urdu" className="bg-[#FAF3E0] dark:bg-[#1C120D] text-amber-950 dark:text-[#E6DBC6] font-urdu text-sm">Urdu Letter</option>
                      <option value="English" className="bg-[#FAF3E0] dark:bg-[#1C120D] text-amber-950 dark:text-[#E6DBC6] font-inter">English Letter</option>
                    </select>
                  </div>

                </div>

                {/* Buttons Wrapper: Flex row on all sizes */}
                <div className="flex items-center justify-end gap-3 w-full sm:w-auto shrink-0">
                  {micSupported ? (
                    <Button
                      type="button"
                      variant={activeListening ? "destructive" : "secondary"}
                      size="icon"
                      className={cn(
                        "bezel-btn rounded-full w-10 h-10 transition-all duration-300 relative cursor-pointer shrink-0",
                        activeListening && "ring-4 ring-red-500/60 scale-110 shadow-[0_0_15px_rgba(239,68,68,0.5)] bg-red-600 border-red-500 hover:bg-red-700 hover:border-red-600",
                        isMicDisabled && "opacity-40 cursor-not-allowed pointer-events-none"
                      )}
                      onClick={handleMicClick}
                      disabled={loading || isMicDisabled}
                      title={isMicDisabled ? "Voice input not supported on this device/language" : (activeListening ? "Stop voice input" : "Start speaking")}
                    >
                      {activeListening ? <Square className="w-4 h-4 text-white" /> : <Mic className="w-5 h-5 text-accent" />}
                    </Button>
                  ) : (
                    <div className="text-xs text-muted-foreground flex items-center justify-center border border-amber-900/10 dark:border-[#523225] rounded-full w-10 h-10 bg-amber-900/5 dark:bg-[#3A231A] shrink-0" title="Voice input not supported in this browser">
                      <AlertCircle className="w-5 h-5 text-muted-foreground/30" />
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={!text.trim() || loading}
                    className="bezel-btn px-8 h-10 font-urdu font-bold rounded-lg cursor-pointer flex items-center justify-center gap-2 border-emerald-600 dark:border-emerald-700 bg-gradient-to-b from-emerald-600 to-emerald-700 dark:from-emerald-800 dark:to-emerald-950 hover:from-emerald-500 hover:to-emerald-600 dark:hover:from-emerald-700 dark:hover:to-emerald-900 text-white dark:text-emerald-100 disabled:opacity-50 disabled:pointer-events-none flex-grow sm:flex-grow-0 sm:w-auto text-center"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        تجزیہ کریں
                        <Send className="w-4 h-4 ms-2 rotate-0 rtl:rotate-180 text-emerald-400" />
                      </>
                    )}
                  </Button>
                </div>
              </div>

            </div>
          </form>


          {/* Glowing record overlay indicator */}
          {activeListening && (
            <div className="absolute inset-0 bg-red-500/2 dark:bg-red-500/1 pointer-events-none" />
          )}

        </div>
      </AnimatedContainer>
    </div>
  );
}
