import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Loader2 } from "lucide-react";
import { sendMessageToGemini } from "../services/geminiService";

const LegalChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your legal assistant. How can I help you with your legal questions today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await sendMessageToGemini(userMessage);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I encountered an error. Please try again or check your API key.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-slate-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 hover:scale-110"
        >
          <MessageSquare className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-slate-800 p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-slate-700" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Legal Assistant</h3>
                <p className="text-white/80 text-xs">
                  Ask me anything about law
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1  overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === "user"
                      ? "bg-slate-800 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap formatted-content">
                    {msg.content.split("\n").map((line, i) => {
                      // Process inline formatting first
                      const formatLine = (text) => {
                        const parts = [];
                        let remaining = text;
                        let key = 0;
                        
                        while (remaining.length > 0) {
                          const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
                          if (boldMatch) {
                            const beforeBold = remaining.substring(0, boldMatch.index);
                            if (beforeBold) parts.push(<span key={key++}>{beforeBold}</span>);
                            parts.push(<strong key={key++}>{boldMatch[1]}</strong>);
                            remaining = remaining.substring(boldMatch.index + boldMatch[0].length);
                          } else {
                            parts.push(<span key={key++}>{remaining}</span>);
                            break;
                          }
                        }
                        return parts;
                      };

                      // Headers with ###
                      if (line.startsWith("###")) {
                        return <h3 key={i} className="font-bold text-base mb-2 mt-3">{formatLine(line.replace(/^###\s*/, ""))}</h3>;
                      }
                      // Headers with ##
                      if (line.startsWith("##")) {
                        return <h2 key={i} className="font-bold text-lg mb-2 mt-3">{formatLine(line.replace(/^##\s*/, ""))}</h2>;
                      }
                      // Headers with #
                      if (line.startsWith("#")) {
                        return <h1 key={i} className="font-bold text-xl mb-2 mt-3">{formatLine(line.replace(/^#\s*/, ""))}</h1>;
                      }
                      // Bullet points with * or -
                      if (line.trim().startsWith("*") || line.trim().startsWith("-")) {
                        const text = line.replace(/^\s*[*-]\s*/, "");
                        return <div key={i} className="ml-4 mb-1 flex items-start"><span className="mr-2">•</span><span>{formatLine(text)}</span></div>;
                      }
                      // Numbered lists
                      if (/^\d+\./.test(line.trim())) {
                        return <div key={i} className="ml-4 mb-1">{formatLine(line)}</div>;
                      }
                      // Empty lines for spacing
                      if (!line.trim()) {
                        return <div key={i} className="h-2" />;
                      }
                      // Regular text
                      return <div key={i} className="mb-1">{formatLine(line)}</div>;
                    })}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask a legal question..."
                className="flex-1 text-black px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700 text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-slate-800 text-white p-2 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LegalChatbot;
