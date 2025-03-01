import { FC, useState } from "react";
import { useBooking } from "../../api/useBooking";
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { Booking } from "../../types/booking";
import { ActionModal } from "../../components/Modal";
import { CreateBooking } from "./components/CreateBooking";

export const Admin: FC = () => {
  const { bookings, deleteBooking, createBooking } = useBooking();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [displayCreateModal, setDisplayCreateModal] = useState(false);

  const handleDeleteBooking = () => {
    if (selectedBooking) {
      deleteBooking(selectedBooking.id);
      setDisplayDeleteModal(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box mb={1}>
        <Typography variant="h3" component={"h1"}>
          Admin
        </Typography>
        <Box my={2}>
          <Button
            color="primary"
            variant="contained"
            startIcon={<Add />}
            onClick={() => setDisplayCreateModal(true)}
          >
            Add Booking
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Booking ID</TableCell>
              <TableCell align="right">Datetime</TableCell>
              <TableCell align="right">Technician</TableCell>
              <TableCell align="right">Profession</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow
                key={booking.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {booking.id}
                </TableCell>
                <TableCell align="right">{booking.datetime}</TableCell>
                <TableCell align="right">{booking.technician.name}</TableCell>
                <TableCell align="right">
                  {booking.technician.profession}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      setSelectedBooking(booking);
                      setDisplayDeleteModal(true);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ActionModal
        open={displayDeleteModal}
        handleClose={() => setDisplayDeleteModal(false)}
        title="Delete Booking"
        description={`Are you sure you want to delete booking ${selectedBooking?.id}?`}
        onConfirm={handleDeleteBooking}
      />
      <CreateBooking
        open={displayCreateModal}
        handleClose={() => {
          setDisplayCreateModal(false);
        }}
        onConfirm={(data) => {
          createBooking(data);
          setDisplayCreateModal(false);
        }}
      />
    </Container>
  );
};
