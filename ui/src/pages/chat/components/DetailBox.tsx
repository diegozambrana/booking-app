import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { ResponseData } from "../../../types/message";
import { TableBooking } from "../../../components/TableBooking";
import { Booking } from "../../../types/booking";

type DetailBoxProps = {
  responseData: ResponseData;
};

export const DetailBox: FC<DetailBoxProps> = ({ responseData }) => {
  return (
    <Box textAlign={"left"}>
      <Typography>Your Booking data is:</Typography>
      <TableBooking bookings={[responseData.object as Booking]} />
    </Box>
  );
};
