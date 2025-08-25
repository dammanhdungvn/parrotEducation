import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectTopThree } from '../../store/slices/scoreSlice';
import { PERFORMANCE_STATUSES } from '../../types';

/**
 * ScoreCard component for displaying individual score entries
 * Memoized for performance optimization
 */
const ScoreCard = memo(({ entry, rank, isTopOne = false }) => {
  /**
   * Get performance status badge
   * @param {string} status - Performance status
   * @returns {JSX.Element} Status badge
   */
  const getStatusBadge = (status) => {
    const badgeConfig = {
      [PERFORMANCE_STATUSES.EXCELLENT]: {
        color: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white',
        text: 'Tuyệt vời',
        icon: '🏆'
      },
      [PERFORMANCE_STATUSES.GOOD]: {
        color: 'bg-gradient-to-r from-yellow-500 to-orange-600 text-white',
        text: 'Chúc mừng',
        icon: '🎉'
      },
      [PERFORMANCE_STATUSES.NEEDS_IMPROVEMENT]: {
        color: 'bg-gradient-to-r from-red-500 to-pink-600 text-white',
        text: 'Cần cố gắng',
        icon: '💪'
      }
    };

    const config = badgeConfig[status] || badgeConfig[PERFORMANCE_STATUSES.NEEDS_IMPROVEMENT];

    return (
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-lg ${config.color}`}>
        <span className="mr-1">{config.icon}</span>
        {config.text}
      </div>
    );
  };

  /**
   * Format timestamp to readable date
   * @param {string} timestamp - ISO timestamp
   * @returns {string} Formatted date
   */
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  /**
   * Format time in seconds to readable format
   * @param {number} time - Time in seconds
   * @returns {string} Formatted time
   */
  const formatTime = (time) => {
    if (time < 60) {
      return `${time}s`;
    } else if (time < 3600) {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes}m ${seconds}s`;
    } else {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      return `${hours}h ${minutes}m`;
    }
  };

  /**
   * Get rank display with special styling
   * @param {number} rank - Position rank
   * @returns {JSX.Element} Rank display
   */
  const getRankDisplay = (rank) => {
    if (rank === 1) {
      return (
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full text-white font-bold text-xl animate-glow">
          🥇
        </div>
      );
    } else if (rank === 2) {
      return (
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full text-white font-bold text-xl">
          🥈
        </div>
      );
    } else if (rank === 3) {
      return (
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full text-white font-bold text-xl">
          🥉
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full text-gray-700 font-bold text-lg">
          {rank}
        </div>
      );
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl ${
      isTopOne 
        ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-white' 
        : 'border-gray-100 hover:border-blue-200'
    }`} style={{ minHeight: '280px' }}>
      {/* Header with rank and status */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {getRankDisplay(rank)}
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                Vị trí {rank}
              </h3>
            </div>
          </div>
          {getStatusBadge(entry.status)}
        </div>
      </div>

      {/* Score and Time */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {entry.score}
            </div>
            <div className="text-sm text-blue-700 font-medium">Điểm</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {formatTime(entry.time)}
            </div>
            <div className="text-sm text-green-700 font-medium">Thời gian</div>
          </div>
        </div>
      </div>

      {/* Timestamp */}
      <div className="px-6 pb-6">
        <div className="text-center text-sm text-gray-500 border-t border-gray-100 pt-4">
          <span className="mr-2">📅</span>
          {formatDate(entry.timestamp)}
        </div>
      </div>
    </div>
  );
});

ScoreCard.displayName = 'ScoreCard';

export default ScoreCard;
