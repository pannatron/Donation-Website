import { useState, useEffect, useRef } from 'react';

const API_URL = 'https://fairly-valid-rattler.ngrok-free.app';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([
    {text: "สวัสดีครับ ผมคือเสือ KT ยินดีที่ได้รู้จักครับ!", isUser: false}
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Load session ID from localStorage if it exists
    const savedSessionId = localStorage.getItem('chatSessionId');
    if (savedSessionId) {
      setSessionId(savedSessionId);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    // Add user message
    setMessages(prev => [...prev, {text: inputMessage, isUser: true}]);
    
    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          session_id: sessionId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from chatbot');
      }

      const data = await response.json();
      
      // Save the session ID if it's new
      if (!sessionId) {
        setSessionId(data.session_id);
        localStorage.setItem('chatSessionId', data.session_id);
      }

      // Add bot response
      setMessages(prev => [...prev, {
        text: data.response,
        isUser: false
      }]);
    } catch (err) {
      setError('ขออภัย เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง');
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }

    setInputMessage('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl overflow-hidden z-50">
      {/* Header */}
      <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
        <h3 className="font-bold">KT Tiger Chat</h3>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Video Container */}
      <div className="relative h-72 bg-gray-100">
        <video 
          className="w-full h-full object-contain"
          src="/b9f63b5b-b26f-47cb-befe-dd2f2729e717.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Chat Messages */}
      <div className="h-64 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.isUser
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 text-red-500 text-center bg-red-100 rounded">
          {error}
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="border-t p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="พิมพ์ข้อความ..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500 text-gray-800"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 focus:outline-none ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;
