import { forwardRef } from 'react';
import { getCssFilter } from '../utils/filters';
import './Camera.css';

const Camera = forwardRef(({ 
  filter, 
  aspectRatio, 
  isStreaming, 
  error, 
  isFullscreen, 
  isWideAngle, 
  onExitFullscreen,
  onCapture,
  onSwitchCamera,
  onToggleWide,
  photosCount,
  maxPhotos
}, ref) => {
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
          
          {/* Fullscreen Controls */}
          {isFullscreen && (
            <>
              {/* Top bar */}
              <div className="fullscreen-top-bar">
                <button className="fullscreen-btn-icon" onClick={onExitFullscreen}>
                  ✕
                </button>
                <div className="fullscreen-photo-count">
                  {photosCount}/{maxPhotos}
                </div>
                <button className="fullscreen-btn-icon" onClick={onSwitchCamera}>
                  🔄
                </button>
              </div>

              {/* Bottom bar */}
              <div className="fullscreen-bottom-bar">
                <button 
                  className={`fullscreen-zoom-btn ${isWideAngle ? 'active' : ''}`}
                  onClick={onToggleWide}
                >
                  {isWideAngle ? '1x' : '0.5x'}
                </button>
                
                <button 
                  className="fullscreen-capture-btn"
                  onClick={onCapture}
                  disabled={photosCount >= maxPhotos}
                >
                  <span className="capture-ring"></span>
                </button>
                
                <div className="fullscreen-spacer"></div>
              </div>
            </>
          )}
        </div>
      </div>
      {isFullscreen && <div className="fullscreen-overlay" />}
    </>
  );
});

Camera.displayName = 'Camera';

export default Camera;
