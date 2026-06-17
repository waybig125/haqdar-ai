/**
 * HaqDar AI - JSDoc Type Definitions
 * This file provides type hints for the IDE without requiring TypeScript.
 */

/**
 * @typedef {'high' | 'medium' | 'needs_verification'} ConfidenceLevel
 */

/**
 * @typedef {'sdg16' | 'sdg10' | 'both'} SdgAlignment
 */

/**
 * @typedef {Object} AnalysisResult
 * @property {string} violation_summary - Plain Urdu explanation of what happened
 * @property {string} law_reference - Exact Pakistani law name + section number
 * @property {string} responsible_authority - Which government office to complain to
 * @property {string} complaint_letter - Full formal letter in legal Urdu
 * @property {ConfidenceLevel} confidence_score - 'high', 'medium', or 'needs_verification'
 * @property {string} confidence_reason - One-line explanation of why this confidence level was assigned
 * @property {string} citizen_rights - Rights explained simply in Urdu
 * @property {string} evidence_to_collect - What proof to gather
 * @property {string[]} next_steps - 3 action steps in Urdu
 * @property {SdgAlignment} sdg_alignment - Which SDG this maps to
 */

/**
 * @typedef {Object} RightsResult
 * @property {string} citizen_rights - Rights explained simply in Urdu
 * @property {string} law_reference - Exact Pakistani law name + section number
 * @property {string} evidence_to_collect - What proof to gather
 * @property {string[]} next_steps - 3 action steps in Urdu
 * @property {string} responsible_authority - Which government office to contact
 */

/**
 * @typedef {Object} StatsData
 * @property {Array<{name: string, count: number}>} top_issues
 * @property {Array<{district: string, count: number, trend: string}>} district_rankings
 * @property {Array<{month: string, count: number}>} monthly_trend
 * @property {Array<{category: string, value: number}>} category_breakdown
 * @property {number} sdg16_progress
 * @property {number} total_reports
 */

export {}; // Ensure it's treated as a module
