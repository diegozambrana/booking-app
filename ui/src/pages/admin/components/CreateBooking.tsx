import { FC, useState } from "react";
import { ActionModal } from "../../../components/Modal";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useTechnicians } from "../../../api/useTechinicians";

type CreateBookingProps = {
  open: boolean;
  handleClose: () => void;
  onConfirm: (data: { datetime: string; technician_id: number }) => void;
};

export const CreateBooking: FC<CreateBookingProps> = ({
  open,
  handleClose,
  onConfirm,
}) => {
  const { technicians } = useTechnicians();
  const [datetime, setDatetime] = useState<Dayjs | null>(null);
  const [selectedTechnician, setSelectedTechnician] = useState<string>("");
  const handleOnConfirm = () => {
    onConfirm({
      datetime: datetime?.toISOString() as string,
      technician_id: parseInt(selectedTechnician),
    });
  };
  return (
    <ActionModal
      open={open}
      handleClose={handleClose}
      title={"Create a new booking"}
      render={() => (
        <Box>
          <Box my={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Technician</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedTechnician}
                label="Technician"
                onChange={(event: SelectChangeEvent) => {
                  setSelectedTechnician(event.target.value as string);
                }}
              >
                {technicians.map((technician) => (
                  <MenuItem value={technician.id as number} key={technician.id}>
                    {technician.name} - {technician.profession}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box my={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="Date time"
                  value={datetime}
                  onChange={(newValue) => setDatetime(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </Box>
      )}
      onConfirm={handleOnConfirm}
    />
  );
};
