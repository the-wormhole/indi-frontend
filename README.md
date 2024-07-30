# Flight Status Update Dashboard - Frontend

## Overview
This is the frontend of the Flight Status Dashboard application. It allows users to check the status of their flights, log in, and view future flight bookings. The frontend is built using React and communicates with the backend API to fetch and display data. The logged in users can be configured to receive FCM notifications. The purpose of the UI is to help the customer check a flight's status and log in to see his future flight schedules.

## Features
- Check flight status
- User authentication (login and signup)
- View future flight bookings

## Technology Stack
- React
- Axios (for making API requests)
- React Router DOM (for routing)

## Live App
- URL - `https://goindigo-flight-status-check.vercel.app`

## Installation

1. Clone the repository:
```sh
git clone https://github.com/the-wormhole/indigo-frontend-repo4vercel.git
cd frontend
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm start
```

## Usage
### Check Flight Status
1. Enter the flight number and click "Check Status" to view the flight's current status.

### Login
1. Enter your mobile number and password to log in.
2. If you don't have an account, click on the "Sign Up" link to create one.

### View Future Flight Bookings
1. After logging in, the dashboard will display a list of your future flight bookings.

### Add a Passenger and Flights
1. To add a passenger, you will have to make a curl/API request directly to passengers endpoint. This set up is made keeping in mind that the Bookings will be coming from a different service or 3rd party.
```sh
curl -X POST https://www.api-flights-indigo.work.gd/api/passengers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "phone": "0987654321",
    "email": "jane.doe@example.com",
    "flightNumber": "6E123",
    "bookingNumber": "PNR123"
}'
```
2. Similar to adding a passenger, a Flight can be added as well. This is also restricted to an API/curl request due to the fact that a Flight will be added by a person working for the Airlines or an Admin.
```sh
curl -X POST https://www.api-flights-indigo.work.gd/api/flights \
  -H "Content-Type: application/json" \
  -d '{
    "flightNumber": "6E123",
    "airline": "Indigo",
    "status": "Scheduled",
    "gate": "A2",
    "ScheduledDepartureTime": "2024-08-01T15:30:00Z",
    "ScheduledArrivalTime": "2024-08-01T17:30:00Z"
  }'
``` 
3. Flight status changes will also be required to be made using the API/curl request since this would be done by an admin or an employee of the Airlines
```sh
curl -X PUT https://www.api-flights-indigo.work.gd/api/flights/6E123 \
     -H "Content-Type: application/json" \
     -d '{
           "status": "Delayed", 
           "gate": "A2"                    
        }'
```         

## API Endpoints
The frontend communicates with the following backend API endpoints:

- `POST /api/auth/signup` - Sign up a new user
- `POST /api/auth/login` - Log in an existing user
- `GET /api/flights/:flightNumber` - Get flight status by flight number
- `GET /api/auth/future-flights` - Get future flights for a logged-in customer

## Sample API Requests
### Sign Up
```sh
curl -X POST https://www.api-flights-indigo.work.gd/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "password": "password123"
  }'
```
### Log In
```sh
curl -X POST https://www.api-flights-indigo.work.gd/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

### Check Flight Status
```sh
curl -X GET https://www.api-flights-indigo.work.gd/api/flights/6E123
```

### Get Future Flights
```sh
curl -X GET https://www.api-flights-indigo.work.gd/api/customers/60d0fe4f5311236168a109ca/flights
```
## License
This project is licensed under the MIT License.

