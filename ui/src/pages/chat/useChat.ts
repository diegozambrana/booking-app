import { useRef, useState } from "react";
import { Message } from "../../types/message";
import { useCommand } from "../../api/useCommand";
import { useBooking } from "../../api/useBooking";
import { CreateBookingData } from "../../types/booking";

export const useChat = () => {
  const { sendCommand, loading } = useCommand();
  const { createBooking, deleteBooking } = useBooking(true);
  const contextRef = useRef<any[]>([]);

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

  const handleResponse = (response: any) => {
    if (response) {
      addMessage({
        type: "text",
        content: response.message,
        sender: "bot",
        timestamp: new Date().toISOString(),
        responseData: response,
      });
    }
  };

  const handleShortMessage = () => {
    if (input.toLowerCase().includes("yes")) {
      if (
        messages[messages.length - 1].responseData?.type === "create" &&
        messages[messages.length - 1].responseData?.status === "success"
      ) {
        handleCreateBooking();
        setInput("");
        return true;
      } else if (
        messages[messages.length - 1].responseData?.type === "delete" &&
        messages[messages.length - 1].responseData?.status === "success"
      ) {
        handleDeleteBooking();
        setInput("");
        return true;
      } else {
        addMessage({
          type: "text",
          content: "I'm sorry, I didn't understand.",
          sender: "bot",
          timestamp: new Date().toISOString(),
        });
        setInput("");
        return true;
      }
    } else if (input.toLowerCase().includes("no")) {
      addMessage({
        type: "text",
        content: "Do you need anything else?",
        sender: "bot",
        timestamp: new Date().toISOString(),
      });
      setInput("");
      return true;
    }
    return false;
  };

  const sendMessage = async () => {
    if (input.length === 0) return;
    if (input.length < 10) {
      const isActionComplete = handleShortMessage();
      if (isActionComplete) return;
    }
    if (input) {
      addMessage({
        type: "text",
        content: input,
        sender: "user",
        timestamp: new Date().toISOString(),
      });

      // add context
      const context =
        contextRef.current.length > 0 ? JSON.stringify(contextRef.current) : "";

      const dataResponse = await sendCommand(input, context);
      if (dataResponse.status >= 400) {
        addMessage({
          type: "text",
          content: "There was an error processing the command.",
          sender: "bot",
          timestamp: new Date().toISOString(),
        });
      } else {
        handleResponse(dataResponse);
      }
      setInput("");
    }
  };

  const handleCreateBooking = async () => {
    if (!messages[messages.length - 1].responseData) return;
    const data = {
      datetime: messages[messages.length - 1].responseData?.datetime,
      technician_id: messages[messages.length - 1].responseData?.object.id,
    };
    const response = await createBooking(data as CreateBookingData);
    const messageBase = {
      type: "text",
      sender: "bot",
      timestamp: new Date().toISOString(),
    };
    if (response.status >= 400) {
      addMessage({
        ...messageBase,
        content: "There was an error creating the booking.",
      } as Message);
      return;
    }

    // store the history of bookings
    contextRef.current = [...contextRef.current, response.data.booking];

    addMessage({
      ...messageBase,
      content: "Booking created successfully. Do you need anything else?",
    } as Message);
  };

  const handleDeleteBooking = async () => {
    if (!messages[messages.length - 1].responseData) return;

    const response = await deleteBooking(
      messages[messages.length - 1].responseData?.object.id
    );
    const messageBase = {
      type: "text",
      sender: "bot",
      timestamp: new Date().toISOString(),
    };
    if (response.status >= 400) {
      addMessage({
        ...messageBase,
        content: "There was an error deleting the booking.",
      } as Message);
      return;
    }

    // store the history of bookings
    contextRef.current = [...contextRef.current, response.data.booking];

    addMessage({
      ...messageBase,
      content: "Booking was deleted successfully. Do you need anything else?",
    } as Message);
  };

  return {
    messages,
    input,
    setInput,
    sendMessage,
    loading,
    handleCreateBooking,
    handleDeleteBooking,
  };
};
