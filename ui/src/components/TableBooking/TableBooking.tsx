import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC } from "react";
import { Booking } from "../../types/booking";
import { Delete } from "@mui/icons-material";

type TableBookingProps = {
  bookings: Booking[];
  enableActions?: boolean;
  onDelete?: (booking: Booking) => void;
};

export const TableBooking: FC<TableBookingProps> = ({
  bookings,
  enableActions = false,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Booking ID</TableCell>
            <TableCell align="right">Datetime</TableCell>
            <TableCell align="right">Technician</TableCell>
            <TableCell align="right">Profession</TableCell>
            {enableActions && <TableCell align="right">Actions</TableCell>}
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
              {enableActions && (
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      if (onDelete) onDelete(booking);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
