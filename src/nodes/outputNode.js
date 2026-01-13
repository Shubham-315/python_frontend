// outputNode.js

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handles = [
    { type: 'target', position: 'left', id: 'value' }
  ];

  return (
    <BaseNode id={id} title="Output" handles={handles}>
      <div className="node-field">
        <label className="node-label">
          Name
          <input
            type="text"
            className="node-input"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
          />
        </label>
      </div>
      <div className="node-field">
        <label className="node-label">
          Type
          <select
            className="node-select"
            value={outputType}
            onChange={(e) => setOutputType(e.target.value)}
          >
            <option value="Text">Text</option>
            <option value="Image">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
