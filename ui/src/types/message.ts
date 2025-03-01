export type Message = {
  type: "text";
  content: string;
  sender: "user" | "bot";
  timestamp: string;
};
