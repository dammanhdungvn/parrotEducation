import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectTopThree } from '../../store/slices/scoreSlice';
import ScoreCard from './ScoreCard';

/**
 * TopThreeDisplay component for showing top 3 scores
 * Memoized for performance optimization
 */
const TopThreeDisplay = memo(() => {
  const topThree = useSelector(selectTopThree);

  if (topThree.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="text-6xl mb-4">🏆</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Chưa có kết quả nào
        </h3>
        <p className="text-gray-500">
          Hãy nhập kết quả đầu tiên để bắt đầu cuộc thi!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-full mb-4 shadow-lg">
          <span className="text-3xl">🏆</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Top 3 Xuất Sắc
        </h2>
        <p className="text-lg text-gray-600">
          Những kết quả tốt nhất trong hệ thống
        </p>
      </div>
      
      <div className="space-y-6">
        {/* Top 3 - All in one row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {/* 2nd Place */}
          <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="bg-gradient-to-r from-gray-50 to-slate-100 border-2 border-gray-200 rounded-xl p-6">
              <div className="text-center mb-4">
                <div className="inline-block bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-2">
                  🥈 2nd Place
                </div>
              </div>
              <ScoreCard 
                entry={topThree[1]} 
                rank={2} 
                isTopOne={false}
              />
            </div>
          </div>

          {/* 1st Place - Elevated */}
          <div className="animate-slide-up transform -translate-y-5" style={{animationDelay: '0.1s'}}>
            <div className="relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  🎊 CHAMPION! 🎊
                </div>
              </div>
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-6">
                <ScoreCard 
                  entry={topThree[0]} 
                  rank={1} 
                  isTopOne={true}
                />
              </div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="animate-slide-up" style={{animationDelay: '0.3s'}}>
            <div className="bg-gradient-to-r from-amber-50 to-orange-100 border-2 border-amber-200 rounded-xl p-6">
              <div className="text-center mb-4">
                <div className="inline-block bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold mb-2">
                  🥉 3rd Place
                </div>
              </div>
              <ScoreCard 
                entry={topThree[2]} 
                rank={3} 
                isTopOne={false}
              />
            </div>
          </div>
        </div>

        {/* Achievement Summary */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Thành Tích Nổi Bật</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {topThree[0]?.score || 0}
              </div>
              <div className="text-sm text-blue-700">Điểm Cao Nhất</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {topThree[0]?.time || 0}s
              </div>
              <div className="text-sm text-green-700">Thời Gian Nhanh Nhất</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {topThree.filter(entry => entry.status === 'excellent').length}
              </div>
              <div className="text-sm text-purple-700">Xuất Sắc</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

TopThreeDisplay.displayName = 'TopThreeDisplay';

export default TopThreeDisplay;
