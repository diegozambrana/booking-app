import { FC } from "react";
import { Message } from "../../../types/message";
import { Box, Stack } from "@mui/material";

const boxStyles = {
  minWidth: 200,
  maxWidth: 500,
  padding: 2,
  borderRadius: 2,
};

export const MessageBox: FC<{ message: Message }> = ({ message }) => {
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
              textAlign: "right",
              borderBottomLeftRadius: 0,
            }}
            my={1}
          >
            {message.content}
          </Box>
        </Stack>
      )}
    </div>
  );
};
