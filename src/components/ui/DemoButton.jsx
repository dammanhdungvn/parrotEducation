import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { demoScores } from '../../utils/demoData';
import { addScore } from '../../store/slices/scoreSlice';

/**
 * DemoButton component for populating demo data
 * Memoized for performance optimization
 */
const DemoButton = memo(() => {
  const dispatch = useDispatch();

  /**
   * Handle populating demo data
   */
  const handlePopulateDemo = () => {
    demoScores.forEach(scoreData => {
      dispatch(addScore({
        score: scoreData.score,
        time: scoreData.time
      }));
    });
  };

  return (
    <div className="text-center mb-8">
      <button
        onClick={handlePopulateDemo}
        className="btn-secondary text-sm px-6 py-3"
        title="Thêm dữ liệu mẫu để test ứng dụng"
      >
        🎯 Thêm Dữ Liệu Mẫu
      </button>
      <p className="text-xs text-gray-500 mt-2">
        Click để thêm 6 kết quả mẫu và xem bảng xếp hạng hoạt động
      </p>
    </div>
  );
});

DemoButton.displayName = 'DemoButton';

export default DemoButton;
