import { forwardRef } from 'react';
import { getCssFilter } from '../utils/filters';
import './Camera.css';

const Camera = forwardRef(({ filter, aspectRatio, isStreaming, error, isFullscreen, zoomLevel, onExitFullscreen }, ref) => {
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

  const getZoomStyle = () => {
    // 0.5x zoom means we zoom out to show more (simulate ultra-wide)
    if (zoomLevel === 0.5) {
      return { transform: 'scaleX(-1) scale(0.85)', transformOrigin: 'center center' };
    }
    return { transform: 'scaleX(-1)' };
  };

  return (
    <>
      <div className={`camera-container ${isFullscreen ? 'camera-fullscreen' : ''}`}>
        <div 
          className="camera-wrapper" 
          style={isFullscreen ? {} : getAspectRatioStyle()}
        >
          <video
            ref={ref}
            className="camera-video"
            autoPlay
            playsInline
            muted
            style={{ 
              filter: getCssFilter(filter),
              ...getZoomStyle()
            }}
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
          {isFullscreen && (
            <button className="fullscreen-close-btn" onClick={onExitFullscreen}>
              ✕
            </button>
          )}
          {isFullscreen && zoomLevel === 0.5 && (
            <div className="zoom-indicator">0.5x</div>
          )}
        </div>
      </div>
      {isFullscreen && <div className="fullscreen-overlay" onClick={onExitFullscreen} />}
    </>
  );
});

Camera.displayName = 'Camera';

export default Camera;
