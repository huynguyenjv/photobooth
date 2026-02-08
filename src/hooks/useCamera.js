import { useState, useRef, useCallback, useEffect } from 'react';

export const useCamera = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const [facingMode, setFacingMode] = useState('user');
  const isRestartingRef = useRef(false);

  const startCamera = useCallback(async () => {
    try {
      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsStreaming(true);
        setError(null);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Không thể truy cập camera. Vui lòng cấp quyền truy cập camera.');
      setIsStreaming(false);
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  }, []);

  const switchCamera = useCallback(async () => {
    if (isRestartingRef.current) return;
    
    isRestartingRef.current = true;
    const wasStreaming = streamRef.current !== null;
    
    // Stop current stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    
    // Toggle facing mode
    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newFacingMode);
    
    // Restart with new facing mode if was streaming
    if (wasStreaming) {
      try {
        const constraints = {
          video: {
            facingMode: newFacingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        console.error('Error switching camera:', err);
        setError('Không thể đổi camera.');
      }
    }
    
    isRestartingRef.current = false;
  }, [facingMode]);

  const captureFrame = useCallback((filter = 'none', aspectRatio = '4:3') => {
    if (!videoRef.current || !isStreaming) return null;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Calculate dimensions based on aspect ratio
    let width, height;
    if (aspectRatio === '1:1') {
      const size = Math.min(video.videoWidth, video.videoHeight);
      width = size;
      height = size;
    } else if (aspectRatio === '4:3') {
      width = video.videoWidth;
      height = (video.videoWidth * 3) / 4;
    } else {
      width = video.videoWidth;
      height = video.videoHeight;
    }

    canvas.width = width;
    canvas.height = height;

    // Calculate crop position for center crop
    const sx = (video.videoWidth - width) / 2;
    const sy = (video.videoHeight - height) / 2;

    // Mirror the image for selfie camera
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);

    // Draw the video frame
    ctx.drawImage(video, sx, sy, width, height, 0, 0, width, height);

    // Reset transform
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Apply filters using canvas
    if (filter !== 'none') {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      switch (filter) {
        case 'grayscale':
          for (let i = 0; i < data.length; i += 4) {
            const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
            data[i] = gray;
            data[i + 1] = gray;
            data[i + 2] = gray;
          }
          break;
        case 'sepia':
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189);
            data[i + 1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168);
            data[i + 2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131);
          }
          break;
        case 'vintage':
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            data[i] = Math.min(255, r * 0.9 + 40);
            data[i + 1] = Math.min(255, g * 0.7 + 20);
            data[i + 2] = Math.min(255, b * 0.5);
          }
          break;
        case 'contrast': {
          const factor = 1.5;
          for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128));
            data[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128));
            data[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128));
          }
          break;
        }
        case 'warm':
          for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, data[i] + 30);
            data[i + 2] = Math.max(0, data[i + 2] - 20);
          }
          break;
        case 'cool':
          for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.max(0, data[i] - 20);
            data[i + 2] = Math.min(255, data[i + 2] + 30);
          }
          break;
        case 'beauty':
        case 'beauty-soft':
        case 'beauty-glow': {
          // Làm sáng và mịn da
          const brightness = filter === 'beauty-glow' ? 1.12 : filter === 'beauty-soft' ? 1.08 : 1.05;
          const contrast = filter === 'beauty-soft' ? 0.92 : 0.95;
          for (let i = 0; i < data.length; i += 4) {
            // Tăng sáng
            data[i] = Math.min(255, data[i] * brightness);
            data[i + 1] = Math.min(255, data[i + 1] * brightness);
            data[i + 2] = Math.min(255, data[i + 2] * brightness);
            // Giảm contrast để mịn hơn
            data[i] = Math.min(255, Math.max(0, contrast * (data[i] - 128) + 128));
            data[i + 1] = Math.min(255, Math.max(0, contrast * (data[i + 1] - 128) + 128));
            data[i + 2] = Math.min(255, Math.max(0, contrast * (data[i + 2] - 128) + 128));
            // Tăng đỏ/hồng nhẹ cho da
            data[i] = Math.min(255, data[i] + 5);
          }
          break;
        }
        case 'pink':
          for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, data[i] * 1.1 + 15);
            data[i + 1] = Math.min(255, data[i + 1] * 0.95);
            data[i + 2] = Math.min(255, data[i + 2] * 1.05 + 10);
          }
          break;
        case 'vivid': {
          const satFactor = 1.4;
          for (let i = 0; i < data.length; i += 4) {
            const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
            data[i] = Math.min(255, Math.max(0, gray + satFactor * (data[i] - gray)));
            data[i + 1] = Math.min(255, Math.max(0, gray + satFactor * (data[i + 1] - gray)));
            data[i + 2] = Math.min(255, Math.max(0, gray + satFactor * (data[i + 2] - gray)));
          }
          break;
        }
        case 'fade':
          for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, data[i] * 0.9 + 25);
            data[i + 1] = Math.min(255, data[i + 1] * 0.9 + 25);
            data[i + 2] = Math.min(255, data[i + 2] * 0.9 + 25);
          }
          break;
        default:
          break;
      }

      ctx.putImageData(imageData, 0, 0);
    }

    return canvas.toDataURL('image/png');
  }, [isStreaming]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return {
    videoRef,
    isStreaming,
    error,
    facingMode,
    startCamera,
    stopCamera,
    switchCamera,
    captureFrame,
  };
};
