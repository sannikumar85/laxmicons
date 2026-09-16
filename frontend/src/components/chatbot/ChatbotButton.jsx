import React from "react";
import { FiMessageCircle, FiX } from "react-icons/fi";

const ChatbotButton = ({ isOpen, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
      aria-expanded={isOpen}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#E87524] text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:scale-105 hover:bg-[#d9681b] hover:shadow-xl active:scale-95 sm:bottom-6 sm:right-6"
    >
      {/* Notification dot */}
      {!isOpen && (
        <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
      )}

      <span
        className={`transition-transform duration-300 ${
          isOpen ? "rotate-90" : "rotate-0"
        }`}
      >
        {isOpen ? (
          <FiX size={24} />
        ) : (
          <FiMessageCircle size={24} />
        )}
      </span>
    </button>
  );
};

export default ChatbotButton;