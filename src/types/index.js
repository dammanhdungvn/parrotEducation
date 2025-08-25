/**
 * @typedef {Object} ScoreEntry
 * @property {string} id - Unique identifier for the score entry
 * @property {number} score - Score value (0-100)
 * @property {number} time - Time in seconds
 * @property {string} timestamp - ISO timestamp when the entry was created
 * @property {string} status - Performance status: 'excellent', 'good', or 'needs-improvement'
 */

/**
 * @typedef {Object} ScoreFormData
 * @property {number} score - Score value (0-100)
 * @property {number} time - Time in seconds
 */

/**
 * @typedef {Object} ValidationError
 * @property {string} field - Field name that has error
 * @property {string} message - Error message
 */

/**
 * @typedef {'excellent' | 'good' | 'needs-improvement'} PerformanceStatus
 */

export const PERFORMANCE_STATUSES = {
  EXCELLENT: 'excellent',
  GOOD: 'good',
  NEEDS_IMPROVEMENT: 'needs-improvement'
};

export const SCORE_THRESHOLDS = {
  EXCELLENT: 90,
  GOOD: 70
};
