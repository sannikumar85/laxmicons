import { useState } from "react";
import {
  FiSend,
  FiMic,
} from "react-icons/fi";

function ChatInput({
  onSend,
  disabled = false,
  placeholder = "Type your message...",
}) {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || disabled) {
      return;
    }

    onSend?.(trimmedMessage);

    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        border-t
        border-slate-100
        bg-white
        p-3
      "
    >

      <div className="flex items-center gap-2">

        {/* Input */}

        <div className="relative flex-1">

          <input
            type="text"
            value={message}
            onChange={(event) =>
              setMessage(event.target.value)
            }
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={placeholder}
            className="
              w-full
              h-11
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              px-4
              pr-10
              text-sm
              text-slate-800
              placeholder:text-slate-400
              outline-none
              focus:border-orange-400
              focus:bg-white
              focus:ring-4
              focus:ring-orange-500/10
              transition
              disabled:opacity-60
            "
          />

          <button
            type="button"
            className="
              absolute
              right-2
              top-1/2
              -translate-y-1/2
              w-8
              h-8
              rounded-lg
              flex
              items-center
              justify-center
              text-slate-400
              hover:bg-slate-200
              hover:text-orange-500
              transition
            "
            aria-label="Voice input"
            title="Voice input"
          >
            <FiMic size={16} />
          </button>

        </div>

        {/* Send */}

        <button
          type="submit"
          disabled={
            disabled ||
            !message.trim()
          }
          className="
            w-11
            h-11
            shrink-0
            rounded-xl
            bg-orange-500
            hover:bg-orange-600
            disabled:bg-slate-200
            disabled:text-slate-400
            text-white
            flex
            items-center
            justify-center
            transition
            active:scale-95
          "
          aria-label="Send message"
        >
          <FiSend size={17} />
        </button>

      </div>

      <p className="text-[10px] text-slate-400 text-center mt-2">
        Press Enter to send
      </p>

    </form>
  );
}

export default ChatInput;