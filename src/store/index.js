import { configureStore } from '@reduxjs/toolkit';
import scoreReducer from './slices/scoreSlice';

// Configure Redux store with optimizations
export const store = configureStore({
  reducer: {
    score: scoreReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Optimize serializable check for better performance
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
        ignoredPaths: ['score.entries'],
      },
      // Enable immutable check in development
      immutableCheck: process.env.NODE_ENV === 'development',
    }),
  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV === 'development',
});

// Export types for TypeScript-like development experience
// Note: These are JSDoc comments for better IDE support
/**
 * @typedef {import('@reduxjs/toolkit').RootState} RootState
 * @typedef {import('@reduxjs/toolkit').AppDispatch} AppDispatch
 */
