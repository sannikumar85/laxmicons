import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  FiX,
  FiRotateCcw,
  FiMinus,
} from "react-icons/fi";

import { FaRobot } from "react-icons/fa";

import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import api from "../../services/api";

function ChatbotWindow({
  onClose,
}) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text:
        "Hi! Welcome to Laxmi Construction. How can I help you today?",
      time: getTime(),
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  /* ======================================================
     AUTO SCROLL
  ====================================================== */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  /* ======================================================
     SEND MESSAGE
  ====================================================== */

  const handleSendMessage = async (text) => {
    const userMessage = {
      id: Date.now(),
      sender: "user",
      text,
      time: getTime(),
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    setIsTyping(true);

    try {
      const history = messages.slice(-10).map((message) => ({
        role: message.sender === "user" ? "user" : "assistant",
        content: message.text,
      }));
      const response = await api.post("/chatbot/chat", { message: text, history });
      const reply = response?.data?.reply;
      if (!reply) throw new Error("The assistant returned an empty response.");
      setMessages((previous) => [...previous, { id: Date.now() + 1, sender: "bot", text: reply, time: getTime() }]);
    } catch (error) {
      console.error("Chatbot request failed:", error);
      setMessages((previous) => [...previous, { id: Date.now() + 1, sender: "bot", text: "I’m having trouble connecting right now. Please try again, or use our Contact page for help.", time: getTime() }]);
    } finally {
      setIsTyping(false);
    }
  };

  /* ======================================================
     RESET CHAT
  ====================================================== */

  const handleReset = () => {
    setMessages([
      {
        id: Date.now(),
        sender: "bot",
        text:
          "Hi! Welcome to Laxmi Construction. How can I help you today?",
        time: getTime(),
      },
    ]);

    setIsTyping(false);
  };

  return (
    <div
      className="
        fixed
        z-50

        right-3
        bottom-20

        sm:right-6
        sm:bottom-24

        w-[calc(100vw-24px)]
        max-w-[390px]

        h-[min(620px,calc(100vh-110px))]

        bg-white
        rounded-2xl
        sm:rounded-3xl

        border
        border-slate-200

        shadow-2xl
        shadow-slate-900/15

        overflow-hidden

        animate-chat-open
      "
      role="dialog"
      aria-label="Laxmi Construction AI Assistant"
    >

      {/* ==================================================
          HEADER
      =================================================== */}

      <div
        className="
          h-[72px]
          bg-[#0F2D4A]
          px-4
          flex
          items-center
          justify-between
        "
      >

        <div className="flex items-center gap-3">

          <div
            className="
              relative
              w-10
              h-10
              rounded-xl
              bg-orange-500
              text-white
              flex
              items-center
              justify-center
            "
          >
            <FaRobot size={18} />

            <span
              className="
                absolute
                right-0
                bottom-0
                w-2.5
                h-2.5
                rounded-full
                bg-emerald-400
                border-2
                border-[#0F2D4A]
              "
            />
          </div>

          <div>

            <h2 className="text-sm font-bold text-white">
              Laxmi AI Assistant
            </h2>

            <p className="text-[11px] text-white/55 mt-0.5">
              Online • Ready to help
            </p>

          </div>

        </div>

        <div className="flex items-center gap-1">

          <button
            type="button"
            onClick={handleReset}
            className="
              w-9
              h-9
              rounded-lg
              text-white/60
              hover:bg-white/10
              hover:text-white
              flex
              items-center
              justify-center
              transition
            "
            aria-label="Reset conversation"
            title="Reset conversation"
          >
            <FiRotateCcw size={17} />
          </button>

          <button
            type="button"
            className="
              hidden
              sm:flex
              w-9
              h-9
              rounded-lg
              text-white/60
              hover:bg-white/10
              hover:text-white
              items-center
              justify-center
              transition
            "
            aria-label="Minimize chat"
          >
            <FiMinus size={18} />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="
              w-9
              h-9
              rounded-lg
              text-white/60
              hover:bg-white/10
              hover:text-white
              flex
              items-center
              justify-center
              transition
            "
            aria-label="Close chat"
          >
            <FiX size={19} />
          </button>

        </div>

      </div>

      {/* ==================================================
          MESSAGES
      =================================================== */}

      <div
        className="
          h-[calc(100%-137px)]
          overflow-y-auto
          px-4
          py-5
          bg-slate-50/70
        "
      >

        {/* Welcome suggestion */}

        {messages.length === 1 && (
          <div className="mb-5">

            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-2">
              You can ask about
            </p>

            <div className="flex flex-wrap gap-2">

              {[
                "Construction",
                "Consultancy",
                "Project estimate",
                "Labour supply",
              ].map((suggestion) => (

                <button
                  type="button"
                  key={suggestion}
                  onClick={() =>
                    handleSendMessage(suggestion)
                  }
                  className="
                    px-3
                    py-2
                    rounded-xl
                    bg-white
                    border
                    border-slate-200
                    text-xs
                    font-medium
                    text-slate-600
                    hover:border-orange-300
                    hover:text-orange-500
                    transition
                  "
                >
                  {suggestion}
                </button>

              ))}

            </div>

          </div>
        )}

        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
          />
        ))}

        {/* Typing */}

        {isTyping && (
          <div className="flex items-center gap-2 mb-4">

            <div
              className="
                w-8
                h-8
                rounded-xl
                bg-orange-50
                text-orange-500
                flex
                items-center
                justify-center
              "
            >
              <FaRobot size={13} />
            </div>

            <div
              className="
                flex
                items-center
                gap-1
                px-4
                py-3
                rounded-2xl
                rounded-bl-md
                bg-slate-100
              "
            >

              <span className="chat-dot" />
              <span className="chat-dot chat-dot-delay-1" />
              <span className="chat-dot chat-dot-delay-2" />

            </div>

          </div>
        )}

        <div ref={messagesEndRef} />

      </div>

      {/* ==================================================
          INPUT
      =================================================== */}

      <ChatInput
        onSend={handleSendMessage}
        disabled={isTyping}
      />

    </div>
  );
}

/* =========================================================
   TIME
========================================================= */

function getTime() {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());
}

export default ChatbotWindow;