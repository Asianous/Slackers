import React, { useState } from 'react';

export default function Group({ pastMessages }) {
  const [messages, setMessages] = useState(pastMessages || []);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, newMessage]);
      setNewMessage('');
    }
  };

  return (
    <div>
      <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Start Typing..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}
