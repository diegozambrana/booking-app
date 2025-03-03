import { Send } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
  Link as LinkBase,
} from "@mui/material";
import { BaseSyntheticEvent, FC } from "react";
import { useChat } from "./useChat";
import { MessageBox } from "./components";
import { Link } from "react-router";

export const Chat: FC = () => {
  const {
    input,
    setInput,
    sendMessage,
    messages,
    loading,
    handleCreateBooking,
    handleDeleteBooking,
  } = useChat();

  return (
    <Container maxWidth="md">
      <Box mb={2}>
        <LinkBase component={Link} to="/admin">
          Admin
        </LinkBase>
      </Box>

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
              <MessageBox
                key={`message_${message.timestamp}`}
                message={message}
                onCreateConfirm={handleCreateBooking}
                onDeleteConfirm={handleDeleteBooking}
                lastElement={index === messages.length - 1}
              />
            ))}
          </Box>
          <Box>
            <form
              onSubmit={(e: BaseSyntheticEvent) => {
                e.preventDefault();
                sendMessage();
              }}
            >
              <Stack direction="row" spacing={2}>
                <Box width={1}>
                  <TextField
                    size="small"
                    fullWidth
                    value={input}
                    onChange={(e: BaseSyntheticEvent) =>
                      setInput(e.target.value)
                    }
                    disabled={loading}
                  />
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                >
                  <Send />
                </Button>
              </Stack>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
