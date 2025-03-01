import { useState } from "react";
import { Message } from "../../types/message";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "text",
      content: "Hello! How can I help you today?",
      sender: "bot",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");

  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = () => {
    if (input) {
      addMessage({
        type: "text",
        content: input,
        sender: "user",
        timestamp: new Date().toISOString(),
      });
      setInput("");
    }
  };

  return { messages, input, setInput, sendMessage };
};
