import { Box, Button, Modal, Typography } from "@mui/material";
import React, { FC } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 8,
  p: 4,
};

type ActionModalProps = {
  open: boolean;
  handleClose: () => void;
  title: string;
  description?: string;
  render?: () => React.ReactNode;
  onConfirm: () => void;
};

export const ActionModal: FC<ActionModalProps> = ({
  open,
  handleClose,
  title,
  description = null,
  render,
  onConfirm,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        {description && (
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
        )}
        {render && <Box>{render()}</Box>}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Box sx={{ mr: 1 }}>
            <Button variant="outlined" color="primary" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
          <Button variant="contained" color="primary" onClick={onConfirm}>
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
