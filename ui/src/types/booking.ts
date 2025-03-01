import { Technician } from "./technician";

export type Booking = {
  id: number;
  datetime: string;
  technician: Technician;
};
