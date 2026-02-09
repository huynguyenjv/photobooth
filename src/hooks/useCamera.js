import { useState, useRef, useCallback, useEffect } from 'react';

export const useCamera = () => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const [facingMode, setFacingMode] = useState('user');
  const [isWideAngle, setIsWideAngle] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [availableCameras, setAvailableCameras] = useState([]);
  const isRestartingRef = useRef(false);

  // Get all available cameras
  const getCameras = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter(device => device.kind === 'videoinput');
      setAvailableCameras(cameras);
      return cameras;
    } catch (err) {
      console.error('Error getting cameras:', err);
      return [];
    }
  }, []);

  const startCamera = useCallback(async (useWide = false) => {
    try {
      // First, get available cameras
      await getCameras();

      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      };

      // Try to use zoom constraint for wide angle
      if (useWide) {
        constraints.video.zoom = { ideal: 0.5 };
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      // Try to apply zoom after getting stream (for devices that support it)
      if (useWide) {
        const videoTrack = stream.getVideoTracks()[0];
        const capabilities = videoTrack.getCapabilities?.();
        if (capabilities?.zoom && capabilities.zoom.min < 1) {
          try {
            await videoTrack.applyConstraints({
              advanced: [{ zoom: capabilities.zoom.min }]
            });
          } catch (e) {
            console.log('Zoom not supported on this device');
          }
        }
      }

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
  }, [facingMode, getCameras]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
    setIsFullscreen(false);
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
    setIsWideAngle(false); // Reset wide angle when switching camera
    
    // Restart with new facing mode if was streaming
    if (wasStreaming) {
      try {
        const constraints = {
          video: {
            facingMode: newFacingMode,
            width: { ideal: 1920 },
            height: { ideal: 1080 },
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

  const toggleWideAngle = useCallback(async () => {
    if (!streamRef.current) return;

    const videoTrack = streamRef.current.getVideoTracks()[0];
    const capabilities = videoTrack.getCapabilities?.();
    
    if (capabilities?.zoom) {
      const newIsWide = !isWideAngle;
      setIsWideAngle(newIsWide);
      
      try {
        await videoTrack.applyConstraints({
          advanced: [{ 
            zoom: newIsWide ? capabilities.zoom.min : 1 
          }]
        });
      } catch (e) {
        console.log('Zoom adjustment failed:', e);
        // Fallback: restart camera
        setIsWideAngle(false);
      }
    } else {
      // Device doesn't support zoom
      setError('Camera này không hỗ trợ góc rộng');
      setTimeout(() => setError(null), 2000);
    }
  }, [isWideAngle]);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  const captureFrame = useCallback((filter = 'none', aspectRatio = '4:3') => {
    if (!videoRef.current || !isStreaming) return null;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Full HD resolution for high quality
    const targetWidth = 1920;
    const targetHeight = aspectRatio === '1:1' ? 1920 : aspectRatio === '16:9' ? 1080 : 1440;

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    // Calculate source dimensions
    let sourceWidth = video.videoWidth;
    let sourceHeight = video.videoHeight;

    // Calculate aspect ratio crop
    const videoAspect = sourceWidth / sourceHeight;
    const targetAspect = targetWidth / targetHeight;

    let sx = 0, sy = 0, sw = sourceWidth, sh = sourceHeight;

    if (videoAspect > targetAspect) {
      // Video is wider - crop horizontally
      sw = sourceHeight * targetAspect;
      sx = (sourceWidth - sw) / 2;
    } else {
      // Video is taller - crop vertically
      sh = sourceWidth / targetAspect;
      sy = (sourceHeight - sh) / 2;
    }

    // Mirror the image for selfie camera
    if (facingMode === 'user') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    // Draw the video frame with high quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, targetWidth, targetHeight);

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
        case 'beauty': {
          const brightness = 1.05;
          const contrast = 0.95;
          for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, data[i] * brightness);
            data[i + 1] = Math.min(255, data[i + 1] * brightness);
            data[i + 2] = Math.min(255, data[i + 2] * brightness);
            data[i] = Math.min(255, Math.max(0, contrast * (data[i] - 128) + 128));
            data[i + 1] = Math.min(255, Math.max(0, contrast * (data[i + 1] - 128) + 128));
            data[i + 2] = Math.min(255, Math.max(0, contrast * (data[i + 2] - 128) + 128));
          }
          break;
        }
        default:
          break;
      }

      ctx.putImageData(imageData, 0, 0);
    }

    // Return high quality JPEG
    return canvas.toDataURL('image/jpeg', 0.95);
  }, [isStreaming, facingMode]);

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
    isWideAngle,
    isFullscreen,
    startCamera,
    stopCamera,
    switchCamera,
    toggleWideAngle,
    toggleFullscreen,
    captureFrame,
  };
};
