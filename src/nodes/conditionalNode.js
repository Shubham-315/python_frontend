// conditionalNode.js - Routes input to one of two outputs based on condition

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';

export const ConditionalNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'notEmpty');

  const handles = [
    { type: 'target', position: 'left', id: 'input' },
    { type: 'source', position: 'right', id: 'true', style: { top: '33%' } },
    { type: 'source', position: 'right', id: 'false', style: { top: '66%' } }
  ];

  return (
    <BaseNode id={id} title="Conditional" handles={handles}>
      <div className="node-field">
        <label className="node-label">
          Condition
          <select
            className="node-select"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="notEmpty">Not Empty</option>
            <option value="isEmpty">Is Empty</option>
            <option value="isNumber">Is Number</option>
            <option value="isTrue">Is True</option>
          </select>
        </label>
      </div>
      <div className="node-info">
        <span className="node-info-text">True (top) / False (bottom)</span>
      </div>
    </BaseNode>
  );
};
