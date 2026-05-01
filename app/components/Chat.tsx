"use client";

import { Channel, ChatMessage } from "../types";
import { useRef, useEffect } from "react";

interface ChatProps {
  channel: Channel | undefined;
  messages: ChatMessage[];
  onSendMessage: (e: React.FormEvent) => void;
  newMessage: string;
  setNewMessage: (message: string) => void;
  activeTab: "chat" | "activity" | "calls" | "files";
}

export default function Chat({
  channel,
  messages,
  onSendMessage,
  newMessage,
  setNewMessage,
  activeTab,
}: ChatProps) {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const prevChannelId = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (channel && prevChannelId.current !== channel.id) {
      prevChannelId.current = channel.id;
    }
  }, [channel?.id]);

  if (activeTab !== "chat") {
    return (
      <div className="flex-1 flex flex-col bg-[#f3f2f1]">
        <div className="h-14 bg-[#f3f2f1] px-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[#0078d4] rounded-full flex items-center justify-center text-white font-semibold text-sm">
              #
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {channel ? `#${channel.name}` : "Select a channel"}
              </h2>
              <p className="text-xs text-gray-500">
                {channel ? "General discussion for this channel" : "Choose a channel to start chatting"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-500 hover:bg-gray-200 rounded">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-200 rounded">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-200 rounded">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v2H6v2h12v-2h-4v-2h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H4V4h16v10z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              {activeTab === "activity" && (
                <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
              {activeTab === "calls" && (
                <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              )}
              {activeTab === "files" && (
                <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v2H6v2h12v-2h-4v-2h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H4V4h16v10z" />
                </svg>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {activeTab === "activity" && "Activity"}
              {activeTab === "calls" && "Calls"}
              {activeTab === "files" && "Files"}
            </h3>
            <p className="text-gray-500">
              {activeTab === "activity" && "No recent activity"}
              {activeTab === "calls" && "No recent calls"}
              {activeTab === "files" && "No files shared yet"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#f3f2f1]">
      <div className="h-14 bg-[#f3f2f1] px-4 flex items-center justify-between border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#0078d4] rounded-full flex items-center justify-center text-white font-semibold text-sm">
            #
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {channel ? `#${channel.name}` : "Select a channel"}
            </h2>
            <p className="text-xs text-gray-500">
              {channel ? "General discussion for this channel" : "Choose a channel to start chatting"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-500 hover:bg-gray-200 rounded">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-200 rounded">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-200 rounded">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v2H6v2h12v-2h-4v-2h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H4V4h16v10z" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-2"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
            <p className="text-center">No messages yet</p>
            <p className="text-center text-sm">Be the first to say hello!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-3 py-2 shadow-sm ${
                  message.sender === "You"
                    ? "bg-[#0078d4] text-white rounded-tr-none"
                    : "bg-white rounded-tl-none"
                }`}
              >
                <div className="flex items-baseline space-x-2 mb-1">
                  <span className={`text-xs font-semibold ${message.sender === "You" ? "text-blue-100" : "text-gray-900"}`}>
                    {message.sender}
                  </span>
                  <span className={`text-[10px] ${message.sender === "You" ? "text-blue-100" : "text-gray-500"}`}>
                    {new Date(message.timestamp).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </div>
                <p className={`text-sm ${message.sender === "You" ? "text-white" : "text-gray-800"}`}>
                  {message.text}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-[#f3f2f1] p-3 flex items-end space-x-2">
        <button className="p-2 text-gray-500 hover:bg-gray-200 rounded">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15 12c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3zm-9-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm18 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-9 8c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z" />
          </svg>
        </button>
        <button className="p-2 text-gray-500 hover:bg-gray-200 rounded">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.97 16.95L10 13.87V4h2v8.76l4.03 2.84c.69.48.77 1.51.18 2.03-.58.53-1.61.4-2.18-.27zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.84 1.84 3.18 3.18 1.83-1.83zM3 5.27L5.27 3l1.84 1.84L4.84 7.07 3 5.27zM19 19H5V5h14v14z" />
          </svg>
        </button>
        <div className="flex-1 relative">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0078d4] focus:border-transparent resize-none min-h-[44px] max-h-32 bg-white"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSendMessage(e);
              }
            }}
          />
        </div>
        <button
          type="submit"
          onClick={onSendMessage}
          disabled={!newMessage.trim()}
          className="p-3 bg-[#0078d4] text-white rounded hover:bg-[#005a9e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
