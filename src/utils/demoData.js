/**
 * Demo data for testing the application
 * This file contains sample score entries to populate the initial state
 */

export const demoScores = [
  {
    id: 'demo-1',
    score: 95,
    time: 120,
    timestamp: '2024-01-15T10:30:00.000Z',
    status: 'excellent'
  },
  {
    id: 'demo-2',
    score: 88,
    time: 180,
    timestamp: '2024-01-15T11:15:00.000Z',
    status: 'good'
  },
  {
    id: 'demo-3',
    score: 92,
    time: 150,
    timestamp: '2024-01-15T12:00:00.000Z',
    status: 'excellent'
  },
  {
    id: 'demo-4',
    score: 75,
    time: 240,
    timestamp: '2024-01-15T13:30:00.000Z',
    status: 'good'
  },
  {
    id: 'demo-5',
    score: 65,
    time: 300,
    timestamp: '2024-01-15T14:45:00.000Z',
    status: 'needs-improvement'
  },
  {
    id: 'demo-6',
    score: 98,
    time: 90,
    timestamp: '2024-01-15T15:20:00.000Z',
    status: 'excellent'
  }
];

/**
 * Function to populate demo data into Redux store
 * @param {Function} dispatch - Redux dispatch function
 */
export const populateDemoData = (dispatch) => {
  const { addScore } = require('../store/slices/scoreSlice');
  
  demoScores.forEach(scoreData => {
    dispatch(addScore({
      score: scoreData.score,
      time: scoreData.time
    }));
  });
};
