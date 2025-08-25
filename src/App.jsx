import React, { useState, Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Sidebar from './components/layout/Sidebar';
import ScoreForm from './components/forms/ScoreForm';
import ScoreTable from './components/ui/ScoreTable';
import DemoButton from './components/ui/DemoButton';

// Lazy load components for better performance
const Dashboard = lazy(() => import('./components/ui/Dashboard'));
const TopThreeDisplay = lazy(() => import('./components/ui/TopThreeDisplay'));

function App() {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarToggle = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'form':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                📝 Nhập Kết Quả Mới
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Nhập điểm số và thời gian hoàn thành bài làm của bạn
              </p>
            </div>
            <DemoButton />
            <ScoreForm />
          </div>
        );
      case 'ranking':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                📊 Bảng Xếp Hạng Đầy Đủ
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Xem tất cả kết quả và vị trí xếp hạng chi tiết
              </p>
            </div>
            <ScoreTable />
          </div>
        );
      case 'stats':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                🏆 Top 3 Xuất Sắc
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Những kết quả xuất sắc nhất trong hệ thống
              </p>
            </div>
            <Suspense fallback={
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            }>
              <TopThreeDisplay />
            </Suspense>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <Sidebar 
          currentSection={currentSection} 
          onSectionChange={setCurrentSection}
          onToggle={handleSidebarToggle}
        />
        
        {/* Main Content - Responsive margin */}
        <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <main className="p-8">
            <div className="w-full max-w-[90rem] mx-auto">
              {renderSection()}
            </div>
          </main>
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8 z-40">
          <button
            onClick={() => setCurrentSection('form')}
            className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center text-2xl animate-float"
            title="Nhập kết quả mới"
          >
            ✨
          </button>
        </div>

        {/* Page Navigation Dots */}
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30 space-y-4">
          <button
            onClick={() => setCurrentSection('dashboard')}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === 'dashboard' ? 'bg-blue-600 scale-125 shadow-lg' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            title="Dashboard"
          />
          <button
            onClick={() => setCurrentSection('form')}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === 'form' ? 'bg-blue-600 scale-125 shadow-lg' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            title="Form"
          />
          <button
            onClick={() => setCurrentSection('ranking')}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === 'ranking' ? 'bg-blue-600 scale-125 shadow-lg' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            title="Ranking"
          />
          <button
            onClick={() => setCurrentSection('stats')}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === 'stats' ? 'bg-blue-600 scale-125 shadow-lg' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            title="Stats"
          />
        </div>
      </div>
    </Provider>
  );
}

export default App;
