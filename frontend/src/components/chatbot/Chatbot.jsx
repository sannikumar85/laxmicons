import { useState } from "react";

import ChatbotButton from "./ChatbotButton";
import ChatbotWindow from "./ChatbotWindow";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <ChatbotWindow
          onClose={() => setIsOpen(false)}
        />
      )}

      <ChatbotButton
        isOpen={isOpen}
        onClick={() =>
          setIsOpen((previous) => !previous)
        }
      />
    </>
  );
}

export default Chatbot;