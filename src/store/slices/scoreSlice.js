import { createSlice, createSelector } from '@reduxjs/toolkit';
import { PERFORMANCE_STATUSES, SCORE_THRESHOLDS } from '../../types';

/**
 * Helper function to determine performance status based on score
 * @param {number} score - Score value (0-100)
 * @returns {string} Performance status
 */
const getPerformanceStatus = (score) => {
  if (score > SCORE_THRESHOLDS.EXCELLENT) {
    return PERFORMANCE_STATUSES.EXCELLENT;
  } else if (score >= SCORE_THRESHOLDS.GOOD) {
    return PERFORMANCE_STATUSES.GOOD;
  } else {
    return PERFORMANCE_STATUSES.NEEDS_IMPROVEMENT;
  }
};

/**
 * Helper function to generate unique ID
 * @returns {string} Unique ID
 */
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const initialState = {
  entries: [],
  loading: false,
  error: null
};

const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    addScore: (state, action) => {
      const { score, time } = action.payload;
      const newEntry = {
        id: generateId(),
        score,
        time,
        timestamp: new Date().toISOString(),
        status: getPerformanceStatus(score)
      };
      
      // Add new entry and sort by ranking rules
      state.entries.push(newEntry);
      state.entries.sort((a, b) => {
        // First sort by score (descending)
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        // If scores are equal, sort by time (ascending)
        return a.time - b.time;
      });
    },
    
    removeScore: (state, action) => {
      const id = action.payload;
      state.entries = state.entries.filter(entry => entry.id !== id);
    },
    
    clearAllScores: (state) => {
      state.entries = [];
    },
    
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

// Export actions
export const { 
  addScore, 
  removeScore, 
  clearAllScores, 
  setLoading, 
  setError 
} = scoreSlice.actions;

// Export selectors with memoization for performance optimization
export const selectAllScores = (state) => state.score.entries;

export const selectTopScores = createSelector(
  [selectAllScores, (state, limit) => limit],
  (entries, limit) => entries.slice(0, limit)
);

export const selectScoreStats = createSelector(
  [selectAllScores],
  (entries) => {
    if (entries.length === 0) {
      return {
        total: 0,
        averageScore: 0,
        averageTime: 0,
        excellentCount: 0,
        goodCount: 0,
        needsImprovementCount: 0
      };
    }
    
    const total = entries.length;
    const totalScore = entries.reduce((sum, entry) => sum + entry.score, 0);
    const totalTime = entries.reduce((sum, entry) => sum + entry.time, 0);
    const averageScore = Math.round((totalScore / total) * 100) / 100;
    const averageTime = Math.round((totalTime / total) * 100) / 100;
    
    const excellentCount = entries.filter(entry => entry.status === PERFORMANCE_STATUSES.EXCELLENT).length;
    const goodCount = entries.filter(entry => entry.status === PERFORMANCE_STATUSES.GOOD).length;
    const needsImprovementCount = entries.filter(entry => entry.status === PERFORMANCE_STATUSES.NEEDS_IMPROVEMENT).length;
    
    return {
      total,
      averageScore,
      averageTime,
      excellentCount,
      goodCount,
      needsImprovementCount
    };
  }
);

export const selectTopThree = createSelector(
  [selectAllScores],
  (entries) => entries.slice(0, 3)
);

// Export reducer
export default scoreSlice.reducer;
