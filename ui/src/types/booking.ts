import { Technician } from "./technician";

export type Booking = {
  id: number;
  datetime: string;
  technician: Technician;
};

export type CreateBookingData = {
  technician_id: number;
  datetime: string;
};
