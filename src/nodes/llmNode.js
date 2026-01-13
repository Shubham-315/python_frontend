// llmNode.js

import { BaseNode } from '../components/BaseNode';

export const LLMNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: 'left', id: 'system', style: { top: '33%' } },
    { type: 'target', position: 'left', id: 'prompt', style: { top: '66%' } },
    { type: 'source', position: 'right', id: 'response' }
  ];

  return (
    <BaseNode id={id} title="LLM" handles={handles}>
      <div className="node-info">
        <span className="node-info-text">This is a LLM.</span>
      </div>
    </BaseNode>
  );
};
