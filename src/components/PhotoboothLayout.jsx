import { useRef, useEffect, useState } from 'react';
import { LAYOUTS } from '../utils/filters';
import './PhotoboothLayout.css';

const PhotoboothLayout = ({
  photos,
  layout,
  onLayoutChange,
  onDownload,
  onReset,
  onPrint,
  showWatermark,
}) => {
  const canvasRef = useRef(null);
  const [finalImage, setFinalImage] = useState(null);

  const currentLayout = LAYOUTS.find((l) => l.id === layout) || LAYOUTS[0];
  const requiredPhotos = currentLayout.count;
  const isComplete = photos.length >= requiredPhotos;

  useEffect(() => {
    if (!isComplete || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Layout settings
    const padding = 20;
    const gap = 10;
    const photoWidth = 300;
    const photoHeight = 225; // 4:3 ratio
    const borderRadius = 12;

    const { cols, rows } = currentLayout;

    const canvasWidth = padding * 2 + cols * photoWidth + (cols - 1) * gap;
    const canvasHeight = padding * 2 + rows * photoHeight + (rows - 1) * gap + (showWatermark ? 40 : 0);

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Background with gradient
    const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Add decorative border
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.strokeRect(5, 5, canvasWidth - 10, canvasHeight - 10);

    // Helper function for rounded rect
    const roundRect = (x, y, w, h, r) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    };

    // Load and draw images
    const loadImages = async () => {
      const images = await Promise.all(
        photos.slice(0, requiredPhotos).map((src) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
            img.src = src;
          });
        })
      );

      images.forEach((img, index) => {
        if (!img) return;

        const col = index % cols;
        const row = Math.floor(index / cols);
        const x = padding + col * (photoWidth + gap);
        const y = padding + row * (photoHeight + gap);

        // Draw shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        // Draw white border
        ctx.fillStyle = '#fff';
        roundRect(x - 4, y - 4, photoWidth + 8, photoHeight + 8, borderRadius + 2);
        ctx.fill();

        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Clip and draw image
        ctx.save();
        roundRect(x, y, photoWidth, photoHeight, borderRadius);
        ctx.clip();
        ctx.drawImage(img, x, y, photoWidth, photoHeight);
        ctx.restore();
      });

      // Add watermark if enabled
      if (showWatermark) {
        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.textAlign = 'center';
        ctx.fillText('📷 Photobooth', canvasWidth / 2, canvasHeight - 15);

        // Add date
        const date = new Date().toLocaleDateString('vi-VN');
        ctx.font = '12px Arial';
        ctx.fillText(date, canvasWidth / 2, canvasHeight - 35);
      }

      setFinalImage(canvas.toDataURL('image/png'));
    };

    loadImages();
  }, [photos, layout, isComplete, showWatermark, currentLayout, requiredPhotos]);

  const handleDownload = () => {
    if (!finalImage) return;
    const link = document.createElement('a');
    link.download = `photobooth_${Date.now()}.png`;
    link.href = finalImage;
    link.click();
    onDownload?.();
  };

  const handlePrint = () => {
    if (!finalImage) return;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Photobooth</title>
          <style>
            body {
              margin: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background: #f0f0f0;
            }
            img {
              max-width: 100%;
              height: auto;
              box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            }
            @media print {
              body { background: white; }
              img { box-shadow: none; }
            }
          </style>
        </head>
        <body>
          <img src="${finalImage}" />
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 500);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
    onPrint?.();
  };

  if (photos.length === 0) {
    return (
      <div className="photobooth-layout">
        <div className="layout-empty">
          <span className="empty-icon">🖼️</span>
          <p>Chụp ảnh để xem kết quả</p>
        </div>
      </div>
    );
  }

  return (
    <div className="photobooth-layout">
      <div className="layout-header">
        <h3>🎞️ Khung ảnh Photobooth</h3>
        <div className="layout-selector">
          {LAYOUTS.map((l) => (
            <button
              key={l.id}
              className={`layout-option ${layout === l.id ? 'active' : ''}`}
              onClick={() => onLayoutChange(l.id)}
              disabled={photos.length < l.count}
              title={photos.length < l.count ? `Cần ${l.count} ảnh` : l.name}
            >
              {l.name}
            </button>
          ))}
        </div>
      </div>

      <div className="layout-preview">
        <canvas ref={canvasRef} className="layout-canvas" />
        {!isComplete && (
          <div className="layout-overlay">
            <p>
              Cần {requiredPhotos - photos.length} ảnh nữa cho layout này
            </p>
          </div>
        )}
      </div>

      {isComplete && (
        <div className="layout-actions">
          <button className="action-button download" onClick={handleDownload}>
            <span>💾</span> Tải xuống
          </button>
          <button className="action-button print" onClick={handlePrint}>
            <span>🖨️</span> In ảnh
          </button>
          <button className="action-button reset" onClick={onReset}>
            <span>🔄</span> Chụp lại
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotoboothLayout;
