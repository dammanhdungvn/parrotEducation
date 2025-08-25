import { useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { addScore } from '../store/slices/scoreSlice';

/**
 * Custom hook for managing score form with validation and submission
 * @returns {Object} Form state and handlers
 */
export const useScoreForm = () => {
  const dispatch = useDispatch();
  
  // Form state
  const [formData, setFormData] = useState({
    score: '',
    time: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation rules
  const validationRules = useMemo(() => ({
    score: {
      required: 'Điểm là bắt buộc',
      min: 'Điểm phải từ 0 trở lên',
      max: 'Điểm không được vượt quá 100',
      number: 'Điểm phải là số'
    },
    time: {
      required: 'Thời gian là bắt buộc',
      min: 'Thời gian phải từ 0 trở lên',
      number: 'Thời gian phải là số'
    }
  }), []);

  /**
   * Validate a single field
   * @param {string} field - Field name to validate
   * @param {string} value - Field value to validate
   * @returns {string|null} Error message or null if valid
   */
  const validateField = useCallback((field, value) => {
    const rules = validationRules[field];
    
    if (rules.required && (!value || value.toString().trim() === '')) {
      return rules.required;
    }
    
    if (value !== '') {
      const numValue = Number(value);
      
      if (isNaN(numValue)) {
        return rules.number;
      }
      
      if (field === 'score') {
        if (numValue < 0) return rules.min;
        if (numValue > 100) return rules.max;
      } else if (field === 'time') {
        if (numValue < 0) return rules.min;
      }
    }
    
    return null;
  }, [validationRules]);

  /**
   * Validate all fields
   * @returns {boolean} True if all fields are valid
   */
  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;
    
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  }, [formData, validateField]);

  /**
   * Handle input change with validation
   * @param {string} field - Field name
   * @param {string} value - New field value
   */
  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  }, [errors]);

  /**
   * Handle form submission
   * @returns {Promise<boolean>} True if submission successful
   */
  const handleSubmit = useCallback(async () => {
    if (!validateForm()) {
      return false;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const scoreData = {
        score: Number(formData.score),
        time: Number(formData.time)
      };
      
      dispatch(addScore(scoreData));
      
      // Reset form after successful submission
      setFormData({ score: '', time: '' });
      setErrors({});
      
      return true;
    } catch (error) {
      console.error('Error submitting score:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, dispatch]);

  /**
   * Reset form to initial state
   */
  const resetForm = useCallback(() => {
    setFormData({ score: '', time: '' });
    setErrors({});
    setIsSubmitting(false);
  }, []);

  // Memoized computed values
  const isFormValid = useMemo(() => {
    return Object.values(formData).every(value => value !== '') && 
           Object.keys(errors).length === 0;
  }, [formData, errors]);

  const hasErrors = useMemo(() => {
    return Object.keys(errors).length > 0;
  }, [errors]);

  return {
    // State
    formData,
    errors,
    isSubmitting,
    
    // Computed values
    isFormValid,
    hasErrors,
    
    // Handlers
    handleInputChange,
    handleSubmit,
    resetForm,
    validateField
  };
};
