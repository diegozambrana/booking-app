# Booking app

## Architecture

![Untitled Diagram drawio](https://github.com/user-attachments/assets/1616e9c0-75c4-40d7-b201-5c3b15b5478b)

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

# How to use.

The application has to pages one for chat and another for the admin to check the data as a table.

## Admin

<img width="893" alt="Captura de pantalla 2025-03-03 a la(s) 9 08 00 a  m" src="https://github.com/user-attachments/assets/eb5965f8-4a91-4a89-ba81-aebb9b04e90a" />

* Helps to check the booking data with a friendly table.
* Create a new booking using the button **"+ ADD BOOKING"**, this will open a modal where you can select the technician and the datime.
* Remove a booking, in the right side of each element exists a **"Trash"** icon, when you click this it's going to open a modal that ask if you want to remove this booking.

## Chat

<img width="774" alt="Captura de pantalla 2025-03-03 a la(s) 9 47 45 a  m" src="https://github.com/user-attachments/assets/545f4eed-ed0b-4ade-ba3e-427cacb638a1" />


A chat box where you can interact with the API using command text. This bot helps to create, delete and get information about booking.

### Create

Define the profession and the time for the booking. The chatbot will check if the requested profession exists and whether a technician is available at that time. Once the app verifies availability, it will return a message indicating whether a technician is available or not. You can respond with **yes/no** or simply click the **"CONFIRM"** button.

**Input Examples**

* `Book a electrician for the Friday afternoon`
* `I want a plumber for tomorrow morning`
* `I want a plumber for tomorrow at 10:00am`
* `I want a electrician for Saturday at 17:00pm`

<img width="806" alt="Bot answer when it doesn't find an availability" src="https://github.com/user-attachments/assets/98d1922e-ad3e-4b54-986c-21a376ac03ad" />

<img width="827" alt="Captura de pantalla 2025-03-03 a la(s) 9 24 25 a  m" src="https://github.com/user-attachments/assets/5b475449-c740-4fc6-a196-47ac7416a3ef" />

### Retrieve

Ask for details about the booking you created. The chatbot will display a table with your booking information.

**Input Examples**

* `give me details about my booking?`
* `Who is the technician of my booking?`
* `what is the booking id?`
* `detail of my last booking`

<img width="802" alt="Captura de pantalla 2025-03-03 a la(s) 9 27 56 a  m" src="https://github.com/user-attachments/assets/c7f741d3-4696-4fc4-8d07-fbc2608ca6e5" />

### Delete

Tell the chatbot that you want to cancel a booking and provide its details. To confirm, you can respond with **yes/no** or simply click the **"DELETE"** button.

**Input Examples**

* `cancel my booking with the plumber`
* `cancel my last booking`
* `remove my booking for tomorrow`
* `delete my booking with id 27`

<img width="836" alt="Captura de pantalla 2025-03-03 a la(s) 9 37 32 a  m" src="https://github.com/user-attachments/assets/49c6ff25-412d-4544-aa09-3908150aea69" />

## Unknown

Sometime the chatbot doesn't recognize the message and displays the message `Command not recognized, try again`.
