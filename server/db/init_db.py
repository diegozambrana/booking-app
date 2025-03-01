from sqlmodel import SQLModel, Session, select
from db.config import engine
from db.models import Booking, Technician
from datetime import datetime


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def populate_initial_data():
    with Session(engine) as session:
        # initialize only if there are no data
        if session.exec(select(Booking)).first():
            return

        nicolas = Technician(name="Nicolas Woollett", profession="plumber")
        franky = Technician(name="Franky Flay", profession="electrician")
        griselda = Technician(name="Griselda Dickson", profession="welder")

        session.add_all([nicolas, franky, griselda])
        session.commit()

        booking1 = Booking(
            technician_id=nicolas.id, datetime=datetime(2022, 10, 15, 10, 0)
        )
        booking2 = Booking(
            technician_id=franky.id, datetime=datetime(2022, 10, 16, 18, 0)
        )
        booking3 = Booking(
            technician_id=griselda.id, datetime=datetime(2022, 10, 18, 11, 0)
        )

        session.add_all([booking1, booking2, booking3])
        session.commit()
