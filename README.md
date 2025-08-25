# 🎯 ParrotEdu - Hệ Thống Quản Lý Điểm Số Thông Minh

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://react.dev/)
[![Redux](https://img.shields.io/badge/Redux-9.2.0-purple.svg)](https://redux.js.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.0-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.1.3-yellow.svg)](https://vitejs.dev/)
[![Jest](https://img.shields.io/badge/Jest-29.7.0-C21325.svg)](https://jestjs.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📖 Tổng Quan Dự Án

**ParrotEdu** là một ứng dụng web hiện đại được thiết kế để quản lý và xếp hạng điểm số học tập một cách chuyên nghiệp. Ứng dụng được xây dựng với kiến trúc React hiện đại, tích hợp Redux Toolkit để quản lý state, và sử dụng TailwindCSS để tạo giao diện responsive đẹp mắt.

### 🎯 Mục Tiêu Chính
- Cung cấp hệ thống quản lý điểm số trực quan và dễ sử dụng
- Xây dựng thuật toán xếp hạng thông minh dựa trên điểm số và thời gian
- Tạo giao diện người dùng hiện đại với trải nghiệm mượt mà
- Đảm bảo hiệu suất cao và khả năng mở rộng

## ✨ Tính Năng Nổi Bật

### 🎓 Quản Lý Điểm Số Thông Minh
- **Hệ thống nhập liệu**: Hỗ trợ điểm từ 0-100 với validation chặt chẽ
- **Ghi nhận thời gian**: Theo dõi thời gian hoàn thành bài làm (tính bằng giây)
- **Phân loại tự động**: Tự động phân loại kết quả theo 3 mức độ:
  - 🏆 **Tuyệt vời**: Điểm > 90
  - 🎉 **Chúc mừng**: Điểm 70-90
  - 💪 **Cần cố gắng**: Điểm < 70

### 🏆 Hệ Thống Xếp Hạng Nâng Cao
- **Thuật toán xếp hạng thông minh**:
  - Ưu tiên điểm số cao hơn
  - Nếu điểm bằng nhau, ưu tiên thời gian ngắn hơn
- **Giao diện Top 3 đặc biệt**:
  - Layout 3 cột với Top 1 ở giữa và cao hơn 20px
  - Hiệu ứng đặc biệt cho vị trí Champion
  - Badge phân biệt rõ ràng cho từng vị trí
- **Bảng xếp hạng đầy đủ**: Hiển thị tất cả kết quả với thống kê chi tiết

### 📊 Dashboard Thống Kê Chuyên Nghiệp
- **Thống kê tổng quan**:
  - Tổng số bài làm đã nộp
  - Điểm trung bình của hệ thống
  - Thời gian hoàn thành trung bình
  - Số lượng kết quả xuất sắc
- **Visualization**: Cards thống kê với icons và màu sắc phân biệt
- **Real-time updates**: Cập nhật dữ liệu theo thời gian thực

### 🎨 Giao Diện Người Dùng Hiện Đại
- **Responsive design**: Tương thích hoàn hảo trên mọi thiết bị
- **Sidebar navigation**: Menu điều hướng có thể thu gọn/mở rộng
- **Animations**: Hiệu ứng chuyển động mượt mà và chuyên nghiệp
- **Color scheme**: Hệ thống màu sắc nhất quán và dễ nhìn

## 🛠️ Stack Công Nghệ

### Frontend Framework
- **React 19.1.1**: Framework JavaScript hiện đại với Hooks và Suspense
- **Vite 7.1.3**: Build tool nhanh chóng với HMR và optimization
- **JSX**: Cú pháp mở rộng cho React components

### State Management
- **Redux Toolkit 9.2.0**: Quản lý state toàn cục với cấu hình tối ưu
- **React-Redux**: Tích hợp Redux với React components
- **Immer**: Xử lý immutable state updates hiệu quả

### Styling & UI Framework
- **TailwindCSS 3.4.0**: Framework CSS utility-first hiện đại
- **PostCSS**: CSS processing pipeline với autoprefixer
- **Custom Animations**: Hiệu ứng chuyển động được thiết kế riêng

### Development Tools
- **ESLint**: Code linting và quality assurance
- **Jest 29.7.0**: Framework testing JavaScript với coverage reports
- **React Testing Library**: Testing utilities cho React components

## 🚀 Kiến Trúc và Tối Ưu Hóa

### Performance Optimization
- **React.memo()**: Tránh re-render không cần thiết cho components
- **useMemo & useCallback**: Tối ưu hóa dependencies và function references
- **Lazy Loading**: Tải components theo nhu cầu với React.lazy
- **Code Splitting**: Chia nhỏ bundle để tải nhanh hơn

### State Management Optimization
- **Selector Memoization**: Sử dụng createSelector để tối ưu hóa selectors
- **Normalized State Structure**: Cấu trúc state hiệu quả và dễ quản lý
- **Batch Updates**: Gộp nhiều updates thành một để tối ưu performance

### Bundle & Memory Optimization
- **Tree Shaking**: Loại bỏ code không sử dụng trong production
- **Dynamic Imports**: Import động các components khi cần thiết
- **Memory Management**: Cleanup effects và event listeners hiệu quả

## 📁 Cấu Trúc Dự Án

```
parrotedu/
├── public/                 # Static assets và public files
├── src/
│   ├── components/         # React components
│   │   ├── forms/         # Form components (ScoreForm, DemoButton)
│   │   ├── ui/            # UI components (ScoreCard, ScoreTable, TopThreeDisplay)
│   │   └── layout/        # Layout components (Sidebar, Header)
│   ├── store/             # Redux store configuration
│   │   ├── slices/        # Redux slices (scoreSlice)
│   │   └── index.js       # Store configuration
│   ├── hooks/             # Custom React hooks (useScoreForm, useLocalStorage)
│   ├── types/             # Type definitions và constants
│   ├── utils/             # Utility functions và demo data
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles và TailwindCSS
├── package.json           # Dependencies và scripts
├── tailwind.config.js     # TailwindCSS configuration
├── postcss.config.js      # PostCSS configuration
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint configuration
└── README.md              # Project documentation
```

## 🚀 Hướng Dẫn Cài Đặt và Sử Dụng

### Yêu Cầu Hệ Thống
- **Node.js**: Phiên bản 18.0.0 trở lên
- **npm**: Phiên bản 9.0.0 trở lên
- **Modern Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Cài Đặt Dependencies
```bash
# Clone repository
git clone <repository-url>
cd parrotedu

# Cài đặt dependencies
npm install
```

### Development Mode
```bash
# Khởi chạy development server
npm run dev

# Truy cập ứng dụng tại: http://localhost:5173
```

### Production Build
```bash
# Build production version
npm run build

# Preview production build
npm run preview
```

### Testing Suite
```bash
# Chạy tất cả tests
npm test

# Chạy tests với watch mode
npm run test:watch

# Chạy tests với coverage report
npm run test:coverage

# Chạy tests trong CI environment
npm run test:ci
```

### Code Quality
```bash
# Linting và code formatting
npm run lint

# Fix auto-fixable issues
npm run lint:fix
```

## 🧪 Testing Strategy

### Testing Coverage
- **Unit Tests**: Redux actions, reducers, và utility functions
- **Component Tests**: React components với React Testing Library
- **Integration Tests**: Redux store integration và data flow
- **Coverage Goals**: 80% cho branches, functions, lines, và statements

### Test Structure
```
src/
├── __tests__/             # Test files
│   ├── components/        # Component tests
│   ├── store/            # Store tests
│   └── hooks/            # Custom hooks tests
└── setupTests.js         # Test configuration
```

## 📱 Responsive Design & UX

### Breakpoint Strategy
- **Mobile First**: Thiết kế từ mobile (320px) trước
- **Tablet**: 768px - 1024px với layout tối ưu
- **Desktop**: > 1024px với full features

### User Experience Features
- **Intuitive Navigation**: Sidebar có thể thu gọn/mở rộng
- **Visual Feedback**: Hover effects và transitions mượt mà
- **Loading States**: Skeleton loading và progress indicators
- **Error Handling**: User-friendly error messages và validation

### Accessibility
- **Semantic HTML**: Sử dụng HTML5 semantic elements
- **Keyboard Navigation**: Hỗ trợ điều hướng bằng bàn phím
- **Screen Reader Support**: ARIA labels và semantic markup
- **Color Contrast**: Đảm bảo độ tương phản màu sắc đạt chuẩn WCAG

## 🔧 Configuration & Environment

### Environment Variables
```bash
# Development
NODE_ENV=development
VITE_APP_TITLE=ParrotEdu Dev

# Production
NODE_ENV=production
VITE_APP_TITLE=ParrotEdu
```

### Build Configuration
- **Vite**: Fast development với HMR và optimized production builds
- **TailwindCSS**: Utility-first CSS framework với custom configuration
- **PostCSS**: CSS processing pipeline với autoprefixer

## 📊 Performance Metrics

### Core Web Vitals Targets
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1

### Bundle Optimization
- **Initial Bundle Size**: < 500KB (gzipped)
- **Lazy Loaded Components**: Dashboard, TopThreeDisplay
- **Tree Shaking**: Loại bỏ unused code trong production
<!-- 
## 🚀 Deployment & CI/CD

### Build Process
1. **Install Dependencies**: `npm ci --production`
2. **Run Test Suite**: `npm run test:ci`
3. **Build Production**: `npm run build`
4. **Quality Check**: `npm run lint`
5. **Deploy**: Upload dist/ folder to hosting service

### Deployment Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: Cloudflare, AWS CloudFront
- **Traditional Server**: Nginx, Apache với static file serving

### CI/CD Pipeline
```yaml
# Example GitHub Actions workflow
name: Deploy ParrotEdu
on:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test
      - run: npm run build
``` -->
