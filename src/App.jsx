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
  ControlPanel,
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
    zoomLevel,
    isFullscreen,
    startCamera,
    stopCamera,
    switchCamera,
    toggleZoom,
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

  const handleStartCapture = useCallback(() => {
    if (photos.length >= MAX_PHOTOS || isCountdownActive) return;
    setIsCountdownActive(true);
  }, [photos.length, isCountdownActive]);

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
        <p className="app-subtitle">Chụp ảnh kỷ niệm của bạn</p>
      </header>

      <main className="app-main">
        <div className="app-grid">
          {/* Left Panel - Camera & Controls */}
          <div className="panel panel-camera">
            <Camera
              ref={videoRef}
              filter={selectedFilter}
              aspectRatio={aspectRatio}
              isStreaming={isStreaming}
              error={error}
              isFullscreen={isFullscreen}
              zoomLevel={zoomLevel}
              onExitFullscreen={handleExitFullscreen}
            />

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

            <ControlPanel
              aspectRatio={aspectRatio}
              onAspectRatioChange={setAspectRatio}
              showWatermark={showWatermark}
              onWatermarkChange={setShowWatermark}
              onSwitchCamera={switchCamera}
              isStreaming={isStreaming}
              onStopCamera={stopCamera}
              zoomLevel={zoomLevel}
              onToggleZoom={toggleZoom}
              onToggleFullscreen={toggleFullscreen}
            />

            <ImageUpload
              onUpload={handleUploadPhoto}
              disabled={isCountdownActive}
              maxPhotos={MAX_PHOTOS}
              currentCount={photos.length}
            />
          </div>

          {/* Right Panel - Preview & Layout */}
          <div className="panel panel-preview">
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

      <footer className="app-footer">
        <p>
          Made with ❤️ using React • Không cần backend • Chạy hoàn toàn trên trình duyệt
        </p>
      </footer>

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
