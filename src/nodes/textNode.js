// textNode.js

import { useState, useRef, useEffect, useMemo } from 'react';
import { BaseNode } from '../components/BaseNode';

// Extract valid JavaScript variable names from {{variableName}} patterns
const extractVariables = (text) => {
  const regex = /\{\{([a-zA-Z_][a-zA-Z0-9_]*)\}\}/g;
  const matches = [...text.matchAll(regex)];
  // Use Set to deduplicate variable names
  const uniqueVars = [...new Set(matches.map(match => match[1]))];
  return uniqueVars;
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 200, height: 80 });

  // Extract variables from text and create dynamic handles
  const variables = useMemo(() => extractVariables(currText), [currText]);

  // Build handles array: dynamic variable inputs on left, output on right
  const handles = useMemo(() => {
    const variableHandles = variables.map((varName, index) => ({
      type: 'target',
      position: 'left',
      id: `var-${varName}`,
      // Distribute handles vertically
      style: {
        top: `${((index + 1) / (variables.length + 1)) * 100}%`
      }
    }));

    return [
      ...variableHandles,
      { type: 'source', position: 'right', id: 'output' }
    ];
  }, [variables]);

  // Auto-resize logic
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get accurate scrollHeight
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;

      // Calculate new height with padding for header, content, and variable list
      const variableListHeight = variables.length > 0 ? variables.length * 16 + 20 : 0;
      const newHeight = Math.max(80, scrollHeight + 60 + variableListHeight);

      // Calculate width based on longest line
      const lines = currText.split('\n');
      const maxLineLength = Math.max(...lines.map(line => line.length));
      const newWidth = Math.max(200, Math.min(400, maxLineLength * 8 + 40));

      setDimensions({ width: newWidth, height: newHeight });

      // Set textarea height
      textareaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [currText, variables.length]);

  return (
    <BaseNode
      id={id}
      title="Text"
      handles={handles}
      width={dimensions.width}
      minHeight={dimensions.height}
    >
      <div className="node-field">
        <label className="node-label">
          Text
          <textarea
            ref={textareaRef}
            className="node-textarea"
            value={currText}
            onChange={(e) => setCurrText(e.target.value)}
            placeholder="Enter text with {{variables}}..."
            rows={1}
          />
        </label>
      </div>
      {variables.length > 0 && (
        <div className="node-variables">
          <span className="node-variables-label">Variables:</span>
          <div className="node-variables-list">
            {variables.map(varName => (
              <span key={varName} className="node-variable-tag">
                {varName}
              </span>
            ))}
          </div>
        </div>
      )}
    </BaseNode>
  );
};
