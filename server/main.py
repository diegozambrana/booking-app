from typing import Annotated
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from db.init_db import create_db_and_tables, populate_initial_data
from service.handle_data import (
    get_list_bookings,
    retrieve_booking_by_id,
    create_booking,
    delete_booking,
    get_list_technicians,
)
from db.models import BookingCreate, ProcessTextRequest
from service.process_text import process_text_command

app = FastAPI(
    title="Booking app",
)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()
    populate_initial_data()


# Get list of bookings
@app.get("/bookings")
def list_bookings(
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
):
    bookings = get_list_bookings(offset, limit)
    return bookings


# Get booking by id
@app.get("/bookings/{booking_id}")
def get_booking_route(booking_id: str):
    return retrieve_booking_by_id(booking_id)


# Create a booking
@app.post("/bookings")
def create_booking_route(booking: BookingCreate):
    response = create_booking(booking.technician_id, booking.datetime)
    return response


# Delete a booking by id
@app.delete("/bookings/{booking_id}")
def delete_booking_route(booking_id: int):
    delete_booking(booking_id)
    return {"message": "Booking deleted"}


@app.get("/technicians")
def list_technicians_route(
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
):
    technicians = get_list_technicians(offset, limit)
    return technicians


@app.post("/process-text")
def process_text_command_route(data: ProcessTextRequest):
    response = process_text_command(data.command, data.context)
    return response
