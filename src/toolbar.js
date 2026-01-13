// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div className="pipeline-toolbar">
      <div className="pipeline-toolbar-items">
        <DraggableNode type='customInput' label='Input' />
        <DraggableNode type='llm' label='LLM' />
        <DraggableNode type='customOutput' label='Output' />
        <DraggableNode type='text' label='Text' />
        <DraggableNode type='filter' label='Filter' />
        <DraggableNode type='merge' label='Merge' />
        <DraggableNode type='conditional' label='Conditional' />
        <DraggableNode type='api' label='API' />
        <DraggableNode type='transform' label='Transform' />
      </div>
    </div>
  );
};
