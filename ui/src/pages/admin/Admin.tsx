import { FC, useState } from "react";
import { useBooking } from "../../api/useBooking";
import {
  Box,
  Button,
  Container,
  Typography,
  Link as LinkBase,
  Stack,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { Booking } from "../../types/booking";
import { ActionModal } from "../../components/Modal";
import { CreateBooking } from "./components/CreateBooking";
import { Link } from "react-router";
import { TableBooking } from "../../components/TableBooking";
import { CreateTechnician } from "./components/CreateTechnician";

export const Admin: FC = () => {
  const { bookings, deleteBooking, createBooking } = useBooking();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [displayCreateModal, setDisplayCreateModal] = useState(false);
  const [displayCreateTechnicianModal, setDisplayCreateTechnicianModal] =
    useState(false);

  const handleDeleteBooking = () => {
    if (selectedBooking) {
      deleteBooking(selectedBooking.id);
      setDisplayDeleteModal(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box mb={2}>
        <LinkBase component={Link} to="/">
          Chat
        </LinkBase>
      </Box>
      <Box mb={1}>
        <Typography variant="h3" component={"h1"}>
          Admin
        </Typography>
        <Box my={2}>
          <Stack direction="row" spacing={2}>
            <Button
              color="primary"
              variant="contained"
              startIcon={<Add />}
              onClick={() => setDisplayCreateModal(true)}
            >
              Add Booking
            </Button>
            <Button
              color="primary"
              variant="contained"
              startIcon={<Add />}
              onClick={() => setDisplayCreateTechnicianModal(true)}
            >
              Add Technician
            </Button>
          </Stack>
        </Box>
      </Box>

      <TableBooking
        bookings={bookings}
        enableActions
        onDelete={(booking) => {
          setSelectedBooking(booking);
          setDisplayDeleteModal(true);
        }}
      />

      <ActionModal
        open={displayDeleteModal}
        handleClose={() => setDisplayDeleteModal(false)}
        title="Delete Booking"
        description={`Are you sure you want to delete booking ${selectedBooking?.id}?`}
        onConfirm={handleDeleteBooking}
      />
      {displayCreateModal && (
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
      )}
      {displayCreateTechnicianModal && (
        <CreateTechnician
          open={displayCreateTechnicianModal}
          handleClose={() => {
            setDisplayCreateTechnicianModal(false);
          }}
        />
      )}
    </Container>
  );
};
