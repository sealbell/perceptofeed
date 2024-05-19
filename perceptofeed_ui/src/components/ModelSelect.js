import React from 'react';

function ModelSelect({ selectedModel, handleModelChange }) {
  return (
    <div className="model-select">
      <select value={selectedModel} onChange={handleModelChange}>
        <option value="chatgpt-3.5">ChatGPT 3.5</option>
        <option value="chatgpt-4.0">ChatGPT 4.0</option>
        <option value="chatgpt-4.0o">ChatGPT 4.0o</option>
      </select>
    </div>
  );
}

export default ModelSelect;
