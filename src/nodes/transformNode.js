// transformNode.js - Transforms input data using a template

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';

export const TransformNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'uppercase');

  const handles = [
    { type: 'target', position: 'left', id: 'input' },
    { type: 'source', position: 'right', id: 'output' }
  ];

  return (
    <BaseNode id={id} title="Transform" handles={handles}>
      <div className="node-field">
        <label className="node-label">
          Operation
          <select
            className="node-select"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <option value="uppercase">Uppercase</option>
            <option value="lowercase">Lowercase</option>
            <option value="trim">Trim</option>
            <option value="reverse">Reverse</option>
            <option value="json">Parse JSON</option>
          </select>
        </label>
      </div>
      <div className="node-info">
        <span className="node-info-text">Transforms input data</span>
      </div>
    </BaseNode>
  );
};
