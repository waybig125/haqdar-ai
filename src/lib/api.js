/**
 * HaqDar AI - API Client
 * Centralized fetch calls to the FastAPI backend.
 */

let rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
// Clean trailing slashes
rawApiUrl = rawApiUrl.replace(/\/$/, '');
// Ensure it ends with /api/v1 prefix
if (!rawApiUrl.endsWith('/api/v1')) {
  rawApiUrl += '/api/v1';
}
const API_BASE_URL = rawApiUrl;

/**
 * Mock delay for realistic loading states if backend is unavailable
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const MOCK_COMPLAINTS = {
  "police ne bina wajah fine diya": {
    violation_summary: "پولیس اہلکار کا بغیر رسید کے جرمانہ کرنا اور ہراساں کرنا غیر قانونی ہے۔",
    law_reference: "Punjab Police Rules 2017, Section 12.4",
    responsible_authority: "DPO Office / IG Complaint Cell",
    complaint_letter: "بخدمت جناب ڈسٹرکٹ پولیس آفیسر صاحب،\n\nگزارش ہے کہ مورخہ 12 مئی کو پولیس اہلکار نے مجھے بلاوجہ روکا اور بغیر کسی چالان رسید کے 500 روپے جرمانہ وصول کیا۔ یہ عمل پولیس رولز کی صریح خلاف ورزی ہے۔\n\nبرائے مہربانی اس واقعے کی انکوائری کی جائے اور میرے خلاف ہونے والی اس ناانصافی کا ازالہ کیا جائے۔\n\nالعارض،\nایک شہری",
    confidence_score: "high",
    confidence_reason: "واضح قانون موجود ہے جو بغیر رسید جرمانے کو غیر قانونی قرار دیتا ہے۔",
    citizen_rights: "آپ کو حق حاصل ہے کہ جرمانے کی سرکاری رسید طلب کریں اور وردی پر اہلکار کے نام کا بیج دیکھیں۔",
    evidence_to_collect: [
      "اہلکار کا نام اور بیج نمبر نوٹ کریں۔",
      "واقعہ کی تاریخ، وقت اور صحیح مقام کی تفصیل لکھیں۔",
      "بغیر رسید جرمانے کی ویڈیو یا آڈیو ثبوت محفوظ کریں۔"
    ],
    next_steps: [
      "یہ شکایت نامہ کاپی کر کے ڈی پی او آفس میں جمع کروائیں۔",
      "وزیراعظم سٹیزن پورٹل پر بھی درج کروائیں۔",
      "اگر 7 دن میں جواب نہ ملے تو محتسب اعلیٰ سے رجوع کریں۔"
    ],
    sdg_alignment: "sdg16"
  },
  "hospital mein ilaj se inkaar": {
    violation_summary: "کسی بھی سرکاری یا نجی ہسپتال میں ہنگامی طبی علاج (Emergency Treatment) سے انکار کرنا بنیادی حقوق اور طبی قوانین کی خلاف ورزی ہے۔",
    law_reference: "Pakistan Medical Commission Act & Healthcare Commission Regulations",
    responsible_authority: "Provincial Healthcare Commission (PHC) / Department of Health",
    complaint_letter: "بخدمت جناب چیف ایگزیکٹو آفیسر، ہیلتھ کیئر کمیشن،\n\nگزارش ہے کہ مورخہ 13 جون کو میرے مریض کو ہنگامی حالت میں ہسپتال لایا گیا، لیکن وہاں موجود عملے نے فوری طبی امداد فراہم کرنے سے انکار کر دیا۔ یہ اقدام ہیلتھ کیئر کمیشن کے قوانین اور انسانی حقوق کے منافی ہے۔\n\nدرخواست ہے کہ اس ہسپتال کے خلاف قانونی کارروائی کی جائے اور ذمہ داران کا تعین کیا جائے۔\n\nالعارض،\nایک شہری",
    confidence_score: "high",
    confidence_reason: "ہنگامی حالت میں علاج سے انکار کرنا ہیلتھ کمیشن کے قوانین کے تحت سنگین جرم ہے۔",
    citizen_rights: "ہر شہری کو ہنگامی حالت میں فوری طبی امداد حاصل کرنے کا آئینی اور قانونی حق حاصل ہے۔",
    evidence_to_collect: [
      "ہسپتال کا نام، شعبہ اور ذمہ دار عملے کا نام معلوم کریں۔",
      "مریض کی حالت کی تصاویر، میڈیکل رپورٹس یا انکار کا وقت نوٹ کریں۔",
      "طبی معائنے کی پرچی یا کوئی بھی دستیاب دستاویزی ثبوت محفوظ رکھیں۔"
    ],
    next_steps: [
      "یہ شکایت نامہ صوبائی ہیلتھ کیئر کمیشن کی ہیلپ لائن یا ویب سائٹ پر درج کریں۔",
      "محکمہ صحت کے ضلعی دفتر (CEO Health) میں تحریری شکایت جمع کروائیں۔",
      "قانونی چارہ جوئی کے لیے مقامی پولیس اسٹیشن میں بھی رپوٹ درج کروائیں۔"
    ],
    sdg_alignment: "sdg10"
  },
  "bijli ka zyada bill aaya": {
    violation_summary: "بغیر کسی معقول وجہ کے یا بغیر میٹر ریڈنگ کے اوور بلنگ کرنا صارف کے بنیادی حقوق کی خلاف ورزی ہے۔",
    law_reference: "NEPRA Consumer Service Manual, Section 10",
    responsible_authority: "NEPRA / WAPDA Regional Complaint Cell",
    complaint_letter: "بخدمت جناب ایس ڈی او صاحب، واپڈا سرکل،\n\nگزارش ہے کہ مجھے اس ماہ بجلی کا بل انتہائی زیادہ بھیجا گیا ہے جو کہ میٹر ریڈنگ سے مطابقت نہیں رکھتا۔ یہ اوور بلنگ نیپرا کنزیومر سروس دستی کتابچہ کی صریح خلاف ورزی ہے۔\n\nدرخواست ہے کہ میرے میٹر کی دوبارہ ریڈنگ کی جائے اور بل کو درست کیا جائے۔\n\nالعارض،\nایک صارف",
    confidence_score: "medium",
    confidence_reason: "نیپرا قوانین صارفین کو غلط بلنگ کے خلاف تحفظ فراہم کرتے ہیں اور میٹر ٹیسٹنگ کا اختیار دیتے ہیں۔",
    citizen_rights: "آپ کو حق حاصل ہے کہ اپنے میٹر کی ریڈنگ چیک کریں اور کسی بھی شک کی صورت میں میٹر کی لیبارٹری ٹیسٹنگ کی درخواست کریں۔",
    evidence_to_collect: [
      "بجلی کے میٹر کی حالیہ تصویر (جس میں میٹر ریڈنگ واضح نظر آئے) لیں۔",
      "پچھلے تین مہینوں کے بجلی کے بل اپنے پاس محفوظ کریں۔",
      "اوور بلنگ کی تحریری درخواست کی کاپی اپنے پاس رکھیں۔"
    ],
    next_steps: [
      "سب ڈویژنل آفیسر (SDO) کے دفتر میں تحریری شکایت جمع کروائیں۔",
      "اگر مسئلہ حل نہ ہو تو نیپرا کے ریجنل کمپلینٹ سیل (NEPRA Forum) سے رجوع کریں۔",
      "وفاقی محتسب برائے اوور بلنگ کے دفتر میں درخواست دائر کریں۔"
    ],
    sdg_alignment: "sdg16"
  },
  "school mein extra fee maang rahe hain": {
    violation_summary: "پرائیویٹ اسکولوں کی جانب سے حکومت کی منظور شدہ فیس سے زیادہ یا غیر قانونی اضافی چارجز طلب کرنا صوبائی تعلیمی اتھارٹی قوانین کی خلاف ورزی ہے۔",
    law_reference: "Private Educational Institutions Regulatory Authority (PEIRA) Act",
    responsible_authority: "District Education Authority / PEIRA Office",
    complaint_letter: "بخدمت جناب رجسٹرار، پرائیویٹ ایجوکیشنل انسٹی ٹیوشنز ریگولیٹری اتھارٹی،\n\nگزارش ہے کہ پرائیویٹ اسکول انتظامیہ حکومت کے منظور شدہ فیس شیڈول کے برعکس مجھ سے اضافی فنڈز اور فیسیں وصول کرنے پر اصرار کر رہی ہے۔ یہ تعلیمی قوانین کے خلاف ہے۔\n\nدرخواست ہے کہ اسکول انتظامیہ سے جواب طلبی کی جائے اور اضافی فیسوں کے نوٹس کو منسوخ کروایا جائے۔\n\nالعارض،\nایک طالب علم کا سرپرست",
    confidence_score: "medium",
    confidence_reason: "ریگولیٹری اتھارٹی کے پاس پرائیویٹ اسکولوں کے خلاف کارروائی اور فیس کنٹرول کرنے کے واضح اختیارات موجود ہیں۔",
    citizen_rights: "آپ کو اسکول کا منظور شدہ فیس شیڈول دیکھنے اور بغیر حکومتی منظوری کے اضافی چارجز دینے سے انکار کا حق ہے۔",
    evidence_to_collect: [
      "اسکول کی طرف سے جاری کردہ فیس واؤچر یا نوٹس کی کاپی حاصل کریں۔",
      "حکومت کی طرف سے منظور شدہ فیس شیڈول کی کاپی (اگر دستیاب ہو) پاس رکھیں۔",
      "فیس کی ادائیگی کی پچھلی رسیدیں اپنے پاس رکھیں۔"
    ],
    next_steps: [
      "ریگولیٹری اتھارٹی (PEIRA) کے شکایت پورٹل پر آن لائن درخواست درج کریں۔",
      "ضلعی تعلیمی افسر (CEO Education) کے پاس تحریری شکایت جمع کروائیں۔",
      "متاثرہ والدین کے ساتھ مل کر اسکول انتظامیہ کو باقاعدہ نوٹس بھیجیں۔"
    ],
    sdg_alignment: "sdg10"
  }
};

let cachedStats = null;

const initialMockStats = {
  total_reports: 1247,
  sdg16_progress: 8.4,
  top_issues: [
    { name: 'Police Extortion', count: 420 },
    { name: 'Utility Overcharging', count: 350 },
    { name: 'Denied Healthcare', count: 210 },
    { name: 'Labour Exploitation', count: 180 },
    { name: 'Education Fees', count: 87 },
  ],
  district_rankings: [
    { district: 'Karachi', count: 287, trend: 'up' },
    { district: 'Lahore', count: 142, trend: 'down' },
    { district: 'Islamabad', count: 98, trend: 'stable' },
    { district: 'Rawalpindi', count: 76, trend: 'up' },
    { district: 'Faisalabad', count: 63, trend: 'up' },
  ],
  monthly_trend: [
    { month: 'Jan', count: 800 },
    { month: 'Feb', count: 950 },
    { month: 'Mar', count: 1020 },
    { month: 'Apr', count: 1100 },
    { month: 'May', count: 1180 },
    { month: 'Jun', count: 1247 },
  ],
  category_breakdown: [
    { category: 'Police', value: 420 },
    { category: 'Utilities', value: 350 },
    { category: 'Healthcare', value: 210 },
    { category: 'Labour', value: 180 },
    { category: 'Other', value: 87 },
  ]
};

/**
 * Sends a complaint text to the backend for full legal analysis.
 * @param {string} text The user's complaint in Urdu/Roman Urdu
 * @returns {Promise<import('./types').AnalysisResult>}
 */
