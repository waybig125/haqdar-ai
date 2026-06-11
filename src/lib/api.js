/**
 * HaqDar AI - API Client
 * Centralized fetch calls to the FastAPI backend.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Mock delay for realistic loading states if backend is unavailable
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
    console.error("Analyze API failed, falling back to mock data", error);
    // Fallback mock data for hackathon demo if backend is offline
    await delay(2000);
    return {
      violation_summary: "پولیس اہلکار کا بغیر رسید کے جرمانہ کرنا اور ہراساں کرنا غیر قانونی ہے۔",
      law_reference: "Punjab Police Rules 2017, Section 12.4",
      responsible_authority: "DPO Office / IG Complaint Cell",
      complaint_letter: "بخدمت جناب ڈسٹرکٹ پولیس آفیسر صاحب،\n\nگزارش ہے کہ مورخہ 12 مئی کو پولیس اہلکار نے مجھے بلاوجہ روکا اور بغیر کسی چالان رسید کے 500 روپے جرمانہ وصول کیا۔ یہ عمل پولیس رولز کی صریح خلاف ورزی ہے۔\n\nبرائے مہربانی اس واقعے کی انکوائری کی جائے اور میرے خلاف ہونے والی اس ناانصافی کا ازالہ کیا جائے۔\n\nالعارض،\nایک شہری",
      confidence_score: "high",
      confidence_reason: "واضح قانون موجود ہے جو بغیر رسید جرمانے کو غیر قانونی قرار دیتا ہے۔",
      citizen_rights: "آپ کو حق حاصل ہے کہ جرمانے کی سرکاری رسید طلب کریں اور وردی پر اہلکار کے نام کا بیج دیکھیں۔",
      evidence_to_collect: "واقعے کا وقت، جگہ، اور اہلکار کا نام یا گاڑی کا نمبر نوٹ کریں۔ اگر کوئی گواہ موجود ہو تو اس کا رابطہ نمبر لیں۔",
      next_steps: [
        "یہ شکایت نامہ کاپی کر کے ڈی پی او آفس میں جمع کروائیں۔",
        "وزیراعظم سٹیزن پورٹل پر بھی درج کروائیں۔",
        "اگر 7 دن میں جواب نہ ملے تو محتسب اعلیٰ سے رجوع کریں۔"
      ],
      sdg_alignment: "sdg16"
    };
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
    return await response.json();
  } catch (error) {
    // Return hardcoded realistic demo data
    await delay(500);
    return {
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
  }
}
