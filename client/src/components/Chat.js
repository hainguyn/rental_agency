import React, { memo, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const Chat = () => {
  // State lưu trữ các tin nhắn
  const [messages, setMessages] = useState([
    { user: "hai nguyen", content: "Chào mừng bạn đến với diễn đàn!" },
    { user: "hieu nguyen", content: "Cảm ơn Admin!" },
    { user: "dang anh", content: "Xin chào mọi người!" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  // Xử lý gửi tin nhắn
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { user: "You", content: newMessage }]);
      setNewMessage(""); // Clear input sau khi gửi
    }
  };

  return (
    <div className="w-full h-[1000px] bg-white rounded-lg shadow-lg">
      {/* Danh sách tin nhắn */}
      <div className="p-4 space-y-4 overflow-y-auto max-h-80">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.user === "You" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg ${
                msg.user === "You"
                  ? "bg-green-400 text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              <strong>{msg.user}: </strong>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Form nhập tin nhắn */}
      <div className="flex items-center p-4 bg-gray-100 rounded-b-lg">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 p-2 rounded-full bg-green-400 text-white"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default memo(Chat);
