// filterNode.js - Filters data based on a condition

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'contains');
  const [value, setValue] = useState(data?.value || '');

  const handles = [
    { type: 'target', position: 'left', id: 'input' },
    { type: 'source', position: 'right', id: 'output' }
  ];

  return (
    <BaseNode id={id} title="Filter" handles={handles}>
      <div className="node-field">
        <label className="node-label">
          Condition
          <select
            className="node-select"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="contains">Contains</option>
            <option value="equals">Equals</option>
            <option value="startsWith">Starts With</option>
            <option value="endsWith">Ends With</option>
          </select>
        </label>
      </div>
      <div className="node-field">
        <label className="node-label">
          Value
          <input
            type="text"
            className="node-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Filter value..."
          />
        </label>
      </div>
    </BaseNode>
  );
};
