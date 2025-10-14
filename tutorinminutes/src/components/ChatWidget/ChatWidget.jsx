import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ChatWidget.scss';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hi there! I'm your AI assistant for TutorInMinutes. I can help you with:\n\n• Finding the right tutor\n• Answering questions about our services\n• Booking information\n• Subject expertise\n\nWhat would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [previewDismissed, setPreviewDismissed] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Show preview after 3 seconds if chat is closed and not dismissed
  useEffect(() => {
    if (!isOpen && !previewDismissed) {
      const timer = setTimeout(() => {
        setShowPreview(true);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setShowPreview(false);
    }
  }, [isOpen, previewDismissed]);

  // Auto-hide preview after 8 seconds
  useEffect(() => {
    if (showPreview) {
      const timer = setTimeout(() => {
        setShowPreview(false);
        setPreviewDismissed(true);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [showPreview]);

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('https://be-app.ailinc.com/api/clients/1/ai-agent/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input_as_text: inputText }),
      });

      const data = await response.json();
      
      const botMessage = {
        id: Date.now() + 1,
        text: data.output_text,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm having trouble connecting right now. Please try again in a moment, or feel free to browse our tutors directly! 🔄",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    setShowPreview(false);
    setPreviewDismissed(true);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handlePreviewClick = () => {
    setIsOpen(true);
    setShowPreview(false);
    setPreviewDismissed(true);
    setUnreadCount(0);
  };

  const handlePreviewClose = () => {
    setShowPreview(false);
    setPreviewDismissed(true);
  };

  const formatTime = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(timestamp);
  };

  const quickReplies = [
    "Find me a Math tutor",
    "What are your pricing plans?",
    "How does online tutoring work?",
    "Tell me about your tutors"
  ];

  const handleQuickReply = (reply) => {
    setInputText(reply);
    setTimeout(() => sendMessage(), 100);
  };

  return (
    <div className="chat-widget">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`chat-container ${isMinimized ? 'minimized' : ''}`}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="chat-header">
              <div className="chat-title">
                <div className="bot-avatar">
                  <div className="avatar-icon">🤖</div>
                  <div className="status-indicator"></div>
                </div>
                <div className="title-info">
                  <h3>TutorBot</h3>
                  <span className="status-text">Online • Ready to help</span>
                </div>
              </div>
              <div className="header-actions">
                <button 
                  className="minimize-btn"
                  onClick={handleMinimize}
                  aria-label="Minimize chat"
                  title="Minimize"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <button 
                  className="close-btn"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  title="Close"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                <div className="chat-messages">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`message ${message.sender}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {message.sender === 'bot' && (
                        <div className="message-avatar">
                          <div className="bot-icon">🤖</div>
                        </div>
                      )}
                      <div className="message-content">
                        <p>{message.text}</p>
                        <span className="message-time">{formatTime(message.timestamp)}</span>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <motion.div
                      className="message bot"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="message-avatar">
                        <div className="bot-icon">🤖</div>
                      </div>
                      <div className="message-content">
                        <div className="typing-indicator">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                        <span className="typing-text">TutorBot is typing...</span>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {messages.length === 1 && (
                  <motion.div 
                    className="quick-replies"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="quick-replies-header">
                      <span>Quick questions:</span>
                    </div>
                    <div className="quick-replies-grid">
                      {quickReplies.map((reply, index) => (
                        <motion.button
                          key={reply}
                          className="quick-reply-btn"
                          onClick={() => handleQuickReply(reply)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                        >
                          {reply}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                <div className="chat-input">
                  <div className="input-container">
                    <textarea
                      ref={inputRef}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about tutoring..."
                      rows="1"
                      disabled={isLoading}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!inputText.trim() || isLoading}
                      className="send-btn"
                      aria-label="Send message"
                    >
                      {isLoading ? (
                        <div className="loading-spinner"></div>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                  </div>
                  <div className="input-footer">
                    <span className="powered-by">Powered by AI</span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Preview */}
      <AnimatePresence>
        {showPreview && !isOpen && (
          <motion.div
            className="chat-preview"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={handlePreviewClick}
          >
            <button 
              className="preview-close"
              onClick={(e) => {
                e.stopPropagation();
                handlePreviewClose();
              }}
              aria-label="Close preview"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <div className="preview-content">
              <div className="preview-avatar">
                <span>🤖</span>
                <div className="preview-status"></div>
              </div>
              <div className="preview-text">
                <div className="preview-title">TutorBot</div>
                <div className="preview-message">Hi! Need help finding a tutor? Click to chat with me!</div>
              </div>
            </div>
            <div className="preview-cta">
              <span>Click to start chatting</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="chat-toggle"
        onClick={handleToggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat assistant"
      >
        {unreadCount > 0 && (
          <motion.div 
            className="unread-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.div>
        )}
        
        <div className="toggle-icon">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.svg
                key="close"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </motion.svg>
            ) : (
              <motion.div
                key="chat"
                className="chat-icon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={ { rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="chat-emoji">💬</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div 
          className="pulse-ring"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.7, 0.3, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.button>
    </div>
  );
};

export default ChatWidget;