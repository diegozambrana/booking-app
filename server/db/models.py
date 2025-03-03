from typing import Optional
from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime


class Technician(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    profession: str

    bookings: list["Booking"] = Relationship(back_populates="technician")


class Booking(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    technician_id: int = Field(foreign_key="technician.id")
    datetime: datetime

    technician: Technician = Relationship(back_populates="bookings")


class BookingCreate(SQLModel):
    technician_id: int
    datetime: datetime


class TechnicianCreate(SQLModel):
    name: str
    profession: str


class ProcessTextRequest(SQLModel):
    command: str
    context: str
