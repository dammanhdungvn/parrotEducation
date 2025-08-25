import { configureStore } from '@reduxjs/toolkit';
import scoreReducer, { 
  addScore, 
  removeScore, 
  clearAllScores,
  selectAllScores,
  selectTopScores,
  selectScoreStats,
  selectTopThree
} from '../store/slices/scoreSlice';

/**
 * Test suite for score slice
 */
describe('Score Slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        score: scoreReducer,
      },
    });
  });

  describe('Actions', () => {
    test('should handle initial state', () => {
      const state = store.getState().score;
      expect(state.entries).toEqual([]);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
    });

    test('should handle adding a score', () => {
      const scoreData = { score: 95, time: 120 };
      
      store.dispatch(addScore(scoreData));
      
      const state = store.getState().score;
      expect(state.entries).toHaveLength(1);
      expect(state.entries[0]).toMatchObject({
        score: 95,
        time: 120,
        status: 'excellent'
      });
      expect(state.entries[0].id).toBeDefined();
      expect(state.entries[0].timestamp).toBeDefined();
    });

    test('should handle removing a score', () => {
      // Add a score first
      const scoreData = { score: 85, time: 180 };
      store.dispatch(addScore(scoreData));
      
      const state = store.getState().score;
      const scoreId = state.entries[0].id;
      
      // Remove the score
      store.dispatch(removeScore(scoreId));
      
      const newState = store.getState().score;
      expect(newState.entries).toHaveLength(0);
    });

    test('should handle clearing all scores', () => {
      // Add multiple scores
      store.dispatch(addScore({ score: 90, time: 150 }));
      store.dispatch(addScore({ score: 80, time: 200 }));
      
      expect(store.getState().score.entries).toHaveLength(2);
      
      // Clear all scores
      store.dispatch(clearAllScores());
      
      expect(store.getState().score.entries).toHaveLength(0);
    });
  });

  describe('Performance Status Logic', () => {
    test('should assign excellent status for score > 90', () => {
      store.dispatch(addScore({ score: 95, time: 100 }));
      
      const state = store.getState().score;
      expect(state.entries[0].status).toBe('excellent');
    });

    test('should assign good status for score 70-90', () => {
      store.dispatch(addScore({ score: 85, time: 150 }));
      
      const state = store.getState().score;
      expect(state.entries[0].status).toBe('good');
    });

    test('should assign needs-improvement status for score < 70', () => {
      store.dispatch(addScore({ score: 65, time: 300 }));
      
      const state = store.getState().score;
      expect(state.entries[0].status).toBe('needs-improvement');
    });
  });

  describe('Sorting Logic', () => {
    test('should sort by score descending first', () => {
      store.dispatch(addScore({ score: 80, time: 200 }));
      store.dispatch(addScore({ score: 95, time: 300 }));
      store.dispatch(addScore({ score: 70, time: 150 }));
      
      const state = store.getState().score;
      expect(state.entries[0].score).toBe(95);
      expect(state.entries[1].score).toBe(80);
      expect(state.entries[2].score).toBe(70);
    });

    test('should sort by time ascending when scores are equal', () => {
      store.dispatch(addScore({ score: 85, time: 200 }));
      store.dispatch(addScore({ score: 85, time: 150 }));
      store.dispatch(addScore({ score: 85, time: 300 }));
      
      const state = store.getState().score;
      expect(state.entries[0].time).toBe(150);
      expect(state.entries[1].time).toBe(200);
      expect(state.entries[2].time).toBe(300);
    });
  });

  describe('Selectors', () => {
    beforeEach(() => {
      // Add test data
      store.dispatch(addScore({ score: 95, time: 120 }));
      store.dispatch(addScore({ score: 85, time: 180 }));
      store.dispatch(addScore({ score: 75, time: 240 }));
    });

    test('selectAllScores should return all scores', () => {
      const scores = selectAllScores(store.getState());
      expect(scores).toHaveLength(3);
    });

    test('selectTopScores should return limited scores', () => {
      const topScores = selectTopScores(store.getState(), 2);
      expect(topScores).toHaveLength(2);
      expect(topScores[0].score).toBe(95);
    });

    test('selectTopThree should return top 3 scores', () => {
      const topThree = selectTopThree(store.getState());
      expect(topThree).toHaveLength(3);
      expect(topThree[0].score).toBe(95);
      expect(topThree[1].score).toBe(85);
      expect(topThree[2].score).toBe(75);
    });

    test('selectScoreStats should return correct statistics', () => {
      const stats = selectScoreStats(store.getState());
      
      expect(stats.total).toBe(3);
      expect(stats.averageScore).toBe(85);
      expect(stats.averageTime).toBe(180);
      expect(stats.excellentCount).toBe(1);
      expect(stats.goodCount).toBe(1);
      expect(stats.needsImprovementCount).toBe(1);
    });

    test('selectScoreStats should handle empty state', () => {
      // Clear all scores
      store.dispatch(clearAllScores());
      
      const stats = selectScoreStats(store.getState());
      
      expect(stats.total).toBe(0);
      expect(stats.averageScore).toBe(0);
      expect(stats.averageTime).toBe(0);
      expect(stats.excellentCount).toBe(0);
      expect(stats.goodCount).toBe(0);
      expect(stats.needsImprovementCount).toBe(0);
    });
  });
});
