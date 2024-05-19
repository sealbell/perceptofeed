import React from 'react';

function PromptBox({ prompt, handlePromptChange }) {
  return (
    <div className="prompt-box">
      <textarea
        placeholder="Enter your prompt"
        value={prompt}
        onChange={handlePromptChange}
      />
    </div>
  );
}

export default PromptBox;
