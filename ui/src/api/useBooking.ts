import { useEffect, useState } from "react";
import { Booking, CreateBookingData } from "../types/booking";
import { api } from "../utils/api";

export const useBooking = (lazy: boolean = false) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!lazy) {
      fetchBookings();
    }
  }, [lazy]);

  const fetchBookings = async () => {
    api.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  };

  const deleteBooking = async (id: number) => {
    await api.delete(`/bookings/${id}`);
    setBookings((prev) => prev.filter((booking) => booking.id !== id));
  };

  const createBooking = async (data: CreateBookingData) => {
    return api.post("/bookings", data).then((response) => {
      if (!lazy) {
        fetchBookings();
      }
      return response;
    });
  };

  return {
    bookings,
    deleteBooking,
    createBooking,
  };
};
