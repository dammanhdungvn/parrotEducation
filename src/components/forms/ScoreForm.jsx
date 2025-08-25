import React, { memo } from 'react';
import { useScoreForm } from '../../hooks/useScoreForm';
import { PERFORMANCE_STATUSES } from '../../types';

/**
 * ScoreForm component for inputting score and time
 * Memoized for performance optimization
 */
const ScoreForm = memo(() => {
  const {
    formData,
    errors,
    isSubmitting,
    isFormValid,
    handleInputChange,
    handleSubmit,
    resetForm
  } = useScoreForm();

  /**
   * Get performance status badge based on score
   * @param {number} score - Score value
   * @returns {JSX.Element} Status badge
   */
  const getPerformanceBadge = (score) => {
    if (!score || score === '') return null;
    
    const numScore = Number(score);
    let status, color, text, icon;
    
    if (numScore > 90) {
      status = PERFORMANCE_STATUSES.EXCELLENT;
      color = 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-400';
      text = 'Tuyệt vời';
      icon = '🏆';
    } else if (numScore >= 70) {
      status = PERFORMANCE_STATUSES.GOOD;
      color = 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white border-yellow-400';
      text = 'Chúc mừng';
      icon = '🎉';
    } else {
      status = PERFORMANCE_STATUSES.NEEDS_IMPROVEMENT;
      color = 'bg-gradient-to-r from-red-500 to-pink-600 text-white border-red-400';
      text = 'Cần cố gắng hơn';
      icon = '💪';
    }
    
    return (
      <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold border shadow-lg animate-bounce-in ${color}`}>
        <span className="mr-2">{icon}</span>
        {text}
      </div>
    );
  };

  /**
   * Handle form submission with validation
   * @param {Event} e - Form submit event
   */
  const onSubmit = async (e) => {
    e.preventDefault();
    const success = await handleSubmit();
    
    if (success) {
      // Show success feedback
      const submitButton = e.target.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.classList.add('bg-green-600');
        setTimeout(() => {
          submitButton.classList.remove('bg-green-600');
        }, 1000);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-8 py-6 text-white text-center">
          <h2 className="text-3xl font-bold mb-2">📝 Nhập Kết Quả Mới</h2>
          <p className="text-blue-100">
            Nhập điểm số và thời gian hoàn thành để cập nhật bảng xếp hạng
          </p>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Score Input */}
            <div className="group">
              <label htmlFor="score" className="block text-sm font-semibold text-gray-700 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                Điểm <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="score"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.score}
                  onChange={(e) => handleInputChange('score', e.target.value)}
                  className={`w-full px-4 py-3 text-lg border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 ${
                    errors.score ? 'border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500'
                  }`}
                  placeholder="0-100"
                  disabled={isSubmitting}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <span className="text-gray-400 text-sm font-medium">/100</span>
                </div>
              </div>
              {errors.score && (
                <p className="mt-2 text-sm text-red-600 flex items-center animate-shake">
                  <span className="mr-2">⚠️</span>
                  {errors.score}
                </p>
              )}
              {formData.score && !errors.score && (
                <div className="mt-3 animate-fade-in">
                  {getPerformanceBadge(formData.score)}
                </div>
              )}
            </div>

            {/* Time Input */}
            <div className="group">
              <label htmlFor="time" className="block text-sm font-semibold text-gray-700 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                Thời gian (giây) <span className="text-red-500">*</span>
              </label>
              <input
                id="time"
                type="number"
                min="0"
                step="0.1"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className={`w-full px-4 py-3 text-lg border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 ${
                  errors.time ? 'border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500'
                }`}
                placeholder="0"
                disabled={isSubmitting}
              />
              {errors.time && (
                <p className="mt-2 text-sm text-red-600 flex items-center animate-shake">
                  <span className="mr-2">⚠️</span>
                  {errors.time}
                </p>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex space-x-4 pt-6">
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-100 ${
                  !isFormValid || isSubmitting ? 'opacity-50 cursor-not-allowed transform-none' : ''
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang xử lý...
                  </span>
                ) : (
                  '🚀 Lưu Kết Quả'
                )}
              </button>
              
              <button
                type="button"
                onClick={resetForm}
                disabled={isSubmitting}
                className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-100"
              >
                🔄 Làm lại
              </button>
            </div>
          </form>

          {/* Form Tips */}
          <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl border border-blue-200">
            <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
              <span className="mr-2">💡</span>
              Mẹo và Hướng Dẫn
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="text-sm text-blue-700 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Điểm từ 0-100, có thể nhập số thập phân
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Thời gian tính bằng giây
                </li>
              </ul>
              <ul className="text-sm text-blue-700 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Điểm &gt; 90: Tuyệt vời
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                  Điểm 70-90: Chúc mừng
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                  Điểm &lt; 70: Cần cố gắng hơn
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ScoreForm.displayName = 'ScoreForm';

export default ScoreForm;
