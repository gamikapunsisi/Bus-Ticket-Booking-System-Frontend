import bus_ticket_booking_api from "../config/api";

export const fetchAllRoutes = async () => {
  try {
    const response = await bus_ticket_booking_api.get(`/routes?limit=100`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
