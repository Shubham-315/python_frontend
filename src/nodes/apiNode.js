// apiNode.js - Makes external API calls

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';

export const APINode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || '');
  const [method, setMethod] = useState(data?.method || 'GET');

  const handles = [
    { type: 'target', position: 'left', id: 'body' },
    { type: 'source', position: 'right', id: 'response' }
  ];

  return (
    <BaseNode id={id} title="API" handles={handles}>
      <div className="node-field">
        <label className="node-label">
          Method
          <select
            className="node-select"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
      </div>
      <div className="node-field">
        <label className="node-label">
          URL
          <input
            type="text"
            className="node-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.example.com"
          />
        </label>
      </div>
    </BaseNode>
  );
};
