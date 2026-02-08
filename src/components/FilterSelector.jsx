import { FILTERS } from '../utils/filters';
import './FilterSelector.css';

const FilterSelector = ({ selectedFilter, onSelectFilter, disabled }) => {
  return (
    <div className="filter-selector">
      <h3 className="filter-title">🎨 Bộ lọc</h3>
      <div className="filter-grid">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            className={`filter-button ${selectedFilter === filter.id ? 'active' : ''}`}
            onClick={() => onSelectFilter(filter.id)}
            disabled={disabled}
            style={{ filter: filter.cssFilter !== 'none' ? filter.cssFilter : undefined }}
          >
            <span className="filter-preview">📷</span>
            <span className="filter-name">{filter.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterSelector;
