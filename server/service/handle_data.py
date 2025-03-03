from fastapi import HTTPException
from sqlmodel import Session, select, and_
from db.models import Booking, Technician
from db.config import engine
from datetime import datetime, timedelta


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
        return {
            "message": "Booking deleted",
            "booking": {"id": booking_id, "deleted": True},
        }


def create_booking(technician_id: int, datetime: str) -> dict:
    """
    Create a booking
    """
    with Session(engine) as session:
        booking = Booking(technician_id=technician_id, datetime=datetime)
        session.add(booking)
        session.commit()
        session.refresh(booking)
        return {
            "message": "Booking created",
            "booking": {
                "id": booking.id,
                "technician_id": booking.technician_id,
                "datetime": booking.datetime,
            },
        }


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


# Custom functions to get data


def get_technician_available(profession_name: str, check_datetime: datetime):
    """
    Get a technician available for a given profession and datetime
    """
    with Session(engine) as session:
        query_technicians = select(Technician).where(
            Technician.profession == profession_name
        )
        technicians = session.exec(query_technicians).all()

        if not technicians:
            # If the profession does not exist, return None
            return None

        # Review if the technician is available
        for technician in technicians:
            if isinstance(check_datetime, str):
                check_datetime = datetime.fromisoformat(check_datetime)

            query_booking = select(Booking).where(
                and_(
                    Booking.technician_id == technician.id,  # Filtra por el técnico
                    Booking.datetime >= check_datetime,  # Inicio del rango
                    Booking.datetime
                    < check_datetime + timedelta(hours=1),  # Fin del rango
                )
            )
            existing_booking = session.exec(query_booking).first()

            if existing_booking is None:
                return {
                    "id": technician.id,
                    "name": technician.name,
                    "profession": profession_name,
                }

        # If no technician is available, return None
        return None
