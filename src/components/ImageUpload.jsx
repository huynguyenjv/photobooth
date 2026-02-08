import { useRef, useCallback } from 'react';
import './ImageUpload.css';

const ImageUpload = ({ onUpload, disabled, maxPhotos, currentCount }) => {
  const inputRef = useRef(null);
  const remainingSlots = maxPhotos - currentCount;

  const handleClick = useCallback(() => {
    if (!disabled && remainingSlots > 0) {
      inputRef.current?.click();
    }
  }, [disabled, remainingSlots]);

  const processImage = useCallback((file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Create canvas to resize/process image
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Max dimensions
          const maxWidth = 1200;
          const maxHeight = 900;
          
          let { width, height } = img;
          
          // Scale down if needed
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width *= ratio;
            height *= ratio;
          }
          
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          
          resolve(canvas.toDataURL('image/jpeg', 0.9));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const handleFileChange = useCallback(async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Only process up to remaining slots
    const filesToProcess = files.slice(0, remainingSlots);
    
    const processedImages = await Promise.all(
      filesToProcess.map(file => processImage(file))
    );

    processedImages.forEach(imageData => {
      onUpload(imageData);
    });

    // Reset input
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [onUpload, processImage, remainingSlots]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled || remainingSlots <= 0) return;

    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type.startsWith('image/')
    );

    if (files.length > 0) {
      // Create a fake event for handleFileChange
      const fakeEvent = { target: { files } };
      handleFileChange(fakeEvent);
    }
  }, [disabled, remainingSlots, handleFileChange]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return (
    <div 
      className={`image-upload ${disabled ? 'disabled' : ''} ${remainingSlots <= 0 ? 'full' : ''}`}
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="image-upload-input"
      />
      
      <div className="image-upload-content">
        <span className="upload-icon">📁</span>
        <span className="upload-text">
          {remainingSlots <= 0 
            ? 'Đã đủ ảnh' 
            : `Tải ảnh lên (còn ${remainingSlots} slot)`
          }
        </span>
        <span className="upload-hint">Click hoặc kéo thả ảnh vào đây</span>
      </div>
    </div>
  );
};

export default ImageUpload;
