import { useState } from "react";
import { api } from "../utils/api";

export const useCommand = () => {
  const [loading, setLoading] = useState(false);

  const sendCommand = async (command: string, context: string = "") => {
    setLoading(true);
    const response = await api.post("/process-text", { command, context });
    setLoading(false);
    if (response.status !== 200) {
      return null;
    }
    return response.data;
  };

  return {
    sendCommand,
    loading,
  };
};
