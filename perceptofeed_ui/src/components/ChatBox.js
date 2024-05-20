import React from 'react';

function ChatBox({ handleFileChange }) {
  return (
    <div className="chat-box">
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}

export default ChatBox;
