import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import scoreReducer from '../store/slices/scoreSlice';
import { useScoreForm } from '../hooks/useScoreForm';

/**
 * Test suite for useScoreForm hook
 */
describe('useScoreForm', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        score: scoreReducer,
      },
    });

    wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );
  });

  test('should initialize with empty form data', () => {
    const { result } = renderHook(() => useScoreForm(), { wrapper });

    expect(result.current.formData.score).toBe('');
    expect(result.current.formData.time).toBe('');
    expect(result.current.errors).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isFormValid).toBe(false);
    expect(result.current.hasErrors).toBe(false);
  });

  test('should update form data on input change', () => {
    const { result } = renderHook(() => useScoreForm(), { wrapper });

    act(() => {
      result.current.handleInputChange('score', '95');
    });

    expect(result.current.formData.score).toBe('95');
    expect(result.current.formData.time).toBe('');
  });

  test('should clear errors when user starts typing', () => {
    const { result } = renderHook(() => useScoreForm(), { wrapper });

    // First, set an error
    act(() => {
      result.current.handleInputChange('score', '');
      result.current.handleInputChange('time', '');
    });

    // Then start typing to clear error
    act(() => {
      result.current.handleInputChange('score', '95');
    });

    expect(result.current.errors.score).toBeNull();
  });

  test('should validate required fields', () => {
    const { result } = renderHook(() => useScoreForm(), { wrapper });

    act(() => {
      result.current.handleInputChange('score', '');
      result.current.handleInputChange('time', '');
    });

    const isValid = result.current.validateField('score', '');
    expect(isValid).toBe('Điểm là bắt buộc');

    const timeValid = result.current.validateField('time', '');
    expect(timeValid).toBe('Thời gian là bắt buộc');
  });

  test('should validate score range', () => {
    const { result } = renderHook(() => useScoreForm(), { wrapper });

    // Test score below 0
    let isValid = result.current.validateField('score', '-5');
    expect(isValid).toBe('Điểm phải từ 0 trở lên');

    // Test score above 100
    isValid = result.current.validateField('score', '105');
    expect(isValid).toBe('Điểm không được vượt quá 100');

    // Test valid score
    isValid = result.current.validateField('score', '85');
    expect(isValid).toBeNull();
  });

  test('should validate time range', () => {
    const { result } = renderHook(() => useScoreForm(), { wrapper });

    // Test time below 0
    let isValid = result.current.validateField('time', '-10');
    expect(isValid).toBe('Thời gian phải từ 0 trở lên');

    // Test valid time
    isValid = result.current.validateField('time', '120');
    expect(isValid).toBeNull();
  });

  test('should validate number format', () => {
    const { result } = renderHook(() => useScoreForm(), { wrapper });

    // Test non-numeric input
    let isValid = result.current.validateField('score', 'abc');
    expect(isValid).toBe('Điểm phải là số');

    isValid = result.current.validateField('time', 'xyz');
    expect(isValid).toBe('Thời gian phải là số');
  });

  test('should update form validity correctly', () => {
    const { result } = renderHook(() => useScoreForm(), { wrapper });

    // Initially invalid
    expect(result.current.isFormValid).toBe(false);

    // Fill in valid data
    act(() => {
      result.current.handleInputChange('score', '85');
      result.current.handleInputChange('time', '120');
    });

    // Should be valid now
    expect(result.current.isFormValid).toBe(true);
  });

  test('should reset form correctly', () => {
    const { result } = renderHook(() => useScoreForm(), { wrapper });

    // Fill in some data
    act(() => {
      result.current.handleInputChange('score', '85');
      result.current.handleInputChange('time', '120');
    });

    // Reset form
    act(() => {
      result.current.resetForm();
    });

    expect(result.current.formData.score).toBe('');
    expect(result.current.formData.time).toBe('');
    expect(result.current.errors).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
  });

  test('should handle form submission successfully', async () => {
    const { result } = renderHook(() => useScoreForm(), { wrapper });

    // Fill in valid data
    act(() => {
      result.current.handleInputChange('score', '85');
      result.current.handleInputChange('time', '120');
    });

    // Submit form
    let success = false;
    await act(async () => {
      success = await result.current.handleSubmit();
    });

    expect(success).toBe(true);
    
    // Form should be reset after successful submission
    expect(result.current.formData.score).toBe('');
    expect(result.current.formData.time).toBe('');
    expect(result.current.errors).toEqual({});
  });

  test('should handle form submission with validation errors', async () => {
    const { result } = renderHook(() => useScoreForm(), { wrapper });

    // Try to submit empty form
    let success = false;
    await act(async () => {
      success = await result.current.handleSubmit();
    });

    expect(success).toBe(false);
    expect(result.current.hasErrors).toBe(true);
  });

  test('should handle decimal scores', () => {
    const { result } = renderHook(() => useScoreForm(), { wrapper });

    act(() => {
      result.current.handleInputChange('score', '95.5');
    });

    const isValid = result.current.validateField('score', '95.5');
    expect(isValid).toBeNull();
  });

  test('should handle decimal time', () => {
    const { result } = renderHook(() => useScoreForm(), { wrapper });

    act(() => {
      result.current.handleInputChange('time', '120.5');
    });

    const isValid = result.current.validateField('time', '120.5');
    expect(isValid).toBeNull();
  });
});
