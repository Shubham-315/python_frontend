// submit.js

import { useStore } from './store';

export const SubmitButton = () => {
  const handleSubmit = async () => {
    // Get current nodes and edges from store
    const { nodes, edges } = useStore.getState();

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Display results in alert
      alert(
        `Pipeline Analysis:\n\n` +
        `Nodes: ${data.num_nodes}\n` +
        `Edges: ${data.num_edges}\n` +
        `Is DAG: ${data.is_dag ? 'Yes' : 'No'}`
      );
    } catch (error) {
      console.error('Error submitting pipeline:', error);
      alert(`Error submitting pipeline: ${error.message}`);
    }
  };

  return (
    <div className="submit-container">
      <button
        type="button"
        className="submit-button"
        onClick={handleSubmit}
      >
        Submit Pipeline
      </button>
    </div>
  );
};
