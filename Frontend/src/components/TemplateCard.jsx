import React from 'react';

const TemplateCard = ({ template, selected, onSelect }) => (
    <div 
        className={`template-card ${selected ? 'selected' : ''}`} 
        onClick={() => onSelect(template.value)}
    >
        <h4>{template.label}</h4>
    </div>
);

export default TemplateCard;
