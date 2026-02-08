import { useState } from 'react';
import { TEMPLATES, TEMPLATE_CATEGORIES } from '../utils/templates';
import './TemplateSelector.css';

const TemplateSelector = ({ selectedTemplate, onSelectTemplate }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTemplates =
    activeCategory === 'all'
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === activeCategory);

  return (
    <div className="template-selector">
      <h3 className="template-title">🎨 Chọn Template</h3>

      {/* Category Tabs */}
      <div className="category-tabs">
        {TEMPLATE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            <span className="category-icon">{cat.icon}</span>
            <span className="category-name">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="template-grid">
        {filteredTemplates.map((template) => (
          <button
            key={template.id}
            className={`template-card ${selectedTemplate === template.id ? 'active' : ''}`}
            onClick={() => onSelectTemplate(template.id)}
            style={{
              background:
                template.background.type === 'gradient'
                  ? `linear-gradient(135deg, ${template.background.colors[0]}, ${template.background.colors[1]})`
                  : template.background.colors[0],
            }}
          >
            <span className="template-icon">{template.icon}</span>
            <span className="template-name">{template.name}</span>
            {selectedTemplate === template.id && (
              <span className="template-check">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
