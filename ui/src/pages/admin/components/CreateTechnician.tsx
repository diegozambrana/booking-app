import { FC, useState } from "react";
import { ActionModal } from "../../../components/Modal";
import { Box, TextField } from "@mui/material";
import { useTechnicians } from "../../../api/useTechinicians";

type CreateTechnicianProps = {
  open: boolean;
  handleClose: () => void;
};

export const CreateTechnician: FC<CreateTechnicianProps> = ({
  open,
  handleClose,
}) => {
  const { createTechnician } = useTechnicians();
  const [data, setData] = useState({
    name: "",
    profession: "",
  });

  const handleOnConfirm = async () => {
    await createTechnician(data);
    handleClose();
  };

  return (
    <ActionModal
      open={open}
      handleClose={handleClose}
      title={"Create a new Techician"}
      render={() => (
        <Box>
          <Box my={2}>
            <TextField
              fullWidth
              label="Name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </Box>
          <Box my={2}>
            <TextField
              fullWidth
              label="Profession"
              value={data.profession}
              onChange={(e) => setData({ ...data, profession: e.target.value })}
            />
          </Box>
        </Box>
      )}
      onConfirm={handleOnConfirm}
    />
  );
};
