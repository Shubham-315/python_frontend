// BaseNode.js - Reusable node abstraction for ReactFlow

import { Handle, Position } from 'reactflow';

const positionMap = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

/**
 * BaseNode - A reusable wrapper component for all node types
 *
 * @param {string} id - Node ID (passed from ReactFlow)
 * @param {string} title - Node title displayed in header
 * @param {Array} handles - Handle configuration array
 *   - { type: 'source'|'target', position: 'left'|'right'|'top'|'bottom', id: string, style?: object }
 * @param {number} width - Node width (default: 200)
 * @param {number} minHeight - Minimum node height (default: 80)
 * @param {React.ReactNode} children - Node-specific content
 * @param {string} className - Additional CSS class for the container
 */
export const BaseNode = ({
  id,
  title,
  handles = [],
  width = 200,
  minHeight = 80,
  children,
  className = '',
  style = {}
}) => {
  return (
    <div
      className={`base-node ${className}`}
      style={{
        width,
        minHeight,
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        ...style
      }}
    >
      {/* Render handles */}
      {handles.map((handle, index) => (
        <Handle
          key={handle.id || `${id}-handle-${index}`}
          type={handle.type}
          position={positionMap[handle.position] || Position.Left}
          id={handle.id ? `${id}-${handle.id}` : `${id}-handle-${index}`}
          style={{
            width: 12,
            height: 12,
            backgroundColor: handle.type === 'source' ? '#3b82f6' : '#10b981',
            border: '2px solid #fff',
            ...handle.style
          }}
        />
      ))}

      {/* Node header */}
      <div
        className="base-node-header"
        style={{
          padding: '8px 12px',
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          fontWeight: 600,
          fontSize: '13px',
          color: '#1e293b',
        }}
      >
        {title}
      </div>

      {/* Node content */}
      <div
        className="base-node-content"
        style={{
          padding: '12px',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BaseNode;
