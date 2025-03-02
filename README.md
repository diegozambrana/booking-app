# Booking app

## Backend

FastAPI app with Sqlite DB

### Development

- Create a virtual environment
- Install requirements `pip install -r requirements.txt`
- Run locally with the command `fastapi dev`
- Open (http://localhost:8000/docs)[http://localhost:8000/docs]

#### DATABASE

Exists 2 models: `Technician` and `Booking`.

```
* Technician (id: int, name: str, profession: str)
* Booking (id: int, technician_id: int, datetime: str)
```

### OpenAI API integration

You need the API key for OpenAI integration. add the API Key in a env file.

```
# /server/.env
OPENAI_API_KEY=<API_KEY>
```

## Frontend

ReactJS app with MUI

### Development

- got to ui directory `cd ui`.
- Install dependencies `npm install`.
- Run locally `npm run dev`.
- run `cp .env.example .env` to generate the .env file.
- Open (http://localhost:5173)[http://localhost:5173].
