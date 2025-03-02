export type ResponseData = {
  status: "success" | "error";
  type: "create" | "delete" | "list" | "unknown";
  message: string;
  object?: any;
  datetime?: string;
};

export type Message = {
  type: "text";
  content: string;
  sender: "user" | "bot";
  timestamp: string;
  responseData?: ResponseData;
};
