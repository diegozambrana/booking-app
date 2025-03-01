# Booking app

## Backend

FastAPI app with Sqlite DB

## Development

- Create a virtual environment
- Install requirements `pip install -r requirements.txt`
- Run locally with the command `fastapi dev`
- Open (http://localhost:8000/docs)[http://localhost:8000/docs]

### DATABASE

Exists 2 models: `Technician` and `Booking`.

```
* Technician (id: int, name: str, profession: str)
* Booking (id: int, technician_id: int, datetime: str)
```

## Frontend

ReactJS app with MUI
