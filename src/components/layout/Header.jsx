import React, { memo } from 'react';

/**
 * Header component with navigation and branding
 * Memoized for performance optimization
 */
const Header = memo(() => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">🎯</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ParrotEdu</h1>
              <p className="text-sm text-gray-500">Hệ thống quản lý điểm số</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a 
              href="#form" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              📝 Nhập điểm
            </a>
            <a 
              href="#ranking" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              🏆 Bảng xếp hạng
            </a>
            <a 
              href="#stats" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              📊 Thống kê
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
                          <button className="text-gray-700 hover:text-blue-600 p-2 rounded-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