export async function analyzeComplaint(text) {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ complaint: text }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Analyze API failed", error);
    
    // Normalize string to match case/punctuation variations
    const normalizedInput = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
    
    for (const key of Object.keys(MOCK_COMPLAINTS)) {
      const normalizedKey = key.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
      if (normalizedInput.includes(normalizedKey) || normalizedKey.includes(normalizedInput)) {
        console.log(`Using mock response for example: ${key}`);
        await delay(1500);
        return MOCK_COMPLAINTS[key];
      }
    }
    
    // Throw error so the UI hook can trigger a Sonner error toast
    throw error;
  }
}

/**
 * Fetches dashboard statistics
 * @returns {Promise<import('./types').StatsData>}
 */
export async function getStats() {
  try {
    const response = await fetch(`${API_BASE_URL}/stats`);
    if (!response.ok) throw new Error('API Error');
    const rawData = await response.json();

    const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
    
    // Process monthly/daily trend
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyTrend = (rawData.daily_trend || []).map(t => {
      const parts = t.date.split('-');
      if (parts.length === 3) {
        const monthIndex = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const monthLabel = monthNames[monthIndex] || '';
        return { month: `${monthLabel} ${day}`, count: t.count };
      }
      return { month: t.date, count: t.count };
    });

    const trendData = monthlyTrend.length > 0 ? monthlyTrend : [
      { month: 'Jun 8', count: 0 },
      { month: 'Jun 9', count: 0 },
      { month: 'Jun 10', count: 0 },
      { month: 'Jun 11', count: 0 },
      { month: 'Jun 12', count: 1 },
      { month: 'Jun 13', count: 1 }
    ];

    // Process top issues
    const topIssues = (rawData.top_issues || []).map(issue => ({
      name: capitalize(issue.category),
      count: issue.count
    }));

    if (topIssues.length === 0) {
      topIssues.push({ name: 'General', count: 0 });
    }

    // Process district rankings
    const districtRankings = (rawData.districts || []).map(d => ({
      district: d.name,
      count: d.count,
      trend: 'stable'
    }));

    if (districtRankings.length === 0) {
      districtRankings.push({ district: 'All Districts', count: 0, trend: 'stable' });
    }

    // Process category breakdown
    const categoryBreakdown = (rawData.top_issues || []).map(issue => ({
      category: capitalize(issue.category),
      value: issue.count
    }));

    if (categoryBreakdown.length === 0) {
      categoryBreakdown.push({ category: 'General', value: 0 });
    }

    // Process SDG 16 Progress
    const sdg16Progress = rawData.total_reports > 0
      ? Math.min(100, parseFloat((8.0 + rawData.total_reports * 0.2).toFixed(1)))
      : 8.4;

    const statsData = {
      total_reports: rawData.total_reports || 0,
      sdg16_progress: sdg16Progress,
      top_issues: topIssues,
      district_rankings: districtRankings,
      monthly_trend: trendData,
      category_breakdown: categoryBreakdown
    };

    // Store in cache
    cachedStats = statsData;
    return statsData;
  } catch (error) {
    console.error("Stats API failed", error);
    if (cachedStats) {
      console.log("Using cached stats as fallback");
      return cachedStats;
    }
    // Return initial mock stats so dashboard doesn't completely fail
    return initialMockStats;
  }
}

