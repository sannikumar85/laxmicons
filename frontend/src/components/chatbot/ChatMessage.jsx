import React from "react";
import {
  FiUser,
  FiMessageCircle,
} from "react-icons/fi";

const ChatMessage = ({ message }) => {
  if (!message) return null;

  const isUser = message.sender === "user";

  return (
    <div
      className={`flex gap-2.5 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* Bot Avatar */}
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#102A43] text-white">
          <FiMessageCircle size={15} />
        </div>
      )}

      {/* Message */}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
          isUser
            ? "rounded-br-md bg-[#E87524] text-white"
            : "rounded-bl-md bg-gray-100 text-gray-700"
        }`}
      >
        <p className="whitespace-pre-wrap break-words">
          {message.text}
        </p>

        {message.time && (
          <p
            className={`mt-1 text-[10px] ${
              isUser
                ? "text-white/70"
                : "text-gray-400"
            }`}
          >
            {message.time}
          </p>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E87524]/10 text-[#E87524]">
          <FiUser size={15} />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;