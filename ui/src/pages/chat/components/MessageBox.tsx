import { FC } from "react";
import { Message } from "../../../types/message";
import { Box, Stack } from "@mui/material";
import { CreateBox } from "./CreateBox";
import { DetailBox } from "./DetailBox";
import { DeleteBox } from "./DeleteBox";

const boxStyles = {
  minWidth: 200,
  maxWidth: 500,
  padding: 2,
  borderRadius: 2,
};

type MessageBoxProps = {
  message: Message;
  onCreateConfirm: () => void;
  onDeleteConfirm: () => void;
  lastElement: boolean;
};

export const MessageBox: FC<MessageBoxProps> = ({
  message,
  onCreateConfirm,
  onDeleteConfirm,
  lastElement,
}) => {
  return (
    <div>
      {message.sender === "user" ? (
        <Stack direction="row" justifyContent="flex-end">
          <Box
            sx={{
              ...boxStyles,
              backgroundColor: "rgb(25, 118, 210)",
              color: "white",
              textAlign: "left",
              borderBottomRightRadius: 0,
            }}
            my={1}
          >
            {message.content}
          </Box>
        </Stack>
      ) : (
        <Stack direction="row">
          <Box
            sx={{
              ...boxStyles,
              backgroundColor: "rgba(0,0,0,0.1)",
              textAlign: "left",
              borderBottomLeftRadius: 0,
            }}
            my={1}
          >
            {(message.responseData?.status === "error" ||
              !message.responseData) &&
              message.content}
            {message.responseData?.type === "create" &&
              message.responseData?.status === "success" && (
                <CreateBox
                  responseData={message.responseData}
                  onCreateConfirm={onCreateConfirm}
                  displayActions={lastElement}
                />
              )}
            {message.responseData?.type === "retrieve" &&
              message.responseData?.status === "success" && (
                <DetailBox responseData={message.responseData} />
              )}
            {message.responseData?.type === "delete" &&
              message.responseData?.status === "success" && (
                <DeleteBox
                  responseData={message.responseData}
                  onDeleteConfirm={onDeleteConfirm}
                  displayActions={lastElement}
                />
              )}
          </Box>
        </Stack>
      )}
    </div>
  );
};
