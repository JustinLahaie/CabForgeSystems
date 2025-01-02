import PropTypes from 'prop-types'
import './CabinetControls.css'

export default function CabinetControls({ dimensions, shelfCount, onDimensionsChange, onShelfCountChange }) {
  const handleChange = (dimension, value) => {
    onDimensionsChange({
      ...dimensions,
      [dimension]: Number(value)
    })
  }

  return (
    <div className="cabinet-controls">
      <div className="control-group">
        <label htmlFor="width">Width:</label>
        <input
          type="range"
          id="width"
          min="1"
          max="5"
          step="0.1"
          value={dimensions.width}
          onChange={(e) => handleChange('width', e.target.value)}
        />
        <span>{dimensions.width.toFixed(1)} units</span>
      </div>

      <div className="control-group">
        <label htmlFor="height">Height:</label>
        <input
          type="range"
          id="height"
          min="1"
          max="5"
          step="0.1"
          value={dimensions.height}
          onChange={(e) => handleChange('height', e.target.value)}
        />
        <span>{dimensions.height.toFixed(1)} units</span>
      </div>

      <div className="control-group">
        <label htmlFor="depth">Depth:</label>
        <input
          type="range"
          id="depth"
          min="0.5"
          max="3"
          step="0.1"
          value={dimensions.depth}
          onChange={(e) => handleChange('depth', e.target.value)}
        />
        <span>{dimensions.depth.toFixed(1)} units</span>
      </div>

      <div className="control-group">
        <label htmlFor="shelves">Shelves:</label>
        <input
          type="range"
          id="shelves"
          min="0"
          max="5"
          step="1"
          value={shelfCount}
          onChange={(e) => onShelfCountChange(Number(e.target.value))}
        />
        <span>{shelfCount}</span>
      </div>
    </div>
  )
}

CabinetControls.propTypes = {
  dimensions: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    depth: PropTypes.number.isRequired
  }).isRequired,
  shelfCount: PropTypes.number.isRequired,
  onDimensionsChange: PropTypes.func.isRequired,
  onShelfCountChange: PropTypes.func.isRequired
} 