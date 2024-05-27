
import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import FloatingActionButton from './FloatingActionButton';

const ChatContainer = () => {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div>
      {showChat && <ChatWindow onClose={toggleChat} />}
      <FloatingActionButton onClick={toggleChat} />
    </div>
  );
};

export default ChatContainer;
