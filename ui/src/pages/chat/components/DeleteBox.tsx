import { Box, Button, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { getFormattedDateTime } from "../../../utils/time";
import { ResponseData } from "../../../types/message";

type DeleteBoxProps = {
  responseData: ResponseData;
  onDeleteConfirm: () => void;
  displayActions?: boolean;
};

export const DeleteBox: FC<DeleteBoxProps> = ({
  responseData,
  onDeleteConfirm,
  displayActions = true,
}) => {
  return (
    <Box textAlign={"left"}>
      <Typography>
        Do you want to delete the Booking with the{" "}
        {responseData.object?.technician?.profession}{" "}
        <strong>{responseData.object?.technician?.name}</strong> on{" "}
        {responseData.object?.datetime &&
          getFormattedDateTime(responseData.object?.datetime)}
        ?
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
            color="error"
            size="small"
            onClick={onDeleteConfirm}
          >
            Delete
          </Button>
        </Stack>
      )}
    </Box>
  );
};
