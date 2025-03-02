import { Box, Button, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { getFormattedDateTime } from "../../../utils/time";
import { ResponseData } from "../../../types/message";

type CreateBoxProps = {
  responseData: ResponseData;
  onCreateConfirm: () => void;
  displayActions?: boolean;
};

export const CreateBox: FC<CreateBoxProps> = ({
  responseData,
  onCreateConfirm,
  displayActions = true,
}) => {
  const handleConfirm = () => {
    if (responseData.object && responseData.datetime) onCreateConfirm();
  };
  return (
    <Box textAlign={"left"}>
      <Typography>
        Do you want to create Booking with the {responseData.object?.profession}{" "}
        <strong>{responseData.object?.name}</strong> on{" "}
        {responseData.datetime && getFormattedDateTime(responseData.datetime)}?
      </Typography>
      {displayActions && (
        <Stack
          direction="row"
          spacing={1}
          justifyContent="flex-end"
          sx={{ mt: 2 }}
        >
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </Stack>
      )}
    </Box>
  );
};
