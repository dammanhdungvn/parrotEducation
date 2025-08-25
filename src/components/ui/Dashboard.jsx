import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectScoreStats, selectTopThree } from '../../store/slices/scoreSlice';
import ScoreCard from './ScoreCard';

/**
 * Dashboard component with clean and professional design
 * Memoized for performance optimization
 */
const Dashboard = memo(() => {
  const stats = useSelector(selectScoreStats);
  const topThree = useSelector(selectTopThree);

  const statCards = [
    {
      title: 'Tổng Số Bài Làm',
      value: stats.total,
      icon: '📚',
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Điểm Trung Bình',
      value: stats.averageScore.toFixed(1),
      icon: '📊',
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Thời Gian TB',
      value: `${stats.averageTime.toFixed(1)}s`,
      icon: '⏱️',
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    {
      title: 'Tuyệt Vời',
      value: stats.excellentCount,
      icon: '🏆',
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-slide-up">
          🎯 Chào mừng đến với ParrotEdu
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.2s'}}>
          Hệ thống quản lý điểm số thông minh giúp bạn theo dõi và cải thiện kết quả học tập
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={stat.title}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slide-up"
            style={{animationDelay: `${0.3 + index * 0.1}s`}}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Performers Section - Clean Design */}
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
        
        {topThree.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Chưa có kết quả nào
            </h3>
            <p className="text-gray-500">
              Hãy nhập kết quả đầu tiên để bắt đầu cuộc thi!
            </p>
          </div>
        ) : (
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
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">🚀 Hành Động Nhanh</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all duration-300">
            <div className="text-4xl mb-4">📝</div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Nhập Kết Quả Mới</h4>
            <p className="text-gray-600 mb-4">Thêm điểm số và thời gian hoàn thành</p>
            <a href="#form" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Bắt đầu ngay
            </a>
          </div>
          
          <div className="text-center p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-all duration-300">
            <div className="text-4xl mb-4">🏆</div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Xem Bảng Xếp Hạng</h4>
            <p className="text-gray-600 mb-4">Kiểm tra vị trí và so sánh kết quả</p>
            <a href="#ranking" className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">
              Xem ngay
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
