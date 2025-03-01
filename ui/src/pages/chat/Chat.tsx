import { Send } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { BaseSyntheticEvent, FC } from "react";
import { useChat } from "./useChat";
import { MessageBox } from "./components";

export const Chat: FC = () => {
  const { input, setInput, sendMessage, messages } = useChat();

  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>
          <Box>
            <Typography variant="h5" component={"h1"}>
              Technician scheduling support
            </Typography>
          </Box>
          <Box
            sx={{
              minHeight: 400,
              maxHeight: "calc(100vh - 200px)",
              backgroundColor: "rgba(0,0,0,0.05)",
              borderRadius: 1,
              overflowY: "auto",
            }}
            my={2}
            p={2}
          >
            {messages.map((message, index) => (
              <MessageBox key={index} message={message} />
            ))}
          </Box>
          <Box>
            <Stack direction="row" spacing={2}>
              <Box width={1}>
                <TextField
                  size="small"
                  fullWidth
                  value={input}
                  onChange={(e: BaseSyntheticEvent) => setInput(e.target.value)}
                />
              </Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => sendMessage()}
              >
                <Send />
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
