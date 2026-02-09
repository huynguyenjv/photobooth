import { useState, useCallback } from 'react';
import { useCamera } from './hooks/useCamera';
import {
  Camera,
  Countdown,
  FlashEffect,
  FilterSelector,
  PhotoPreview,
  PhotoboothLayout,
  CaptureButton,
  TemplateSelector,
  ImageUpload,
} from './components';
import { playShutterSound } from './utils/sound';
import './App.css';

const MAX_PHOTOS = 4;
const COUNTDOWN_SECONDS = 3;

function App() {
  const {
    videoRef,
    isStreaming,
    error,
    isWideAngle,
    isFullscreen,
    startCamera,
    stopCamera,
    switchCamera,
    toggleWideAngle,
    toggleFullscreen,
    captureFrame,
  } = useCamera();

  const [photos, setPhotos] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [aspectRatio, setAspectRatio] = useState('4:3');
  const [selectedLayout, setSelectedLayout] = useState('2x2');
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [showWatermark, setShowWatermark] = useState(true);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [flashTrigger, setFlashTrigger] = useState(0);
  const [mobileTab, setMobileTab] = useState('camera'); // 'camera' | 'preview'

  const handleStartCapture = useCallback(() => {
    if (photos.length >= MAX_PHOTOS || isCountdownActive) return;
    setIsCountdownActive(true);
  }, [photos.length, isCountdownActive]);

  // Direct capture for fullscreen mode (no countdown)
  const handleDirectCapture = useCallback(() => {
    if (photos.length >= MAX_PHOTOS) return;
    
    // Trigger flash effect
    setFlashTrigger((prev) => prev + 1);

    // Play shutter sound
    playShutterSound();

    // Capture the frame immediately
    const photoData = captureFrame(selectedFilter, aspectRatio);
    if (photoData) {
      setPhotos((prev) => [...prev, photoData]);
    }
  }, [photos.length, captureFrame, selectedFilter, aspectRatio]);

  const handleCountdownComplete = useCallback(() => {
    setIsCountdownActive(false);

    // Trigger flash effect
    setFlashTrigger((prev) => prev + 1);

    // Play shutter sound
    playShutterSound();

    // Capture the frame
    const photoData = captureFrame(selectedFilter, aspectRatio);
    if (photoData) {
      setPhotos((prev) => [...prev, photoData]);
    }
  }, [captureFrame, selectedFilter, aspectRatio]);

  const handleRemovePhoto = useCallback((index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleUploadPhoto = useCallback((imageData) => {
    if (photos.length < MAX_PHOTOS) {
      setPhotos((prev) => [...prev, imageData]);
    }
  }, [photos.length]);

  const handleReset = useCallback(() => {
    setPhotos([]);
  }, []);

  const handleDownload = useCallback(() => {
    console.log('Photo downloaded!');
  }, []);

  const handlePrint = useCallback(() => {
    console.log('Photo printed!');
  }, []);

  const handleExitFullscreen = useCallback(() => {
    toggleFullscreen();
  }, [toggleFullscreen]);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">
          <span className="title-icon">📸</span>
          Photobooth
        </h1>
      </header>

      {/* Mobile Tab Switcher */}
      <div className="mobile-tabs">
        <button 
          className={`mobile-tab ${mobileTab === 'camera' ? 'active' : ''}`}
          onClick={() => setMobileTab('camera')}
        >
          📷 Chụp ảnh
        </button>
        <button 
          className={`mobile-tab ${mobileTab === 'preview' ? 'active' : ''}`}
          onClick={() => setMobileTab('preview')}
        >
          🖼️ Xem ảnh {photos.length > 0 && `(${photos.length})`}
        </button>
      </div>

      <main className="app-main">
        <div className="app-grid">
          {/* Camera Panel */}
          <div className={`panel panel-camera ${mobileTab !== 'camera' ? 'mobile-hidden' : ''}`}>
            <Camera
              ref={videoRef}
              filter={selectedFilter}
              aspectRatio={aspectRatio}
              isStreaming={isStreaming}
              error={error}
              isFullscreen={isFullscreen}
              isWideAngle={isWideAngle}
              onExitFullscreen={handleExitFullscreen}
              onCapture={handleDirectCapture}
              onSwitchCamera={switchCamera}
              onToggleWide={toggleWideAngle}
              photosCount={photos.length}
              maxPhotos={MAX_PHOTOS}
            />

            {/* Quick camera controls */}
            {isStreaming && (
              <div className="quick-controls">
                <button className="quick-btn" onClick={switchCamera} title="Đổi camera">
                  🔄
                </button>
                <button 
                  className={`quick-btn ${isWideAngle ? 'active' : ''}`} 
                  onClick={toggleWideAngle}
                  title="Góc rộng"
                >
                  {isWideAngle ? '1x' : '0.5x'}
                </button>
                <button className="quick-btn" onClick={toggleFullscreen} title="Toàn màn hình">
                  ⛶
                </button>
              </div>
            )}

            <div className="capture-section">
              <CaptureButton
                onCapture={handleStartCapture}
                onStartCamera={startCamera}
                isStreaming={isStreaming}
                disabled={isCountdownActive}
                isCapturing={isCountdownActive}
                photosCount={photos.length}
                maxPhotos={MAX_PHOTOS}
              />
            </div>

            <FilterSelector
              selectedFilter={selectedFilter}
              onSelectFilter={setSelectedFilter}
              disabled={!isStreaming || isCountdownActive}
            />

            <ImageUpload
              onUpload={handleUploadPhoto}
              disabled={isCountdownActive}
              maxPhotos={MAX_PHOTOS}
              currentCount={photos.length}
            />
          </div>

          {/* Preview Panel */}
          <div className={`panel panel-preview ${mobileTab !== 'preview' ? 'mobile-hidden' : ''}`}>
            <PhotoPreview
              photos={photos}
              maxPhotos={MAX_PHOTOS}
              onRemovePhoto={handleRemovePhoto}
            />

            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onSelectTemplate={setSelectedTemplate}
            />

            <PhotoboothLayout
              photos={photos}
              layout={selectedLayout}
              onLayoutChange={setSelectedLayout}
              onDownload={handleDownload}
              onReset={handleReset}
              onPrint={handlePrint}
              showWatermark={showWatermark}
              template={selectedTemplate}
            />
          </div>
        </div>
      </main>

      {/* Overlays */}
      <Countdown
        seconds={COUNTDOWN_SECONDS}
        isActive={isCountdownActive}
        onComplete={handleCountdownComplete}
      />
      <FlashEffect trigger={flashTrigger} />
    </div>
  );
}

export default App;
