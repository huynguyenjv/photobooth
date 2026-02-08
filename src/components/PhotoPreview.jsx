import './PhotoPreview.css';

const PhotoPreview = ({ photos, maxPhotos, onRemovePhoto }) => {
  const placeholders = Array(maxPhotos - photos.length).fill(null);

  return (
    <div className="photo-preview">
      <h3 className="preview-title">
        📸 Ảnh đã chụp ({photos.length}/{maxPhotos})
      </h3>
      <div className="preview-grid">
        {photos.map((photo, index) => (
          <div key={index} className="preview-item">
            <img src={photo} alt={`Ảnh ${index + 1}`} className="preview-image" />
            <button
              className="remove-button"
              onClick={() => onRemovePhoto(index)}
              title="Xóa ảnh"
            >
              ✕
            </button>
            <span className="photo-number">{index + 1}</span>
          </div>
        ))}
        {placeholders.map((_, index) => (
          <div key={`placeholder-${index}`} className="preview-item placeholder">
            <div className="placeholder-content">
              <span className="placeholder-number">{photos.length + index + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoPreview;
