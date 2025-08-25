import React, { memo, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllScores, selectScoreStats, removeScore, clearAllScores } from '../../store/slices/scoreSlice';
import { PERFORMANCE_STATUSES } from '../../types';

/**
 * ScoreTable component for displaying ranking table
 * Memoized for performance optimization
 */
const ScoreTable = memo(() => {
  const dispatch = useDispatch();
  const scores = useSelector(selectAllScores);
  const stats = useSelector(selectScoreStats);

  /**
   * Get performance status badge for table
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
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium shadow-md ${config.color}`}>
        <span className="mr-1">{config.icon}</span>
        {config.text}
      </span>
    );
  };

  /**
   * Format timestamp to readable format
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
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full text-white font-bold text-lg animate-glow">
          🥇
        </div>
      );
    } else if (rank === 2) {
      return (
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full text-white font-bold text-lg">
          🥈
        </div>
      );
    } else if (rank === 3) {
      return (
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-amber-600 to-amber-800 rounded-full text-white font-bold text-lg">
          🥉
        </div>
      );
    } else {
      return (
        <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full text-gray-700 font-bold text-sm">
          {rank}
        </div>
      );
    }
  };

  /**
   * Handle score deletion
   * @param {string} id - Score entry ID
   */
  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa kết quả này?')) {
      dispatch(removeScore(id));
    }
  };

  /**
   * Handle clearing all scores
   */
  const handleClearAll = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tất cả kết quả? Hành động này không thể hoàn tác!')) {
      dispatch(clearAllScores());
    }
  };

  // Memoized table rows for performance
  const tableRows = useMemo(() => {
    return scores.map((entry, index) => (
      <tr 
        key={entry.id} 
        className={`border-b hover:bg-gray-50 transition-colors duration-200 ${
          index === 0 ? 'bg-yellow-50 border-yellow-200' : ''
        }`}
      >
        <td className="px-4 py-3">
          {getRankDisplay(index + 1)}
        </td>
        <td className="px-4 py-3">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{entry.score}</div>
            <div className="text-xs text-gray-500">/100</div>
          </div>
        </td>
        <td className="px-4 py-3 text-center">
          <span className="font-mono text-gray-700">{formatTime(entry.time)}</span>
        </td>
        <td className="px-4 py-3 text-center">
          {getStatusBadge(entry.status)}
        </td>
        <td className="px-4 py-3 text-center text-sm text-gray-500">
          {formatDate(entry.timestamp)}
        </td>
        <td className="px-4 py-3 text-center">
          <button
            onClick={() => handleDelete(entry.id)}
            className="text-red-600 hover:text-red-800 transition-colors duration-200"
            title="Xóa kết quả"
          >
            🗑️
          </button>
        </td>
      </tr>
    ));
  }, [scores, dispatch]);

  if (scores.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Chưa có kết quả nào
        </h3>
        <p className="text-gray-500">
          Hãy nhập kết quả đầu tiên để bắt đầu bảng xếp hạng!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center py-4">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-gray-600">Tổng số</div>
        </div>
        <div className="card text-center py-4">
          <div className="text-2xl font-bold text-green-600">{stats.averageScore}</div>
          <div className="text-sm text-gray-600">Điểm TB</div>
        </div>
        <div className="card text-center py-4">
          <div className="text-2xl font-bold text-purple-600">{stats.averageTime}s</div>
          <div className="text-sm text-gray-600">Thời gian TB</div>
        </div>
        <div className="card text-center py-4">
          <div className="text-2xl font-bold text-yellow-600">{stats.excellentCount}</div>
          <div className="text-sm text-gray-600">Tuyệt vời</div>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Bảng Xếp Hạng ({scores.length} kết quả)
          </h3>
          <button
            onClick={handleClearAll}
            className="btn-secondary text-sm"
            title="Xóa tất cả kết quả"
          >
            🗑️ Xóa tất cả
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vị trí
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Điểm
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thời gian
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableRows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

ScoreTable.displayName = 'ScoreTable';

export default ScoreTable;
