import axios from "axios";

const bus_ticket_booking_api = axios.create({
  baseURL: process.env.BUS_TICKET_BOOKING_API || "http://localhost:5000/api/v1",
  headers: {
    "Content-type": "application/json",
  },
});

// Use axios interceptors to include the token in all requests
bus_ticket_booking_api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("retrieving token", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default bus_ticket_booking_api;