/**
 * Renders the complaint letter as a downloadable PDF from the backend.
 * @param {Object} params
 * @param {string} params.reference_id
 * @param {string} params.complaint_letter
 * @param {string} [params.law_reference]
 * @param {string} [params.responsible_authority]
 * @returns {Promise<{blob: Blob, isFallback: boolean}>}
 */
export async function downloadLetterPdf({ reference_id, complaint_letter, law_reference = '', responsible_authority = '' }) {
  try {
    const response = await fetch(`${API_BASE_URL}/letter/pdf`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reference_id,
        complaint_letter,
        law_reference,
        responsible_authority,
      }),
    });

    if (!response.ok) {
      throw new Error(`PDF generation failed: ${response.status}`);
    }

    const blob = await response.blob();
    return { blob, isFallback: false };
  } catch (error) {
    console.error("PDF API failed, falling back to text file download", error);
    // Fallback: Return a text blob of the letter
    const txtContent = `HAQDAR AI — OFFICIAL COMPLAINT RECORD\n` +
      `Reference ID: ${reference_id}\n` +
      `Authority: ${responsible_authority}\n` +
      `Law Reference: ${law_reference}\n` +
      `--------------------------------------------------\n\n` +
      complaint_letter;
    const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
    return { blob, isFallback: true };
  }
}

/**
 * Looks up an anonymous report by its reference ID.
 * @param {string} reference_id
 * @returns {Promise<Object>}
 */
export async function lookupReport(reference_id) {
  try {
    const response = await fetch(`${API_BASE_URL}/report/${encodeURIComponent(reference_id)}`);
    if (!response.ok) {
      throw new Error(`Report lookup failed: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Report lookup failed", error);
    throw error;
  }
}


