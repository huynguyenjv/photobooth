import { forwardRef } from 'react';
import { getCssFilter } from '../utils/filters';
import './Camera.css';

const Camera = forwardRef(({ filter, aspectRatio, isStreaming, error }, ref) => {
  const getAspectRatioStyle = () => {
    switch (aspectRatio) {
      case '1:1':
        return { aspectRatio: '1 / 1' };
      case '16:9':
        return { aspectRatio: '16 / 9' };
      case '4:3':
      default:
        return { aspectRatio: '4 / 3' };
    }
  };

  return (
    <div className="camera-container">
      <div className="camera-wrapper" style={getAspectRatioStyle()}>
        <video
          ref={ref}
          className="camera-video"
          autoPlay
          playsInline
          muted
          style={{ filter: getCssFilter(filter) }}
        />
        {!isStreaming && !error && (
          <div className="camera-placeholder">
            <div className="camera-icon">📷</div>
            <p>Nhấn "Bắt đầu" để mở camera</p>
          </div>
        )}
        {error && (
          <div className="camera-error">
            <div className="error-icon">⚠️</div>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
});

Camera.displayName = 'Camera';

export default Camera;
