import './CaptureButton.css';

const CaptureButton = ({ 
  onCapture, 
  onStartCamera, 
  isStreaming,
  isCapturing,
  photosCount,
  maxPhotos 
}) => {
  const canCapture = isStreaming && photosCount < maxPhotos && !isCapturing;
  const isComplete = photosCount >= maxPhotos;

  if (!isStreaming) {
    return (
      <button className="start-button" onClick={onStartCamera}>
        <span className="button-icon">📷</span>
        <span className="button-text">Bắt đầu Camera</span>
      </button>
    );
  }

  return (
    <div className="capture-container">
      <button
        className={`capture-button ${isCapturing ? 'capturing' : ''} ${isComplete ? 'complete' : ''}`}
        onClick={onCapture}
        disabled={!canCapture}
      >
        <div className="capture-inner">
          {isCapturing ? (
            <div className="capture-spinner" />
          ) : isComplete ? (
            <span className="capture-check">✓</span>
          ) : (
            <span className="capture-icon" />
          )}
        </div>
      </button>
      <p className="capture-hint">
        {isComplete
          ? 'Đã chụp đủ ảnh!'
          : isCapturing
          ? 'Đang chụp...'
          : `Nhấn để chụp (${photosCount}/${maxPhotos})`}
      </p>
    </div>
  );
};

export default CaptureButton;
