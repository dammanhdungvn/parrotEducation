import React, { memo, useState } from 'react';

/**
 * Sidebar component with collapsible functionality
 * Memoized for performance optimization
 */
const Sidebar = memo(({ currentSection, onSectionChange, onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    onToggle?.(newCollapsedState);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', active: currentSection === 'dashboard' },
    { id: 'form', label: 'Nhập Điểm', icon: '📝', active: currentSection === 'form' },
    { id: 'ranking', label: 'Bảng Xếp Hạng', icon: '🏆', active: currentSection === 'ranking' },
    { id: 'stats', label: 'Thống Kê', icon: '📈', active: currentSection === 'stats' }
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-white shadow-xl border-r border-gray-200 transition-all duration-300 z-50 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg font-bold">🎯</span>
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold text-gray-900">ParrotEdu</h1>
              <p className="text-xs text-gray-500">Hệ thống điểm số</p>
            </div>
          )}
        </div>
        <button
          onClick={handleToggle}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          title={isCollapsed ? "Mở rộng" : "Thu gọn"}
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group hover:bg-blue-50 hover:text-blue-700 ${
              item.active ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600' : 'text-gray-700'
            }`}
          >
            <span className={`text-xl group-hover:scale-110 transition-transform duration-200 ${item.active ? 'animate-bounce' : ''}`}>
              {item.icon}
            </span>
            {!isCollapsed && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">© 2024 ParrotEdu</p>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
