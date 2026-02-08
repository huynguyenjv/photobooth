import { ASPECT_RATIOS } from '../utils/filters';
import './ControlPanel.css';

const ControlPanel = ({
  aspectRatio,
  onAspectRatioChange,
  showWatermark,
  onWatermarkChange,
  onSwitchCamera,
  isStreaming,
  onStopCamera,
}) => {
  return (
    <div className="control-panel">
      <div className="control-group">
        <label className="control-label">📐 Tỉ lệ ảnh</label>
        <div className="control-options">
          {ASPECT_RATIOS.map((ratio) => (
            <button
              key={ratio.id}
              className={`control-option ${aspectRatio === ratio.id ? 'active' : ''}`}
              onClick={() => onAspectRatioChange(ratio.id)}
            >
              {ratio.name}
            </button>
          ))}
        </div>
      </div>

      <div className="control-group">
        <label className="control-label">⚙️ Tùy chọn</label>
        <div className="control-options">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={showWatermark}
              onChange={(e) => onWatermarkChange(e.target.checked)}
            />
            <span className="checkbox-custom" />
            <span>Hiện watermark</span>
          </label>
        </div>
      </div>

      {isStreaming && (
        <div className="control-group">
          <label className="control-label">📷 Camera</label>
          <div className="control-options">
            <button className="control-button" onClick={onSwitchCamera}>
              🔄 Đổi camera
            </button>
            <button className="control-button danger" onClick={onStopCamera}>
              ⏹️ Tắt camera
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
