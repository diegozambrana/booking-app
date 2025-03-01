import { useEffect, useState } from "react";
import { Booking } from "../types/booking";
import { api } from "../utils/api";
import { Technician } from "../types/technician";

export const useBooking = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    api.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  };

  const deleteBooking = async (id: number) => {
    await api.delete(`/bookings/${id}`);
    setBookings((prev) => prev.filter((booking) => booking.id !== id));
  };

  const createBooking = async (data: {
    technician_id: number;
    datetime: string;
  }) => {
    api.post("/bookings", data).then(() => {
      fetchBookings();
    });
  };

  return {
    bookings,
    deleteBooking,
    createBooking,
  };
};
