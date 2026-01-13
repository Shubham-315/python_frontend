// mergeNode.js - Combines two inputs into one output

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';

export const MergeNode = ({ id, data }) => {
  const [separator, setSeparator] = useState(data?.separator || '\\n');

  const handles = [
    { type: 'target', position: 'left', id: 'input1', style: { top: '33%' } },
    { type: 'target', position: 'left', id: 'input2', style: { top: '66%' } },
    { type: 'source', position: 'right', id: 'output' }
  ];

  return (
    <BaseNode id={id} title="Merge" handles={handles}>
      <div className="node-field">
        <label className="node-label">
          Separator
          <select
            className="node-select"
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
          >
            <option value="\n">New Line</option>
            <option value=" ">Space</option>
            <option value=", ">Comma</option>
            <option value=" | ">Pipe</option>
          </select>
        </label>
      </div>
      <div className="node-info">
        <span className="node-info-text">Combines Input 1 + Input 2</span>
      </div>
    </BaseNode>
  );
};
