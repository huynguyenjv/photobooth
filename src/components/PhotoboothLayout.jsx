import { useRef, useEffect, useState } from 'react';
import { LAYOUTS } from '../utils/filters';
import { getTemplateById } from '../utils/templates';
import './PhotoboothLayout.css';

const PhotoboothLayout = ({
  photos,
  layout,
  onLayoutChange,
  onDownload,
  onReset,
  onPrint,
  showWatermark,
  template = 'classic',
}) => {
  const canvasRef = useRef(null);
  const [finalImage, setFinalImage] = useState(null);

  const currentLayout = LAYOUTS.find((l) => l.id === layout) || LAYOUTS[0];
  const currentTemplate = getTemplateById(template);
  const requiredPhotos = currentLayout.count;
  const isComplete = photos.length >= requiredPhotos;

  useEffect(() => {
    if (!isComplete || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Layout settings - PRO design với khoảng cách rộng hơn
    const frameBorderWidth = currentTemplate.frame?.width || 12;
    const photoGap = currentTemplate.photoGap || 20; // Khoảng cách giữa các ảnh
    const innerPadding = currentTemplate.innerPadding || 25; // Padding bên trong
    const photoWidth = 300;
    const photoHeight = 225; // 4:3 ratio
    const borderRadius = currentTemplate.border?.radius || 8;
    const headerHeight = currentTemplate.header?.height || 0;
    const footerHeight = showWatermark ? (currentTemplate.footer?.height || 80) : 40;

    const { cols, rows } = currentLayout;

    // Tính toán canvas size
    const contentWidth = cols * photoWidth + (cols - 1) * photoGap;
    const contentHeight = rows * photoHeight + (rows - 1) * photoGap;
    const canvasWidth = frameBorderWidth * 2 + innerPadding * 2 + contentWidth;
    const canvasHeight = frameBorderWidth * 2 + headerHeight + innerPadding * 2 + contentHeight + footerHeight;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // ============ HELPER FUNCTIONS ============
    
    // Rounded rect helper
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

    // Draw checkered pattern (như mẫu)
    const drawCheckeredPattern = (x, y, width, height, color1, color2, squareSize = 12) => {
      const cols = Math.ceil(width / squareSize);
      const rows = Math.ceil(height / squareSize);
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          ctx.fillStyle = (row + col) % 2 === 0 ? color1 : color2;
          ctx.fillRect(x + col * squareSize, y + row * squareSize, squareSize, squareSize);
        }
      }
    };

    // Draw hearts pattern
    const drawHeartsPattern = (x, y, width, height, color, size = 8, spacing = 30) => {
      ctx.fillStyle = color;
      ctx.font = `${size}px Arial`;
      for (let py = y + spacing / 2; py < y + height; py += spacing) {
        for (let px = x + spacing / 2; px < x + width; px += spacing) {
          ctx.fillText('♥', px, py);
        }
      }
    };

    // Draw dots pattern
    const drawDotsPattern = (x, y, width, height, color, radius = 3, spacing = 20) => {
      ctx.fillStyle = color;
      for (let py = y + spacing / 2; py < y + height; py += spacing) {
        for (let px = x + spacing / 2; px < x + width; px += spacing) {
          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    // Draw stripes pattern
    const drawStripesPattern = (x, y, width, height, color1, color2, stripeWidth = 8) => {
      const totalStripes = Math.ceil((width + height) / stripeWidth) * 2;
      for (let i = 0; i < totalStripes; i++) {
        ctx.fillStyle = i % 2 === 0 ? color1 : color2;
        ctx.beginPath();
        const offset = i * stripeWidth - height;
        ctx.moveTo(x + offset, y);
        ctx.lineTo(x + offset + stripeWidth, y);
        ctx.lineTo(x + offset + stripeWidth + height, y + height);
        ctx.lineTo(x + offset + height, y + height);
        ctx.closePath();
        ctx.fill();
      }
    };

    // ============ DRAW MAIN FRAME BORDER ============
    ctx.fillStyle = currentTemplate.frame?.color || '#000000';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // ============ DRAW HEADER (optional checkered/pattern) ============
    if (currentTemplate.header && headerHeight > 0) {
      const headerY = frameBorderWidth;
      if (currentTemplate.header.pattern === 'checkered') {
        drawCheckeredPattern(
          frameBorderWidth, headerY,
          canvasWidth - frameBorderWidth * 2, headerHeight,
          currentTemplate.header.colors?.[0] || '#000',
          currentTemplate.header.colors?.[1] || '#fff',
          currentTemplate.header.squareSize || 12
        );
      } else if (currentTemplate.header.pattern === 'stripes') {
        drawStripesPattern(
          frameBorderWidth, headerY,
          canvasWidth - frameBorderWidth * 2, headerHeight,
          currentTemplate.header.colors?.[0] || '#000',
          currentTemplate.header.colors?.[1] || '#fff'
        );
      }
    }

    // ============ DRAW INNER BACKGROUND ============
    const innerX = frameBorderWidth;
    const innerY = frameBorderWidth + headerHeight;
    const innerW = canvasWidth - frameBorderWidth * 2;
    const innerH = canvasHeight - frameBorderWidth * 2 - headerHeight;

    // Background color/gradient
    if (currentTemplate.background.type === 'gradient') {
      const gradient = ctx.createLinearGradient(innerX, innerY, innerX, innerY + innerH);
      gradient.addColorStop(0, currentTemplate.background.colors[0]);
      gradient.addColorStop(1, currentTemplate.background.colors[1]);
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = currentTemplate.background.colors[0];
    }
    ctx.fillRect(innerX, innerY, innerW, innerH);

    // ============ DRAW BACKGROUND PATTERN ============
    if (currentTemplate.background.pattern) {
      const patternColor = currentTemplate.background.patternColor || 'rgba(0,0,0,0.1)';
      switch (currentTemplate.background.pattern) {
        case 'hearts':
          drawHeartsPattern(innerX, innerY, innerW, innerH, patternColor, 10, 35);
          break;
        case 'dots':
          drawDotsPattern(innerX, innerY, innerW, innerH, patternColor, 4, 25);
          break;
        case 'checkered':
          drawCheckeredPattern(innerX, innerY, innerW, innerH, 
            currentTemplate.background.colors[0],
            currentTemplate.background.patternColor || '#ffffff22',
            20);
          break;
        default:
          break;
      }
    }

    // ============ DRAW DECORATIONS (stickers, images) ============
    const drawDecorations = async () => {
      if (!currentTemplate.decorations) return;
      
      for (const dec of currentTemplate.decorations) {
        // Handle image decorations (like beer cans)
        if (dec.type === 'image' && dec.src) {
          try {
            const img = await new Promise((resolve, reject) => {
              const image = new Image();
              image.onload = () => resolve(image);
              image.onerror = reject;
              image.src = dec.src;
            });
            
            const size = dec.size || 50;
            let x, y;
            const margin = size / 2;
            
            switch (dec.position) {
              case 'top-left':
                x = margin - 10;
                y = margin - 10;
                break;
              case 'top-right':
                x = canvasWidth - margin + 10;
                y = margin - 10;
                break;
              case 'bottom-left':
                x = margin - 10;
                y = canvasHeight - margin + 10;
                break;
              case 'bottom-right':
                x = canvasWidth - margin + 10;
                y = canvasHeight - margin + 10;
                break;
              default:
                x = dec.x ?? canvasWidth / 2;
                y = dec.y ?? canvasHeight / 2;
            }
            
            ctx.save();
            ctx.translate(x, y);
            if (dec.rotate) {
              ctx.rotate((dec.rotate * Math.PI) / 180);
            }
            
            // Draw shadow
            ctx.shadowColor = 'rgba(0,0,0,0.3)';
            ctx.shadowBlur = 8;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            
            // Calculate aspect ratio
            const aspectRatio = img.width / img.height;
            const drawW = size;
            const drawH = size / aspectRatio;
            
            ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
            ctx.restore();
          } catch (e) {
            console.warn('Failed to load decoration image:', dec.src);
          }
        }
        
        if (dec.type === 'emoji' || dec.type === 'sticker') {
          const fontSize = dec.size || 40;
          ctx.font = `${fontSize}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          let x, y;
          const margin = fontSize / 2 + 10;
          
          switch (dec.position) {
            case 'top-left':
              x = frameBorderWidth + margin;
              y = frameBorderWidth + headerHeight + margin;
              break;
            case 'top-right':
              x = canvasWidth - frameBorderWidth - margin;
              y = frameBorderWidth + headerHeight + margin;
              break;
            case 'bottom-left':
              x = frameBorderWidth + margin;
              y = canvasHeight - footerHeight - margin;
              break;
            case 'bottom-right':
              x = canvasWidth - frameBorderWidth - margin;
              y = canvasHeight - footerHeight - margin;
              break;
            case 'left-center':
              x = frameBorderWidth + margin;
              y = canvasHeight / 2;
              break;
            case 'right-center':
              x = canvasWidth - frameBorderWidth - margin;
              y = canvasHeight / 2;
              break;
            default:
              if (dec.x !== undefined && dec.y !== undefined) {
                x = dec.x;
                y = dec.y;
              } else {
                return;
              }
          }
          
          // Draw shadow for stickers
          if (dec.shadow !== false) {
            ctx.shadowColor = 'rgba(0,0,0,0.3)';
            ctx.shadowBlur = 8;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
          }
          
          ctx.fillText(dec.content, x, y);
          
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
        }
        
        // Text decoration (like "LOVE")
        if (dec.type === 'text') {
          ctx.save();
          ctx.font = `bold ${dec.size || 32}px ${dec.font || 'Arial'}`;
          ctx.fillStyle = dec.color || '#333';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          let x = canvasWidth / 2;
          let y = canvasHeight - footerHeight / 2;
          
          if (dec.position === 'bottom-left') {
            x = frameBorderWidth + 60;
          } else if (dec.position === 'bottom-right') {
            x = canvasWidth - frameBorderWidth - 60;
          }
          
          // Outline effect
          if (dec.outline) {
            ctx.strokeStyle = dec.outlineColor || '#000';
            ctx.lineWidth = dec.outlineWidth || 3;
            ctx.strokeText(dec.text, x, y);
          }
          
          ctx.fillText(dec.text, x, y);
          ctx.restore();
        }
      }
    };

    // ============ DRAW LOGO IMAGE ============
    const drawLogo = async () => {
      if (!currentTemplate.logoImage) return;
      
      try {
        const logo = await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = currentTemplate.logoImage;
        });
        
        // Draw logo in footer center
        const footerY = canvasHeight - footerHeight;
        const logoScale = currentTemplate.logoSize || 1;
        const logoMaxHeight = (footerHeight - frameBorderWidth - 20) * logoScale;
        const logoMaxWidth = innerW * 0.7;
        
        // Calculate size maintaining aspect ratio
        const aspectRatio = logo.width / logo.height;
        let logoH = Math.min(logoMaxHeight, logo.height * logoScale);
        let logoW = logoH * aspectRatio;
        
        if (logoW > logoMaxWidth) {
          logoW = logoMaxWidth;
          logoH = logoW / aspectRatio;
        }
        
        const logoX = (canvasWidth - logoW) / 2;
        const logoY = footerY + (footerHeight - frameBorderWidth - logoH) / 2;
        
        ctx.drawImage(logo, logoX, logoY, logoW, logoH);
      } catch (e) {
        console.warn('Failed to load logo image:', currentTemplate.logoImage);
      }
    };

    // ============ LOAD AND DRAW PHOTOS ============
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

      // Photo area starts after frame border, header, and padding
      const photoAreaX = frameBorderWidth + innerPadding;
      const photoAreaY = frameBorderWidth + headerHeight + innerPadding;

      images.forEach((img, index) => {
        if (!img) return;

        const col = index % cols;
        const row = Math.floor(index / cols);
        const x = photoAreaX + col * (photoWidth + photoGap);
        const y = photoAreaY + row * (photoHeight + photoGap);

        // Draw photo border/frame
        const photoBorderWidth = currentTemplate.border?.width || 6;
        
        // Shadow for photo
        ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 4;

        // Photo border background
        ctx.fillStyle = currentTemplate.border?.color || '#ffffff';
        roundRect(
          x - photoBorderWidth,
          y - photoBorderWidth,
          photoWidth + photoBorderWidth * 2,
          photoHeight + photoBorderWidth * 2,
          borderRadius + 2
        );
        ctx.fill();

        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Clip and draw image with rounded corners
        ctx.save();
        roundRect(x, y, photoWidth, photoHeight, borderRadius);
        ctx.clip();
        
        // Scale image to cover (like CSS object-fit: cover)
        const imgRatio = img.width / img.height;
        const photoRatio = photoWidth / photoHeight;
        let drawWidth, drawHeight, drawX, drawY;
        
        if (imgRatio > photoRatio) {
          drawHeight = photoHeight;
          drawWidth = img.width * (photoHeight / img.height);
          drawX = x - (drawWidth - photoWidth) / 2;
          drawY = y;
        } else {
          drawWidth = photoWidth;
          drawHeight = img.height * (photoWidth / img.width);
          drawX = x;
          drawY = y - (drawHeight - photoHeight) / 2;
        }
        
        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        ctx.restore();
      });

      // Draw decorations after photos
      await drawDecorations();

      // ============ DRAW FOOTER / WATERMARK ============
      if (showWatermark) {
        const footerY = canvasHeight - footerHeight;
        
        // Footer background (optional)
        if (currentTemplate.footer?.background) {
          ctx.fillStyle = currentTemplate.footer.background;
          ctx.fillRect(frameBorderWidth, footerY, innerW, footerHeight - frameBorderWidth);
        }
        
        // If template has logo image, draw it instead of text
        if (currentTemplate.logoImage) {
          await drawLogo();
        } else if (currentTemplate.watermark?.text) {
          // Calculate text position
          const hasSubtext = currentTemplate.subtext?.text;
          const mainTextY = footerY + (footerHeight - frameBorderWidth) / 2 - (hasSubtext ? 10 : 5);
          
          // Watermark text with letter spacing
          const fontSize = currentTemplate.watermark.fontSize || 20;
          const letterSpacing = currentTemplate.watermark.letterSpacing || 0;
          ctx.font = `bold ${fontSize}px ${currentTemplate.watermark.font || 'Arial'}`;
          ctx.fillStyle = currentTemplate.watermark.color;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          
          // Draw text with letter spacing
          if (letterSpacing > 0) {
            const text = currentTemplate.watermark.text;
            const totalWidth = ctx.measureText(text).width + (text.length - 1) * letterSpacing;
            let startX = canvasWidth / 2 - totalWidth / 2;
            
            for (let i = 0; i < text.length; i++) {
              const char = text[i];
              const charWidth = ctx.measureText(char).width;
              ctx.fillText(char, startX + charWidth / 2, mainTextY);
              startX += charWidth + letterSpacing;
            }
          } else {
            ctx.fillText(currentTemplate.watermark.text, canvasWidth / 2, mainTextY);
          }
          
          // Subtext (tagline)
          if (hasSubtext) {
            const subtextY = mainTextY + fontSize / 2 + 12;
            ctx.font = `${currentTemplate.subtext.fontSize || 12}px ${currentTemplate.subtext.font || 'Arial'}`;
            ctx.fillStyle = currentTemplate.subtext.color || 'rgba(255,255,255,0.6)';
            ctx.fillText(currentTemplate.subtext.text, canvasWidth / 2, subtextY);
          }
        }

        // Date (smaller, at bottom)
        const date = new Date().toLocaleDateString('vi-VN');
        ctx.font = `${currentTemplate.watermark?.dateFontSize || 11}px Arial`;
        ctx.fillStyle = currentTemplate.textColor || currentTemplate.watermark?.color || '#333';
        ctx.globalAlpha = 0.5;
        ctx.fillText(date, canvasWidth / 2, canvasHeight - frameBorderWidth - 10);
        ctx.globalAlpha = 1;
      }

      setFinalImage(canvas.toDataURL('image/png'));
    };

    loadImages();
  }, [photos, layout, isComplete, showWatermark, currentLayout, requiredPhotos, currentTemplate, template]);

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
