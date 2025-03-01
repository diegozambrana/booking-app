from typing import Annotated

from fastapi import HTTPException
from sqlmodel import Session, select
from db.models import Booking, Technician
from db.config import engine


def select_booking():
    return select(Booking, Technician).join(
        Technician, Booking.technician_id == Technician.id
    )


def serialize_booking(booking, technician):
    return {
        "id": booking.id,
        "datetime": booking.datetime,
        "technician": {
            "id": technician.id,
            "name": technician.name,
            "profession": technician.profession,
        },
    }


def get_list_bookings(offset: int = 0, limit: int = 100) -> list[Booking]:
    """
    Get list of bookings
    """
    with Session(engine) as session:
        query = select_booking().offset(offset).limit(limit)
        results = session.exec(query).all()
        return [
            serialize_booking(booking, technician) for booking, technician in results
        ]


def retrieve_booking_by_id(booking_id: int) -> Booking:
    """
    Get booking by id
    """
    with Session(engine) as session:
        query = select_booking().where(Booking.id == booking_id)
        result = session.exec(query).first()
        booking, technician = result
        return serialize_booking(booking, technician)


def delete_booking(booking_id: int) -> dict:
    """
    Delete booking by id
    """
    with Session(engine) as session:
        booking = session.get(Booking, booking_id)
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        session.delete(booking)
        session.commit()
        return {"message": "Booking deleted"}


def create_booking(technician_id: int, datetime: str) -> dict:
    """
    Create a booking
    """
    with Session(engine) as session:
        booking = Booking(technician_id=technician_id, datetime=datetime)
        session.add(booking)
        session.commit()
        return {"message": "Booking created"}


def create_technician(name: str, profession: str) -> dict:
    """
    Create a technician
    """
    with Session(engine) as session:
        technician = Technician(name=name, profession=profession)
        session.add(technician)
        session.commit()
        return {"message": "Technician created"}


def get_list_technicians(offset: int = 0, limit: int = 100) -> list[Technician]:
    """
    Get list of technicians
    """
    with Session(engine) as session:
        query = session.query(Technician).offset(offset).limit(limit)
        return query.all()
